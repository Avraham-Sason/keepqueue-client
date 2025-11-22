"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import moment from "moment-timezone";
import CalendarComponent from "@/components/CalendarComponent/CalendarComponent";
import type { CalendarEvent as UiCalendarEvent, EventColor } from "@/components/CalendarComponent";
import { useBusinessesStore, useSettingsStore } from "@/lib/store";
import { timestampToMillis } from "@/lib/helpers";
import type { CalendarEventStatus, CalendarEventWithRelations } from "@/lib/types";
import BusinessLoading from "../loading";
import { useLanguage } from "@/hooks";

const statusColorByStatus: Record<CalendarEventStatus, EventColor> = {
    BOOKED: "primary",
    CONFIRMED: "sky",
    CANCELLED: "rose",
    NO_SHOW: "orange",
    DONE: "emerald",
};

const toDate = (value: unknown, userTimeZone: string): Date | null => {
    if (!value) {
        return null;
    }
    
    let utcDate: Date | null = null;
    
    if (value instanceof Date) {
        utcDate = value;
    } else if (typeof value === "string") {
        const parsed = new Date(value);
        utcDate = Number.isNaN(parsed.getTime()) ? null : parsed;
    } else if (typeof (value as { toDate?: () => Date }).toDate === "function") {
        const parsed = (value as { toDate: () => Date }).toDate();
        utcDate = Number.isNaN(parsed.getTime()) ? null : parsed;
    } else {
        const millis = timestampToMillis(value as any, { defaultReturnedValue: Number.NaN });
        utcDate = Number.isNaN(millis) ? null : new Date(millis);
    }
    
    if (!utcDate) {
        return null;
    }
    
    // Convert from UTC to user's timezone
    return moment.utc(utcDate).tz(userTimeZone).toDate();
};

const buildDescription = (event: CalendarEventWithRelations): string | undefined => {
    const attendee = event.user ? [event.user.firstName, event.user.lastName].filter(Boolean).join(" ").trim() : "";
    const serviceName = event.service?.name?.trim() ?? "";
    const notes = event.notes?.trim() ?? "";
    const parts = [serviceName, attendee, notes].filter((part) => part.length > 0);
    return parts.length > 0 ? parts.join(" • ") : undefined;
};

const isAllDay = (event: CalendarEventWithRelations, start: Date, end: Date): boolean => {
    if (event.type && event.type !== "APPOINTMENT") {
        return true;
    }
    const duration = end.getTime() - start.getTime();
    if (duration >= 24 * 60 * 60 * 1000) {
        return true;
    }
    if (duration <= 0) {
        const startIsMidnight = start.getHours() === 0 && start.getMinutes() === 0;
        const endIsMidnight = end.getHours() === 0 && end.getMinutes() === 0;
        return startIsMidnight && endIsMidnight;
    }
    return false;
};

const mapBusinessEvent = (event: CalendarEventWithRelations, fallbackTitle: string, userTimeZone: string): UiCalendarEvent | null => {
    const startDate = toDate(event.start, userTimeZone);
    const endDate = toDate(event.end, userTimeZone);

    if (!startDate || !endDate) {
        return null;
    }

    const description = buildDescription(event);
    const id = event.id ?? `${startDate.getTime()}-${endDate.getTime()}`;

    return {
        id,
        title: event.title?.trim() || event.service?.name || description || fallbackTitle,
        description,
        start: startDate,
        end: endDate,
        allDay: isAllDay(event, startDate, endDate),
    };
};

function Calendar() {
    const params = useParams<{ businessId: string }>();
    const businessIdParam = params?.businessId;
    const businessId = Array.isArray(businessIdParam) ? businessIdParam[0] : businessIdParam;
    
    const userTimeZone = useSettingsStore.userTimeZone();
    const currentBusiness = useBusinessesStore.currentBusiness();
    const { t } = useLanguage();

    const events = useMemo(() => {
        if (!currentBusiness?.calendar?.length) {
            return [] as UiCalendarEvent[];
        }
        return currentBusiness.calendar
            .map((event) => mapBusinessEvent(event, t("calendarDefaultEventTitle"), userTimeZone))
            .filter((event): event is UiCalendarEvent => event !== null)
            .sort((a, b) => a.start.getTime() - b.start.getTime());
    }, [currentBusiness?.calendar, t, userTimeZone]);

    if (!currentBusiness || (businessId && currentBusiness.id !== businessId)) {
        return <BusinessLoading />;
    }

    return <CalendarComponent events={events} />;
}

export default Calendar;

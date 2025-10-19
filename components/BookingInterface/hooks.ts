"use client";

import { useEffect, useMemo, useState } from "react";
import { useBusinessesStore } from "@/lib/store";
import type { Service, CalendarEvent, OperationSchedule } from "@/lib/types";
import { timestampToMillis } from "@/lib/helpers/time";
import moment from "moment-timezone";
import { getDocumentById, queryDocuments } from "@/lib/firebase/firestore";
import { useLanguage } from "@/hooks";

export interface DateOption {
    date: string;
    day: string;
    available: boolean;
}
export interface TimeOption {
    time: string;
    available: boolean;
}

export interface BusinessDisplay {
    name: string;
    rating: number;
    reviews: number;
    address: string;
    phone: string;
    email: string;
    image?: string;
    description: string;
    workingHours: string;
}

export interface CustomerInfo {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    notes: string;
}

export function useBookingState(businessId: string) {
    const { t } = useLanguage();
    const currentBusiness = useBusinessesStore.currentBusiness();

    const [fallbackLoaded, setFallbackLoaded] = useState(false);
    const [fallbackServices, setFallbackServices] = useState<Service[]>([]);
    const [fallbackCalendar, setFallbackCalendar] = useState<CalendarEvent[]>([]);
    const [fallbackSchedule, setFallbackSchedule] = useState<OperationSchedule[]>([]);
    const [fallbackMeta, setFallbackMeta] = useState<{ name?: string; phone?: string; logoUrl?: string } | null>(null);

    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [step, setStep] = useState(1);
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({ firstName: "", lastName: "", phone: "", email: "", notes: "" });

    useEffect(() => {
        const run = async () => {
            if (currentBusiness || fallbackLoaded || !businessId) return;
            try {
                const b: any = await getDocumentById("businesses", businessId);
                if (b) {
                    setFallbackMeta({ name: b.name, phone: b.phone, logoUrl: b.logoUrl });
                    setFallbackSchedule((b.operationSchedule as OperationSchedule[]) ?? []);
                    const s = await queryDocuments("services", "businessId", "==", businessId);
                    const c = await queryDocuments("calendar", "businessId", "==", businessId);
                    setFallbackServices((s as any) ?? []);
                    setFallbackCalendar((c as any) ?? []);
                }
            } catch (_) {
                // ignore
            } finally {
                setFallbackLoaded(true);
            }
        };
        run();
    }, [currentBusiness, fallbackLoaded, businessId]);

    const business: BusinessDisplay = useMemo(() => {
        const b = currentBusiness;
        return {
            name: b?.name ?? fallbackMeta?.name ?? "",
            rating: b?.ratingAvg ?? 0,
            reviews: b?.ratingCount ?? 0,
            address: "-",
            phone: b?.phone ?? fallbackMeta?.phone ?? "-",
            email: "",
            image: b?.logoUrl ?? fallbackMeta?.logoUrl ,
            description: "",
            workingHours: "",
        };
    }, [currentBusiness, fallbackMeta]);

    const services: Service[] = useMemo(() => currentBusiness?.services ?? fallbackServices, [currentBusiness?.services, fallbackServices]);

    const selectedServiceData = useMemo(() => services.find((s) => s.id === selectedService), [services, selectedService]);

    const businessOperationSchedule = useMemo(
        () => currentBusiness?.operationSchedule ?? fallbackSchedule,
        [currentBusiness?.operationSchedule, fallbackSchedule]
    );
    const serviceOperationSchedule = useMemo(() => selectedServiceData?.operationSchedule ?? [], [selectedServiceData]);

    const isSameDay = (ms: number, m: moment.Moment) => {
        const d = moment.utc(ms);
        return d.year() === m.year() && d.month() === m.month() && d.date() === m.date();
    };

    const eventBlocksForDate = useMemo(() => {
        const events = ((currentBusiness?.calendar as any) ?? fallbackCalendar) as CalendarEvent[];
        if (!selectedDate) return [] as { start: number; end: number }[];
        const m = moment.utc(selectedDate, "YYYY-MM-DD");
        return events
            .filter((e) => {
                const status = e.status;
                if (status === "CANCELLED") return false;
                const startMs = timestampToMillis(e.start);
                const endMs = timestampToMillis(e.end);
                return isSameDay(startMs, m) || isSameDay(endMs, m);
            })
            .map((e) => ({ start: timestampToMillis(e.start), end: timestampToMillis(e.end) }));
    }, [currentBusiness?.calendar, selectedDate]);

    const hasFreeSlot = (startMs: number, endMs: number) => {
        return !eventBlocksForDate.some((b) => Math.max(b.start, startMs) < Math.min(b.end, endMs));
    };

    const withinSchedule = (startMs: number, endMs: number) => {
        const startMoment = moment.utc(startMs);
        const endMoment = moment.utc(endMs);
        if (!startMoment.isSame(endMoment, "day")) return false;

        const startDay: number = startMoment.day();
        const startMinOfDay = startMoment.hours() * 60 + startMoment.minutes();
        const endMinOfDay = endMoment.hours() * 60 + endMoment.minutes();

        const isWithin = (schedule: OperationSchedule[]) => {
            const daySchedule = schedule.find((s) => s.day === (startDay as any));
            if (!daySchedule) return false;
            return daySchedule.intervals.some((interval) => startMinOfDay >= interval.startMin && endMinOfDay <= interval.endMin);
        };

        if (serviceOperationSchedule && serviceOperationSchedule.length > 0) {
            return isWithin(businessOperationSchedule) && isWithin(serviceOperationSchedule);
        }
        return isWithin(businessOperationSchedule);
    };

    const availableDates: DateOption[] = useMemo(() => {
        const days: DateOption[] = [];
        const base = moment.utc().startOf("day");
        const durationMin = selectedServiceData?.durationMin ?? 30;
        for (let i = 0; i < 7; i++) {
            const d = base.clone().add(i, "day");
            const dateStr = d.format("YYYY-MM-DD");
            let found = false;
            const probeStart = d.clone().hour(8).minute(0);
            const probeEnd = d.clone().hour(20).minute(0);
            const stepMin = 30;
            for (let m = probeStart.clone(); m.isBefore(probeEnd); m.add(stepMin, "minute")) {
                const startMs = m.valueOf();
                const endMs = m.clone().add(durationMin, "minute").valueOf();
                if (!withinSchedule(startMs, endMs)) continue;
                if (!hasFreeSlot(startMs, endMs)) continue;
                found = true;
                break;
            }
            const isToday = i === 0;
            const isTomorrow = i === 1;
            const dayLabel = isToday ? t("today") : isTomorrow ? t("tomorrow") : t(`weekday${d.day()}` as unknown as any);
            days.push({ date: dateStr, day: dayLabel, available: found });
        }
        return days;
    }, [businessOperationSchedule, serviceOperationSchedule, selectedServiceData?.durationMin, t, eventBlocksForDate]);

    const availableTimes: TimeOption[] = useMemo(() => {
        if (!selectedDate || !selectedServiceData) return [] as TimeOption[];
        const d = moment.utc(selectedDate, "YYYY-MM-DD");
        const stepMin = 30;
        const durationMin = selectedServiceData.durationMin;
        const times: TimeOption[] = [];
        const startOfDay = d.clone().hour(6).minute(0);
        const endOfDay = d.clone().hour(22).minute(0);
        for (let m = startOfDay.clone(); m.isBefore(endOfDay); m.add(stepMin, "minute")) {
            const startMs = m.valueOf();
            const endMs = m.clone().add(durationMin, "minute").valueOf();
            const ok = withinSchedule(startMs, endMs) && hasFreeSlot(startMs, endMs);
            if (ok) {
                times.push({ time: m.format("HH:mm"), available: true });
            }
        }
        return times;
    }, [selectedDate, selectedServiceData, businessOperationSchedule, serviceOperationSchedule, eventBlocksForDate]);

    const totalPrice = selectedServiceData?.price || 0;

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleBooking = () => {
        // Here you would typically send the booking data to your backend
        // console.log booking kept in calling component if needed
        setStep(4);
    };

    return {
        // data
        business,
        services,
        selectedService,
        setSelectedService,
        selectedServiceData,
        availableDates,
        availableTimes,
        totalPrice,
        // selection state
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        // navigation
        step,
        handleNext,
        handleBack,
        handleBooking,
        // customer
        customerInfo,
        setCustomerInfo,
    } as const;
}

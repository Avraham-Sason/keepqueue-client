import type { Timestamp as TS } from "firebase/firestore";

export type ID = string;

export type CalendarEventStatus = "BOOKED" | "CONFIRMED" | "CANCELLED" | "NO_SHOW" | "DONE";

export type CalendarEventType = "APPOINTMENT" | "VACATION" | "HOLIDAY" | "OTHER";

export type NotificationType = "whatsapp" | "sms" | "email";
export type NotificationStatus = "QUEUED" | "SENT" | "FAILED" | "DELIVERED";
export type UserType = "business" | "customer";
export type CalendarEventSource = "web" | "admin" | "import";
export interface Availability {
    start: TS;
    end: TS;
}
export type Language = "he" | "en";

export interface DocBase {
    id?: ID;
    created: TS;
    timestamp: TS;
}

export interface UserBase extends DocBase {
    uid?: ID;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    contacts: Record<NotificationType, boolean>;
    roles?: string[];
    notes?: string;
    photoURL?: string;
    lastLoginAt?: TS;
    lastEventAt?: TS;
}
export interface BusinessOwner extends UserBase {
    ownedBusinessIds?: ID[];
    type: "business";
}

export interface Customer extends UserBase {
    type: "customer";
    business: ID[];
}
export type User = BusinessOwner | Customer;

export interface Business extends DocBase {
    name: string;
    ownerId: ID;
    phone?: string;
    geo?: { lat: number; lng: number };
    categories?: string[];
    ratingAvg?: number;
    ratingCount?: number;
    isActive: boolean;
    availability: Availability[];
    currency?: string;
    locale?: string;
    logoUrl?: string;
}

export interface Service extends DocBase {
    business: ID;
    name: string;
    durationMin: number;
    price: number;
    availability: Availability[];
    paddingBefore?: number;
    paddingAfter?: number;
    active: boolean;
    order?: number;
}

export interface CalendarEvent extends DocBase {
    business: ID;
    user: ID;
    type: CalendarEventType;
    status: CalendarEventStatus;
    title: string;
    start: TS;
    end: TS;
    allDay?: boolean;
    service?: ID;
    source?: CalendarEventSource;
    notes?: string;
}

export interface WaitItem extends DocBase {
    business: ID;
    user: ID;
    service: ID;
    preferredWindow: { from: TS; to: TS };
    priority?: number;
    expiresAt: TS;
}

export interface Review extends DocBase {
    reviewId: ID;
    business: ID;
    customerId: ID;
    appointmentId?: ID;
    rating: 1 | 2 | 3 | 4 | 5;
    text?: string;
    flagged: boolean;
}

export interface NotificationLog extends DocBase {
    business: ID;
    type: NotificationType;
    to: string;
    template: ID;
    content: string;
    status: NotificationStatus;
    error?: string;
    sentAt: TS;
}

export interface MessageTemplate extends DocBase {
    business: ID;
    key: string;
    language: Language;
    content: string;
    name: string;
    description?: string;
}

export interface Policy extends DocBase {
    policyId: ID;
    business: ID;
    cancellationWindowMin: number; // >= 0
    lateThresholdMin: number; // >= 0
    noShowAutoBlock: boolean;
    noShowLimit?: number; // >= 0
}

export interface Pricing extends DocBase {
    pricingId: ID;
    business: ID;
    vatPercent?: number;
    coupons?: {
        code: string;
        discountType: "PERCENT" | "AMOUNT";
        amount: number;
        validFrom: TS;
        validTo: TS;
        active: boolean;
    }[];
}

// ------------------------------------
// Stats (אגרגציות יומיות)
// date כ-Timestamp של יום
// ------------------------------------
export interface StatsDaily extends DocBase {
    statId: ID;
    business: ID;
    date: TS;
    bookings: number;
    cancellations: number;
    noShows: number;
    avgLeadTimeMin: number;
    revenueEstimate: number;
}

// ------------------------------------
// Integrations
// ------------------------------------
export interface Integration extends DocBase {
    integrationId: ID;
    business: ID;
    provider: string; // 'whatsapp' | ...
    status: "connected" | "error" | "disabled";
    meta?: Record<string, unknown>; // אל תשמרי סודות גולמיים
}

export interface Audit extends DocBase {
    business: ID;
    user: ID;
    entity: "services" | "businesses" | "calendar";
    action: "create" | "update" | "delete";
    subEntity: string;
}

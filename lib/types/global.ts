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
    policy?: Policy;
}

export interface Policy {
    cancellationWindowMin: number;
    lateThresholdMin: number;
    noShowAutoBlock: boolean;
    noShowLimit?: number;
}

export interface Service extends DocBase {
    business: ID;
    name: string;
    durationMin: number;
    price: number;
    pricing?: Pricing;
    availability: Availability[];
    paddingBefore?: number;
    paddingAfter?: number;
    active: boolean;
    order?: number;
}
export interface Pricing {
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
export interface CalendarEvent extends DocBase {
    business: ID;
    user: ID;
    type: CalendarEventType;
    status: CalendarEventStatus;
    title: string;
    start: TS;
    end: TS;
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
    business: ID;
    user: ID;
    calendarEventId?: ID;
    rating: 1 | 2 | 3 | 4 | 5;
    text?: string;
    flagged: boolean;
}

export interface NotificationLog extends DocBase {
    business: ID;
    type: NotificationType;
    to: string;
    messageTemplate: ID;
    content: string;
    status: NotificationStatus;
    sentAt: TS;
    error?: string;
}

export interface MessageTemplate extends DocBase {
    business: ID;
    key: string;
    language: Language;
    content: string;
    name: string;
    description?: string;
}

export interface Audit extends DocBase {
    business: ID;
    user: ID;
    entity: "services" | "businesses" | "calendar";
    action: "create" | "update" | "delete";
    subEntity: string;
}

export interface User {
    id: string;
    type: "customer" | "business";
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    avatarUrl?: string;
    createdAt: string;
}

export interface BusinessOwner extends User {
    type: "business";
    businessName: string;
    businessType: string;
    address: string;
    description: string;
    workingHours: string;
    services: Service[];
}

export interface Customer extends User {
    type: "customer";
    favoriteBusinesses: string[];
}

export interface Service {
    id: string;
    name: string;
    duration: number;
    price: number;
    description: string;
    popular?: boolean;
}

export interface Appointment {
    id: string;
    customerId: string;
    businessId: string;
    serviceId: string;
    date: string;
    time: string;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    notes?: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    serviceName: string;
    servicePrice: number;
    serviceDuration: number;
    createdAt: string;
}

// Mock Services
export const mockServices: Service[] = [
    {
        id: "service-1",
        name: "תספורת ועיצוב",
        duration: 60,
        price: 180,
        description: "תספורת מקצועית עם עיצוב וסטיילינג",
        popular: true,
    },
    {
        id: "service-2",
        name: "צביעת שיער",
        duration: 120,
        price: 300,
        description: "צביעה מלאה עם טיפוח השיער",
    },
    {
        id: "service-3",
        name: "מניקור",
        duration: 45,
        price: 80,
        description: "מניקור קלאסי עם לק",
        popular: true,
    },
    {
        id: "service-4",
        name: "טיפוח פנים",
        duration: 75,
        price: 200,
        description: "טיפוח פנים מעמיק עם לחות",
    },
    {
        id: "service-5",
        name: "הארכת ריסים",
        duration: 90,
        price: 250,
        description: "הארכת ריסים בשיטת נפח רוסי",
        popular: true,
    },
    {
        id: "service-6",
        name: "עיסוי רפואי",
        duration: 60,
        price: 220,
        description: "עיסוי רפואי לשחרור מתחים",
    },
    {
        id: "service-7",
        name: "טיפול בוטוקס",
        duration: 30,
        price: 800,
        description: "טיפול בוטוקס לקמטים",
    },
    {
        id: "service-8",
        name: "פדיקור",
        duration: 60,
        price: 120,
        description: "פדיקור מקצועי עם עיסוי",
    },
];

// Mock Business Owners
export const mockBusinessOwners: BusinessOwner[] = [
    {
        id: "business-1",
        type: "business",
        email: "sarah@sarahbeauty.com",
        firstName: "שרה",
        lastName: "כהן",
        phone: "03-123-4567",
        avatarUrl: "/placeholder.svg?height=40&width=40",
        businessName: "סלון יופי שרה",
        businessType: "סלון יופי",
        address: "דיזנגוף 123, תל אביב",
        description: "סלון יופי מוביל בתל אביב עם צוות מקצועי ושירות מעולה",
        workingHours: "ראשון-חמישי: 09:00-19:00, שישי: 09:00-15:00",
        createdAt: "2024-01-01T00:00:00Z",
        services: [mockServices[0], mockServices[1], mockServices[2]],
    },
];

// Mock Customers
export const mockCustomers: Customer[] = [
    {
        id: "customer-1",
        type: "customer",
        email: "yael@gmail.com",
        firstName: "יעל",
        lastName: "שמיר",
        phone: "050-123-4567",
        avatarUrl: "/placeholder.svg?height=40&width=40",
        createdAt: "2024-01-10T00:00:00Z",
        favoriteBusinesses: ["business-1", "business-2"],
    },
];

export const allUsers = [...mockBusinessOwners, ...mockCustomers];

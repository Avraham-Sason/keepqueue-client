export interface User {
  id: string
  type: "customer" | "business"
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  avatar?: string
  createdAt: string
}

export interface BusinessOwner extends User {
  type: "business"
  businessName: string
  businessType: string
  address: string
  description: string
  workingHours: string
  services: Service[]
}

export interface Customer extends User {
  type: "customer"
  favoriteBusinesses: string[]
}

export interface Service {
  id: string
  name: string
  duration: number
  price: number
  description: string
  popular?: boolean
}

export interface Appointment {
  id: string
  customerId: string
  businessId: string
  serviceId: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  notes?: string
  customerName: string
  customerPhone: string
  customerEmail: string
  serviceName: string
  servicePrice: number
  serviceDuration: number
  createdAt: string
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
]

// Mock Business Owners
export const mockBusinessOwners: BusinessOwner[] = [
  {
    id: "business-1",
    type: "business",
    email: "sarah@sarahbeauty.com",
    password: "123456",
    firstName: "שרה",
    lastName: "כהן",
    phone: "03-123-4567",
    avatar: "/placeholder.svg?height=40&width=40",
    businessName: "סלון יופי שרה",
    businessType: "סלון יופי",
    address: "דיזנגוף 123, תל אביב",
    description: "סלון יופי מוביל בתל אביב עם צוות מקצועי ושירות מעולה",
    workingHours: "ראשון-חמישי: 09:00-19:00, שישי: 09:00-15:00",
    createdAt: "2024-01-01T00:00:00Z",
    services: [mockServices[0], mockServices[1], mockServices[2]],
  },
  {
    id: "business-2",
    type: "business",
    email: "david@davidclinic.com",
    password: "123456",
    firstName: "דוד",
    lastName: "לוי",
    phone: "03-987-6543",
    avatar: "/placeholder.svg?height=40&width=40",
    businessName: "קליניקת יופי דוד",
    businessType: "קליניקה אסתטית",
    address: "רוטשילד 45, תל אביב",
    description: "קליניקה מתקדמת לטיפולים אסתטיים עם הטכנולוגיה החדישה",
    workingHours: "ראשון-חמישי: 08:00-18:00",
    createdAt: "2024-01-02T00:00:00Z",
    services: [mockServices[3], mockServices[4], mockServices[6]],
  },
  {
    id: "business-3",
    type: "business",
    email: "maya@mayanails.com",
    password: "123456",
    firstName: "מיה",
    lastName: "אברהם",
    phone: "03-456-7890",
    avatar: "/placeholder.svg?height=40&width=40",
    businessName: "סלון ציפורניים מיה",
    businessType: "סלון ציפורניים",
    address: "אלנבי 67, תל אביב",
    description: "מומחים במניקור ופדיקור עם מגוון עצום של צבעים ועיצובים",
    workingHours: "ראשון-שישי: 09:00-20:00",
    createdAt: "2024-01-03T00:00:00Z",
    services: [mockServices[2], mockServices[7]],
  },
  {
    id: "business-4",
    type: "business",
    email: "wellness@spa.com",
    password: "123456",
    firstName: "רחל",
    lastName: "גולדברג",
    phone: "03-234-5678",
    avatar: "/placeholder.svg?height=40&width=40",
    businessName: "ספא בריאות",
    businessType: "ספא",
    address: "יפו 89, תל אביב",
    description: "ספא יוקרתי המציע חוויית רגיעה מושלמת עם טיפולים מקצועיים",
    workingHours: "ראשון-שבת: 08:00-22:00",
    createdAt: "2024-01-04T00:00:00Z",
    services: [mockServices[3], mockServices[5]],
  },
  {
    id: "business-5",
    type: "business",
    email: "alex@alexhair.com",
    password: "123456",
    firstName: "אלכס",
    lastName: "רוזנברג",
    phone: "03-345-6789",
    avatar: "/placeholder.svg?height=40&width=40",
    businessName: "מספרת אלכס",
    businessType: "מספרה",
    address: "בן יהודה 34, תל אביב",
    description: "מספרה מקצועית לגברים ונשים עם סטיליסטים מנוסים",
    workingHours: "ראשון-חמישי: 08:00-19:00, שישי: 08:00-14:00",
    createdAt: "2024-01-05T00:00:00Z",
    services: [mockServices[0], mockServices[1]],
  },
]

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: "customer-1",
    type: "customer",
    email: "yael@gmail.com",
    password: "123456",
    firstName: "יעל",
    lastName: "שמיר",
    phone: "050-123-4567",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-10T00:00:00Z",
    favoriteBusinesses: ["business-1", "business-2"],
  },
  {
    id: "customer-2",
    type: "customer",
    email: "tom@gmail.com",
    password: "123456",
    firstName: "תום",
    lastName: "דוד",
    phone: "050-234-5678",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-11T00:00:00Z",
    favoriteBusinesses: ["business-5"],
  },
  {
    id: "customer-3",
    type: "customer",
    email: "noa@gmail.com",
    password: "123456",
    firstName: "נועה",
    lastName: "מזרחי",
    phone: "050-345-6789",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-12T00:00:00Z",
    favoriteBusinesses: ["business-3", "business-4"],
  },
  {
    id: "customer-4",
    type: "customer",
    email: "avi@gmail.com",
    password: "123456",
    firstName: "אבי",
    lastName: "גרין",
    phone: "050-456-7890",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-13T00:00:00Z",
    favoriteBusinesses: ["business-1", "business-5"],
  },
  {
    id: "customer-5",
    type: "customer",
    email: "dana@gmail.com",
    password: "123456",
    firstName: "דנה",
    lastName: "בן דוד",
    phone: "050-567-8901",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-14T00:00:00Z",
    favoriteBusinesses: ["business-2", "business-4"],
  },
]

export const allUsers = [...mockBusinessOwners, ...mockCustomers]

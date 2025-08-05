import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MessageSquare, Users, Star, BarChart3, Building, User, Smartphone, LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// -----------------------
// Shared static types
// -----------------------
export interface FeatureStatic {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
}

export interface TestimonialStatic {
    name: string;
    business: string;
    image: string;
    rating: number;
    text: string;
}

/***************************
 * STATIC DATA (SEO-friendly)
 ***************************/
export const FEATURES: FeatureStatic[] = [
    {
        icon: Calendar,
        title: "זמינות 24/7",
        description: "לקוחות יכולים לקבוע, לשנות ולבטל תורים בכל זמן מכל מכשיר",
        color: "bg-blue-500/10 text-blue-600",
    },
    {
        icon: MessageSquare,
        title: "תזכורות WhatsApp",
        description: "תזכורות ואישורים אוטומטיים מפחיתים אי-הגעות עד 80%",
        color: "bg-green-500/10 text-green-600",
    },
    {
        icon: Clock,
        title: "רשימת המתנה חכמה",
        description: "מילוי ביטולים מיידי עם התראות אוטומטיות ללקוחות ממתינים",
        color: "bg-purple-500/10 text-purple-600",
    },
    {
        icon: BarChart3,
        title: "דוחות בזמן אמת",
        description: "מעקב אחר הזמנות, שיעור אי-הגעות והכנסות עם ייצוא CSV",
        color: "bg-orange-500/10 text-orange-600",
    },
    {
        icon: Users,
        title: "ניהול לקוחות",
        description: "טיפול בלקוחות בעייתיים ובניית קשרים ארוכי טווח",
        color: "bg-pink-500/10 text-pink-600",
    },
    {
        icon: Star,
        title: "ביקורות ודירוגים",
        description: "בניית אמון עם ביקורות לקוחות ושיפור הנוכחות המקוונת",
        color: "bg-yellow-500/10 text-yellow-600",
    },
];

export const TESTIMONIALS: TestimonialStatic[] = [
    {
        name: "שרה כהן",
        business: "סלון יופי שרה",
        image: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "Keepqueue שינה לי את העסק! הלקוחות שלי אוהבים את הנוחות והתזכורות האוטומטיות הפחיתו את אי-ההגעות ב-70%",
    },
    {
        name: "דוד לוי",
        business: "מכון יופי דוד",
        image: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "הממשק פשוט ונוח, והלקוחות שלי מרוצים מהאפשרות לקבוע תורים בכל שעה. המערכת חסכה לי שעות עבודה",
    },
    {
        name: "מיכל אברהם",
        business: "קליניקת יופי מיכל",
        image: "/placeholder.svg?height=60&width=60",
        rating: 5,
        text: "הדוחות והאנליטיקה עזרו לי להבין את הלקוחות שלי טוב יותר ולשפר את השירות. ממליצה בחום!",
    },
];

export const STATS = [
    { number: "10,000+", label: "עסקים פעילים" },
    { number: "500K+", label: "תורים חודשיים" },
    { number: "98%", label: "שביעות רצון" },
    { number: "24/7", label: "תמיכה" },
];

/************************************************
 * HeroCards – two main CTA cards               *
 ************************************************/
export function HeroCards() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                {/* Card – Business owners */}
                <Card className="p-6 text-center hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
                    <Building className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">לבעלי עסקים</h3>
                    <p className="text-muted-foreground mb-4">נהל את העסק שלך בקלות</p>
                    <Button size="lg" className="w-full" asChild>
                        <Link href="/business/auth/signin">כניסה לעסק</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent" asChild>
                        <Link href="/business/auth/signup">הרשמת עסק חדש</Link>
                    </Button>
                </Card>

                {/* Card – Customers */}
                <Card className="p-6 text-center hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
                    <User className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">לקוחות</h3>
                    <p className="text-muted-foreground mb-4">מצא וקבע תורים בקלות</p>
                    <Button size="lg" className="w-full" asChild>
                        <Link href="/customer/auth/signin">כניסה ללקוחות</Link>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full bg-transparent mt-2 " asChild>
                        <Link href="/customer/marketplace">חיפוש עסקים</Link>
                    </Button>
                </Card>
            </div>
        </div>
    );
}

/****************************************
 * FeatureCard – single feature tile    *
 ****************************************/
export function FeatureCard({ feature }: { feature: FeatureStatic }) {
    const { icon: Icon, title, description, color } = feature;
    return (
        <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
                <div className={`h-12 w-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
            </CardContent>
        </Card>
    );
}

/*********************************
 * StatsGrid – animated counters *
 *********************************/
export function StatsGrid() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {STATS.map((stat, index) => (
                <div
                    key={stat.label}
                    className="text-center animate-in fade-in slide-in-from-bottom-3 duration-500"
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                    <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
            ))}
        </div>
    );
}

/********************************
 * HeroSection – top of page    *
 ********************************/
export function HeroSection() {
    return (
        <section className="py-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 queue-pattern opacity-30" />
            <div className="container max-w-6xl mx-auto text-center relative">
                <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                    <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
                        <Smartphone className="h-3 w-3 mr-1" />
                        ניסיון חינם 14 יום • ללא כרטיס אשראי
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        ניהול תורים חכם
                        <span className="text-primary block">לעסקי יופי</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                        נהל את התורים שלך מקצה לקצה עם תזכורות WhatsApp אוטומטיות, תזמון חכם ואנליטיקה מתקדמת. מושלם לסלונים, קליניקות ומרכזי בריאות.
                    </p>
                    <HeroCards />
                    <StatsGrid />
                </div>
            </div>
        </section>
    );
}

/****************************************
 * FeaturesSection – list of features   *
 ****************************************/
export function FeaturesSection() {
    return (
        <section id="features" className="py-20 px-4 bg-muted/30">
            <div className="container max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">כל מה שאתה צריך לניהול תורים</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        מהזמנה ועד אנליטיקה, Keepqueue מספק את כל הכלים להצמחת עסק היופי שלך
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURES.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="animate-in fade-in slide-in-from-bottom-3 duration-500"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <FeatureCard feature={feature} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/*******************************************
 * TestimonialsSection – user reviews      *
 *******************************************/
export function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-20 px-4">
            <div className="container max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">מה אומרים הלקוחות שלנו</h2>
                    <p className="text-xl text-muted-foreground">אלפי בעלי עסקים בוטחים ב-Keepqueue לניהול התורים שלהם</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <div
                            key={testimonial.name}
                            className="animate-in fade-in slide-in-from-bottom-3 duration-500"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <TestimonialCard testimonial={testimonial} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/*****************************************
 * TestimonialCard – customer feedback   *
 *****************************************/
export function TestimonialCard({ testimonial }: { testimonial: TestimonialStatic }) {
    const { name, business, image, rating, text } = testimonial;
    return (
        <Card className="h-full">
            <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                    <Image src={image || "/placeholder.svg"} alt={name} width={60} height={60} className="h-12 w-12 rounded-full mr-4" />
                    <div>
                        <h4 className="font-semibold">{name}</h4>
                        <p className="text-sm text-muted-foreground">{business}</p>
                    </div>
                </div>
                <div className="flex mb-4">
                    {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <p className="text-muted-foreground italic">"{text}"</p>
            </CardContent>
        </Card>
    );
}

/***************************
 * Footer Helper component *
 ***************************/
export interface FooterLinkStatic {
    href: string;
    label: string;
}

export function FooterColumn({ title, links }: { title: string; links: FooterLinkStatic[] }) {
    return (
        <div>
            <h3 className="font-semibold mb-4">{title}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
                {links.map(({ href, label }) => (
                    <li key={href}>
                        <Link href={href} className="hover:text-foreground transition-colors">
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function SiteFooter() {
    return (
        <footer className="border-t py-12 px-4 bg-background">
            <div className="container max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                <Users className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-bold">Keepqueue</span>
                        </div>
                        <p className="text-muted-foreground text-sm">פלטפורמת ניהול תורים מתקדמת לעסקי יופי ובריאות</p>
                    </div>
                    <FooterColumn
                        title="מוצר"
                        links={[
                            { href: "#features", label: "יתרונות" },
                            { href: "#pricing", label: "מחירים" },
                            { href: "/marketplace", label: "חיפוש עסקים" },
                        ]}
                    />
                    <FooterColumn
                        title="תמיכה"
                        links={[
                            { href: "/help", label: "מרכז עזרה" },
                            { href: "/contact", label: "צור קשר" },
                            { href: "/api", label: "API" },
                        ]}
                    />
                    <FooterColumn
                        title="חברה"
                        links={[
                            { href: "/about", label: "אודות" },
                            { href: "/careers", label: "קריירה" },
                            { href: "/blog", label: "בלוג" },
                        ]}
                    />
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
                    <div className="flex space-x-6 text-sm text-muted-foreground mb-4 md:mb-0">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">
                            מדיניות פרטיות
                        </Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">
                            תנאי שימוש
                        </Link>
                    </div>
                    <div className="text-sm text-muted-foreground">© 2024 Keepqueue. כל הזכויות שמורות.</div>
                </div>
            </div>
        </footer>
    );
}

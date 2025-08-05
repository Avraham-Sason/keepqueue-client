"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MessageSquare, Users, Star, Smartphone, BarChart3, Shield, Building, User } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export function LandingPage() {
    const [email, setEmail] = useState("");

    const features = [
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

    const testimonials = [
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

    const stats = [
        { number: "10,000+", label: "עסקים פעילים" },
        { number: "500K+", label: "תורים חודשיים" },
        { number: "98%", label: "שביעות רצון" },
        { number: "24/7", label: "תמיכה" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold">Keepqueue</span>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                            יתרונות
                        </Link>
                        <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                            מחירים
                        </Link>
                        <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
                            המלצות
                        </Link>
                        <Link href="/marketplace" className="text-sm font-medium hover:text-primary transition-colors">
                            חיפוש עסקים
                        </Link>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/auth/signin">התחברות</Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link href="/auth/signup">התחל ניסיון חינם</Link>
                        </Button>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 queue-pattern opacity-30" />
                <div className="container max-w-6xl mx-auto text-center relative">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
                            <Smartphone className="h-3 w-3 mr-1" />
                            ניסיון חינם 14 יום • ללא כרטיס אשראי
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            ניהול תורים חכם
                            <span className="text-primary block">לעסקי יופי</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                            נהל את התורים שלך מקצה לקצה עם תזכורות WhatsApp אוטומטיות, תזמון חכם ואנליטיקה מתקדמת. מושלם לסלונים, קליניקות ומרכזי
                            בריאות.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
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

                                <Card className="p-6 text-center hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary">
                                    <User className="h-12 w-12 mx-auto mb-4 text-primary" />
                                    <h3 className="text-xl font-bold mb-2">للלקוחות</h3>
                                    <p className="text-muted-foreground mb-4">מצא וקבע תורים בקלות</p>
                                    <Button size="lg" className="w-full" asChild>
                                        <Link href="/customer/marketplace">חיפוש עסקים</Link>
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent" asChild>
                                        <Link href="/customer/auth/signin">כניסה ללקוחות</Link>
                                    </Button>
                                </Card>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-2xl md:text-3xl font-bold text-primary">{stat.number}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-4 bg-muted/30">
                <div className="container max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">כל מה שאתה צריך לניהול תורים</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            מהזמנה ועד אנליטיקה, Keepqueue מספק את כל הכלים להצמחת עסק היופי שלך
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <CardHeader>
                                        <div className={`h-12 w-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                                            <feature.icon className="h-6 w-6" />
                                        </div>
                                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20 px-4">
                <div className="container max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">מה אומרים הלקוחות שלנו</h2>
                        <p className="text-xl text-muted-foreground">אלפי בעלי עסקים בוטחים ב-Keepqueue לניהול התורים שלהם</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <Card className="h-full">
                                    <CardContent className="pt-6">
                                        <div className="flex items-center mb-4">
                                            <Image
                                                src={testimonial.image || "/placeholder.svg"}
                                                alt={testimonial.name}
                                                width={60}
                                                height={60}
                                                className="h-12 w-12 rounded-full mr-4"
                                            />
                                            <div>
                                                <h4 className="font-semibold">{testimonial.name}</h4>
                                                <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                                            </div>
                                        </div>
                                        <div className="flex mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-20 px-4 bg-primary/5">
                <div className="container max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">מוכן להתחיל?</h2>
                        <p className="text-xl text-muted-foreground mb-8">הצטרף לאלפי בעלי עסקים שכבר משתמשים ב-Keepqueue</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
                            <Input
                                type="email"
                                placeholder="הכנס את המייל שלך"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-1"
                            />
                            <Button>התחל עכשיו</Button>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                            <Shield className="h-4 w-4" />
                            ניסיון חינם 14 יום • ביטול בכל עת • ללא עמלות הקמה
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
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
                        <div>
                            <h3 className="font-semibold mb-4">מוצר</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <Link href="#features" className="hover:text-foreground transition-colors">
                                        יתרונות
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#pricing" className="hover:text-foreground transition-colors">
                                        מחירים
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/marketplace" className="hover:text-foreground transition-colors">
                                        חיפוש עסקים
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">תמיכה</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <Link href="/help" className="hover:text-foreground transition-colors">
                                        מרכז עזרה
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:text-foreground transition-colors">
                                        צור קשר
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/api" className="hover:text-foreground transition-colors">
                                        API
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">חברה</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>
                                    <Link href="/about" className="hover:text-foreground transition-colors">
                                        אודות
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/careers" className="hover:text-foreground transition-colors">
                                        קריירה
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="hover:text-foreground transition-colors">
                                        בלוג
                                    </Link>
                                </li>
                            </ul>
                        </div>
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
        </div>
    );
}

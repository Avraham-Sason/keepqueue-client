"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Shield } from "lucide-react";
import { SiteFooter, HeroSection, FeaturesSection, TestimonialsSection } from "./static-components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold">Keepqueue</span>
                </div>

                <nav className="hidden md:flex items-center gap-4">
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

                    <Button size="sm" asChild>
                        <Link href="/auth/signup">התחל ניסיון חינם</Link>
                    </Button>
                </nav>

                <ThemeToggle />
            </div>
        </header>
    );
}

function NewsletterSection() {
    const [email, setEmail] = useState("");
    return (
        <section className="py-20 px-4 bg-primary/5">
            <div className="container max-w-4xl mx-auto text-center">
                <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
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
                </div>
            </div>
        </section>
    );
}

export default function LandingClient() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <SiteHeader />
            <HeroSection />
            <FeaturesSection />
            <TestimonialsSection />
            <NewsletterSection />
            <SiteFooter />
        </div>
    );
}

"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useBusinessAuthStore } from "@/lib/store";

export function BusinessSignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const login = useBusinessAuthStore.useLogin();

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await login(email, password);

            if (result.success) {
                router.push("/business/dashboard");
            } else {
                setError(result.error || "שגיאה בהתחברות");
            }
        } catch (err) {
            setError("שגיאה בהתחברות");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">התחברות לבעלי עסקים</CardTitle>
                <CardDescription className="text-center">הכנס את פרטי ההתחברות שלך כדי לגשת לפאנל הניהול</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">כתובת מייל</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">סיסמה</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="הכנס סיסמה"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                מתחבר...
                            </>
                        ) : (
                            "התחבר"
                        )}
                    </Button>
                </form>

                <div className="mt-4 text-center text-sm">
                    <p className="text-muted-foreground">
                        אין לך חשבון?{" "}
                        <a href="/business/auth/signup" className="text-primary hover:underline">
                            הירשם כאן
                        </a>
                    </p>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">חשבונות לבדיקה:</h4>
                    <div className="space-y-1 text-sm">
                        <p>sarah@sarahbeauty.com / 123456</p>
                        <p>david@davidclinic.com / 123456</p>
                        <p>maya@mayanails.com / 123456</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

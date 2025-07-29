"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function BusinessSignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Back to home */}
        <div className="mb-6">
          <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowRight className="h-4 w-4 mr-2" />
            חזור לדף הבית
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                <Building className="h-7 w-7 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">הרשמת עסק חדש</CardTitle>
            <CardDescription>הצטרף ל-Keepqueue ונהל את העסק שלך בקלות</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">שם פרטי</Label>
                    <div className="relative">
                      <User className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input id="firstName" placeholder="שם פרטי" className="pr-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">שם משפחה</Label>
                    <Input id="lastName" placeholder="שם משפחה" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">כתובת מייל עסקית</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="business@example.com" className="pr-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">טלפון עסקי</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" placeholder="03-123-4567" className="pr-10" />
                  </div>
                </div>

                <Button className="w-full" onClick={() => setStep(2)}>
                  המשך
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="businessName">שם העסק</Label>
                  <div className="relative">
                    <Building className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="businessName" placeholder="שם העסק שלך" className="pr-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">סוג העסק</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="בחר סוג עסק" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hair-salon">מספרה</SelectItem>
                      <SelectItem value="beauty-salon">סלון יופי</SelectItem>
                      <SelectItem value="nail-salon">סלון ציפורניים</SelectItem>
                      <SelectItem value="spa">ספא</SelectItem>
                      <SelectItem value="clinic">קליניקה אסתטית</SelectItem>
                      <SelectItem value="massage">עיסוי</SelectItem>
                      <SelectItem value="other">אחר</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">כתובת העסק</Label>
                  <Input id="address" placeholder="רחוב 123, עיר" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">סיסמה</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="בחר סיסמה חזקה"
                      className="pr-10 pl-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms" className="text-sm">
                    אני מסכים ל
                    <Link href="/terms" className="text-primary hover:underline">
                      תנאי השימוש
                    </Link>{" "}
                    ול
                    <Link href="/privacy" className="text-primary hover:underline">
                      מדיניות הפרטיות
                    </Link>
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="bg-transparent">
                    חזור
                  </Button>
                  <Button className="flex-1" asChild>
                    <Link href="/business/dashboard">התחל ניסיון חינם</Link>
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">או</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="bg-transparent">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </>
            )}

            <div className="text-center text-sm text-muted-foreground">
              יש לך כבר עסק רשום?{" "}
              <Link href="/business/auth/signin" className="text-primary hover:underline font-medium">
                התחבר כאן
              </Link>
            </div>

            <div className="text-center">
              <Link href="/customer/auth/signin" className="text-sm text-muted-foreground hover:text-foreground">
                לקוח? כניסה לאזור הלקוחות
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

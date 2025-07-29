"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Send, Users, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react"
import { motion } from "framer-motion"

export function WhatsAppManager() {
  const [isConnected, setIsConnected] = useState(true)
  const [autoReminders, setAutoReminders] = useState(true)
  const [autoConfirmations, setAutoConfirmations] = useState(true)

  const templates = [
    {
      id: 1,
      name: "תזכורת תור",
      type: "reminder",
      content: "שלום {{name}}, מזכירים לך על התור שלך מחר ב-{{time}} ב{{business}}. לביטול: {{cancel_link}}",
      active: true,
      sent: 45,
    },
    {
      id: 2,
      name: "אישור תור",
      type: "confirmation",
      content: "שלום {{name}}, התור שלך נקבע בהצלחה ל-{{date}} ב-{{time}}. נתראה ב{{business}}!",
      active: true,
      sent: 23,
    },
    {
      id: 3,
      name: "ביטול תור",
      type: "cancellation",
      content: "שלום {{name}}, התור שלך ל-{{date}} בוטל. לקביעת תור חדש: {{booking_link}}",
      active: true,
      sent: 8,
    },
  ]

  const recentMessages = [
    {
      id: 1,
      customer: "רחל כהן",
      phone: "+972-50-123-4567",
      message: "תזכורת תור למחר 10:00",
      type: "reminder",
      status: "delivered",
      time: "לפני 2 שעות",
    },
    {
      id: 2,
      customer: "מיה לוי",
      phone: "+972-52-987-6543",
      message: "אישור תור חדש",
      type: "confirmation",
      status: "read",
      time: "לפני 4 שעות",
    },
    {
      id: 3,
      customer: "שרה בן-דוד",
      phone: "+972-54-456-7890",
      message: "ביטול תור",
      type: "cancellation",
      status: "delivered",
      time: "לפני יום",
    },
  ]

  const stats = [
    {
      title: "הודעות נשלחו היום",
      value: "23",
      change: "+12%",
      icon: Send,
    },
    {
      title: "שיעור קריאה",
      value: "94%",
      change: "+5%",
      icon: CheckCircle,
    },
    {
      title: "הפחתת אי-הגעות",
      value: "78%",
      change: "+15%",
      icon: Users,
    },
    {
      title: "זמן תגובה ממוצע",
      value: "2 דק'",
      change: "-30%",
      icon: Clock,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">WhatsApp</h1>
          <p className="text-muted-foreground">נהל תזכורות ותקשורת עם הלקוחות</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center gap-1">
            {isConnected ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
            {isConnected ? "מחובר" : "לא מחובר"}
          </Badge>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            תבנית חדשה
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change} מהחודש הקודם</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages">הודעות אחרונות</TabsTrigger>
          <TabsTrigger value="templates">תבניות</TabsTrigger>
          <TabsTrigger value="settings">הגדרות</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>הודעות אחרונות</CardTitle>
              <CardDescription>הודעות WhatsApp שנשלחו לאחרונה</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{message.customer}</p>
                        <p className="text-sm text-muted-foreground">{message.phone}</p>
                        <p className="text-sm">{message.message}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={message.status === "read" ? "default" : "secondary"}>
                        {message.status === "read" ? "נקרא" : "נמסר"}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>נשלח {template.sent} פעמים החודש</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={template.active ? "default" : "secondary"}>
                        {template.active ? "פעיל" : "לא פעיל"}
                      </Badge>
                      <Switch checked={template.active} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">{template.content}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        עריכה
                      </Button>
                      <Button variant="outline" size="sm">
                        בדיקה
                      </Button>
                      <Button variant="outline" size="sm">
                        שכפול
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>הגדרות אוטומטיות</CardTitle>
                <CardDescription>הגדר שליחה אוטומטית של הודעות</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">תזכורות אוטומטיות</Label>
                    <p className="text-sm text-muted-foreground">שלח תזכורות 24 שעות לפני התור</p>
                  </div>
                  <Switch checked={autoReminders} onCheckedChange={setAutoReminders} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">אישורים אוטומטיים</Label>
                    <p className="text-sm text-muted-foreground">שלח אישור מיד לאחר קביעת תור</p>
                  </div>
                  <Switch checked={autoConfirmations} onCheckedChange={setAutoConfirmations} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>חיבור WhatsApp Business</CardTitle>
                <CardDescription>נהל את החיבור ל-WhatsApp Business API</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
                  <span className="text-sm">{isConnected ? "מחובר ל-WhatsApp Business" : "לא מחובר"}</span>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">מספר טלפון עסקי</Label>
                  <Input id="phone" placeholder="+972-3-123-4567" />
                </div>
                <Button className="w-full" variant={isConnected ? "outline" : "default"}>
                  {isConnected ? "נתק חיבור" : "התחבר"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

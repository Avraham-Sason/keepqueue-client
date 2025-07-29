"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Building, MapPin, Phone, Mail, Camera, Save, Trash2, Plus } from "lucide-react"

export function BusinessSettings() {
  const [businessInfo, setBusinessInfo] = useState({
    name: "סלון יופי שרה",
    description: "סלון יופי מוביל בתל אביב עם צוות מקצועי ושירות מעולה",
    category: "beauty-salon",
    phone: "03-123-4567",
    email: "info@sarahsbeauty.com",
    address: "דיזנגוף 123, תל אביב",
    website: "www.sarahsbeauty.com",
  })

  const [workingHours, setWorkingHours] = useState([
    { day: "ראשון", open: "09:00", close: "19:00", closed: false },
    { day: "שני", open: "09:00", close: "19:00", closed: false },
    { day: "שלישי", open: "09:00", close: "19:00", closed: false },
    { day: "רביעי", open: "09:00", close: "19:00", closed: false },
    { day: "חמישי", open: "09:00", close: "19:00", closed: false },
    { day: "שישי", open: "09:00", close: "15:00", closed: false },
    { day: "שבת", open: "10:00", close: "16:00", closed: true },
  ])

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    smsReminders: true,
    whatsappNotifications: true,
    marketingEmails: false,
  })

  const staff = [
    {
      id: 1,
      name: "שרה כהן",
      role: "מנהלת ומעצבת שיער",
      email: "sarah@sarahsbeauty.com",
      phone: "050-123-4567",
      avatar: "/placeholder.svg?height=40&width=40",
      active: true,
    },
    {
      id: 2,
      name: "מיה לוי",
      role: "מניקוריסטית",
      email: "maya@sarahsbeauty.com",
      phone: "052-987-6543",
      avatar: "/placeholder.svg?height=40&width=40",
      active: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">הגדרות עסק</h1>
          <p className="text-muted-foreground">נהל את פרטי העסק והגדרות המערכת</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          שמור שינויים
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">כללי</TabsTrigger>
          <TabsTrigger value="hours">שעות פעילות</TabsTrigger>
          <TabsTrigger value="staff">צוות</TabsTrigger>
          <TabsTrigger value="notifications">התראות</TabsTrigger>
          <TabsTrigger value="billing">חיוב</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Business Profile */}
            <Card>
              <CardHeader>
                <CardTitle>פרופיל עסק</CardTitle>
                <CardDescription>פרטי העסק הבסיסיים</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-lg">
                      <Building className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    שנה תמונה
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessName">שם העסק</Label>
                  <Input
                    id="businessName"
                    value={businessInfo.name}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">תיאור</Label>
                  <Textarea
                    id="description"
                    value={businessInfo.description}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">קטגוריה</Label>
                  <Select value={businessInfo.category} onValueChange={(value) => setBusinessInfo({ ...businessInfo, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hair-salon">מספרה</SelectItem>
                      <SelectItem value="beauty-salon">סלון יופי</SelectItem>
                      <SelectItem value="nail-salon">סלון ציפורניים</SelectItem>
                      <SelectItem value="spa">ספא</SelectItem>
                      <SelectItem value="clinic">קליניקה אסתטית</SelectItem>
                      <SelectItem value="massage">עיסוי</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>פרטי קשר</CardTitle>
                <CardDescription>מידע ליצירת קשר עם העסק</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">טלפון</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={businessInfo.phone}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">מייל</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={businessInfo.email}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">כתובת</Label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="address"
                      value={businessInfo.address}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">אתר אינטרנט</Label>
                  <Input
                    id="website"
                    value={businessInfo.website}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, website: e.target.value })}
                    placeholder="www.example.com"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hours" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>שעות פעילות</CardTitle>
              <CardDescription>הגדר את שעות הפעילות של העסק</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workingHours.map((day, index) => (
                  <div key={day.day} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-20">
                      <span className="font-medium">{day.day}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={!day.closed}
                        onCheckedChange={(checked) => {
                          const newHours = [...workingHours]
                          newHours[index].closed = !checked
                          setWorkingHours(newHours)
                        }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {day.closed ? "סגור" : "פתוח"}
                      </span>
                    </div>
                    {!day.closed && (
                      <>
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            value={day.open}
                            onChange={(e) => {
                              const newHours = [...workingHours]
                              newHours[index].open = e.target.value
                              setWorkingHours(newHours)
                            }}
                            className="w-32"
                          />
                          <span>עד</span>
                          <Input
                            type="time"
                            value={day.close}
                            onChange={(e) => {
                              const newHours = [...workingHours]
                              newHours[index].close = e.target.value
                              setWorkingHours(newHours)
                            }}
                            className="w-32"
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">צוות העסק</h3>
              <p className="text-sm text-muted-foreground">נהל את חברי הצוות והרשאותיהם</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              הוסף חבר צוות
            </Button>
          </div>

          <div className="grid gap-4">
            {staff.map((member) => (
              <Card key={member.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>{member.email}</span>
                          <span>{member.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={member.active ? "default" : "secondary"}>
                        {member.active ? "פעיל" : "לא פעיל"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        עריכה
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>הגדרות התראות</CardTitle>
              <CardDescription>בחר איך תרצה לקבל התראות</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">התראות מייל על הזמנות</Label>
                  <p className="text-sm text-muted-foreground">קבל מייל כשמזמינים תור חדש</p>
                </div>
                <Switch
                  checked={notifications.emailBookings}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailBookings: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">תזכורות SMS</Label>
                  <p className="text-sm text-muted-foreground">קבל SMS על תורים מתקרבים</p>
                </div>
                <Switch
                  checked={notifications.smsReminders}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, smsReminders: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">\

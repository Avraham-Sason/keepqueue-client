"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, Star, CheckCircle, XCircle, AlertCircle, Heart, Search } from "lucide-react"
import { motion } from "framer-motion"
import { useAppStore } from "@/lib/store"
import type { Customer } from "@/lib/mock-data"

export function CustomerDashboard() {
  const { user, getCustomerAppointments, businesses } = useAppStore()
  const customer = user as Customer

  if (!customer || customer.type !== "customer") {
    return <div>שגיאה: משתמש לא מורשה</div>
  }

  // Get real appointments for this customer
  const customerAppointments = getCustomerAppointments(customer.id)

  // Get favorite businesses
  const favoriteBusinesses = businesses.filter((business) => customer.favoriteBusinesses.includes(business.id))

  // Sort appointments by date
  const sortedAppointments = customerAppointments.sort(
    (a, b) => new Date(a.date + " " + a.time).getTime() - new Date(b.date + " " + b.time).getTime(),
  )

  const upcomingAppointments = sortedAppointments.filter(
    (apt) => new Date(apt.date) >= new Date(new Date().toISOString().split("T")[0]),
  )

  const pastAppointments = sortedAppointments.filter(
    (apt) => new Date(apt.date) < new Date(new Date().toISOString().split("T")[0]),
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "מאושר"
      case "pending":
        return "ממתין לאישור"
      case "cancelled":
        return "בוטל"
      case "completed":
        return "הושלם"
      default:
        return status
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">שלום, {customer.firstName}!</h1>
            <p className="text-muted-foreground">ברוך הבא לפאנל הלקוחות שלך</p>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.firstName} />
              <AvatarFallback>{customer.firstName.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">תורים קרובים</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            <p className="text-xs text-muted-foreground">תורים מתוכננים</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">תורים שהושלמו</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pastAppointments.filter((apt) => apt.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">סה"כ תורים</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">עסקים מועדפים</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{favoriteBusinesses.length}</div>
            <p className="text-xs text-muted-foreground">עסקים שמורים</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">סה"כ הוצאות</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₪
              {pastAppointments
                .filter((apt) => apt.status === "completed")
                .reduce((sum, apt) => sum + apt.servicePrice, 0)}
            </div>
            <p className="text-xs text-muted-foreground">מתורים שהושלמו</p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="col-span-4"
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>התורים הקרובים שלי</CardTitle>
              <CardDescription>התורים שלך בימים הקרובים</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.slice(0, 5).map((appointment) => {
                    const business = businesses.find((b) => b.id === appointment.businessId)
                    return (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={business?.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{business?.businessName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{business?.businessName}</p>
                            <p className="text-sm text-muted-foreground">{appointment.serviceName}</p>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{appointment.date}</span>
                              <Clock className="h-3 w-3" />
                              <span>{appointment.time}</span>
                            </div>
                            {appointment.notes && (
                              <p className="text-xs text-muted-foreground italic">"{appointment.notes}"</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="flex items-center space-x-1">
                            {getStatusIcon(appointment.status)}
                            <span>{getStatusText(appointment.status)}</span>
                          </Badge>
                          <div className="text-sm font-medium">₪{appointment.servicePrice}</div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">אין תורים קרובים</p>
                    <p className="text-sm">קבע תור חדש בשוק העסקים</p>
                    <Button className="mt-4" asChild>
                      <a href="/customer/marketplace">
                        <Search className="h-4 w-4 mr-2" />
                        חפש עסקים
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Favorite Businesses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="col-span-3"
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>העסקים המועדפים שלי</CardTitle>
              <CardDescription>העסקים שאתה הכי אוהב</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {favoriteBusinesses.length > 0 ? (
                favoriteBusinesses.map((business) => (
                  <div key={business.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={business.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{business.businessName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{business.businessName}</p>
                      <p className="text-sm text-muted-foreground">{business.businessType}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{business.address}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      קבע תור
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>אין עסקים מועדפים</p>
                  <p className="text-sm">הוסף עסקים למועדפים בשוק</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

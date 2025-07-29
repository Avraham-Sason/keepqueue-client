"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Calendar,
  Clock,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Phone,
  Mail,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useAppStore } from "@/lib/store"
import type { BusinessOwner } from "@/lib/mock-data"

export function AppointmentsManager() {
  const { t } = useLanguage()
  const { user, getBusinessAppointments, updateAppointment, deleteAppointment } = useAppStore()
  const [searchTerm, setSearchTerm] = useState("")

  const businessOwner = user as BusinessOwner

  if (!businessOwner || businessOwner.type !== "business") {
    return <div>שגיאה: משתמש לא מורשה</div>
  }

  // Get real appointments for this business
  const allAppointments = getBusinessAppointments(businessOwner.id)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            {t("appointments.confirmed")}
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {t("appointments.pending")}
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            {t("appointments.cancelled")}
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            {t("appointments.completed")}
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredAppointments = allAppointments.filter(
    (appointment) =>
      appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.serviceName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const today = new Date().toISOString().split("T")[0]
  const todayAppointments = filteredAppointments.filter((apt) => apt.date === today)
  const upcomingAppointments = filteredAppointments.filter((apt) => new Date(apt.date) > new Date(today))
  const pastAppointments = filteredAppointments.filter((apt) => new Date(apt.date) < new Date(today))

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    updateAppointment(appointmentId, { status: newStatus as any })
  }

  const handleDeleteAppointment = (appointmentId: string) => {
    if (confirm("האם אתה בטוח שברצונך למחוק את התור?")) {
      deleteAppointment(appointmentId)
    }
  }

  const AppointmentTable = ({ appointments, emptyMessage }: { appointments: any[]; emptyMessage: string }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("appointments.customerName")}</TableHead>
          <TableHead>{t("appointments.service")}</TableHead>
          <TableHead>תאריך ושעה</TableHead>
          <TableHead>משך</TableHead>
          <TableHead>מחיר</TableHead>
          <TableHead>{t("appointments.status")}</TableHead>
          <TableHead>{t("appointments.actions")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <TableRow key={appointment.id} className="hover:bg-accent/50">
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{appointment.customerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{appointment.customerName}</p>
                    <p className="text-sm text-muted-foreground">{appointment.customerPhone}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{appointment.serviceName}</p>
                  {appointment.notes && <p className="text-sm text-muted-foreground italic">"{appointment.notes}"</p>}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{appointment.date}</span>
                  <span className="text-sm text-muted-foreground">{appointment.time}</span>
                </div>
              </TableCell>
              <TableCell>{appointment.serviceDuration} דק'</TableCell>
              <TableCell className="font-medium">₪{appointment.servicePrice}</TableCell>
              <TableCell>{getStatusBadge(appointment.status)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{t("appointments.actions")}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, "confirmed")}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      אשר תור
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, "completed")}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      סמן כהושלם
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, "cancelled")}>
                      <XCircle className="h-4 w-4 mr-2" />
                      בטל תור
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Phone className="h-4 w-4 mr-2" />
                      התקשר ללקוח
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="h-4 w-4 mr-2" />
                      שלח הודעה
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteAppointment(appointment.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      {t("common.delete")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{emptyMessage}</p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("appointments.title")}</h1>
          <p className="text-muted-foreground">נהל את כל התורים שלך במקום אחד</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          {t("appointments.newAppointment")}
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="חפש תורים..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              סנן
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Calendar className="h-4 w-4" />
              טווח תאריכים
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Tabs */}
      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">תורים היום ({todayAppointments.length})</TabsTrigger>
          <TabsTrigger value="upcoming">תורים קרובים ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="past">תורים עבר ({pastAppointments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                תורים היום
              </CardTitle>
              <CardDescription>התורים שלך להיום</CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentTable appointments={todayAppointments} emptyMessage="אין תורים מתוכננים להיום" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>תורים קרובים</CardTitle>
              <CardDescription>תורים מתוכננים לימים הקרובים</CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentTable appointments={upcomingAppointments} emptyMessage="אין תורים קרובים מתוכננים" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past">
          <Card>
            <CardHeader>
              <CardTitle>תורים עבר</CardTitle>
              <CardDescription>תורים שהתקיימו בעבר</CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentTable appointments={pastAppointments} emptyMessage="אין תורים קודמים" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

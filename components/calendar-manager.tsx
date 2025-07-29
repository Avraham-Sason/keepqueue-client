"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, Settings, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function CalendarManager() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const appointments = [
    {
      id: 1,
      date: 15,
      customer: "Rachel Cohen",
      service: "Hair Cut",
      time: "10:00",
      status: "confirmed",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      date: 15,
      customer: "Maya Levi",
      service: "Manicure",
      time: "11:30",
      status: "pending",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      date: 15,
      customer: "Sarah Ben-David",
      service: "Facial",
      time: "14:00",
      status: "confirmed",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      date: 16,
      customer: "Noa Goldberg",
      service: "Hair Color",
      time: "09:00",
      status: "confirmed",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 5,
      date: 17,
      customer: "Tal Mizrahi",
      service: "Massage",
      time: "15:30",
      status: "confirmed",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getAppointmentsForDay = (day: number) => {
    return appointments.filter((apt) => apt.date === day)
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayAppointments = getAppointmentsForDay(day)
      const isToday = day === 15 // Mock today as 15th

      days.push(
        <motion.div
          key={day}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: day * 0.01 }}
          className={`p-2 min-h-[100px] border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
            isToday ? "bg-primary/10 border-primary shadow-sm" : ""
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${isToday ? "text-primary" : ""}`}>{day}</span>
            {dayAppointments.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {dayAppointments.length}
              </Badge>
            )}
          </div>
          <div className="space-y-1">
            {dayAppointments.slice(0, 2).map((apt) => (
              <div
                key={apt.id}
                className={`text-xs p-1 rounded text-white truncate flex items-center gap-1 ${
                  apt.status === "confirmed" ? "bg-green-500" : "bg-yellow-500"
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-white/80 flex-shrink-0"></div>
                {apt.time} {apt.customer}
              </div>
            ))}
            {dayAppointments.length > 2 && (
              <div className="text-xs text-muted-foreground">+{dayAppointments.length - 2} more</div>
            )}
          </div>
        </motion.div>,
      )
    }

    return days
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and appointments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-transparent shadow-sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button className="shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("prev")}
                className="bg-transparent shadow-sm"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
                className="bg-transparent shadow-sm"
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth("next")}
                className="bg-transparent shadow-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="p-2 text-center font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>January 15, 2024 • {getAppointmentsForDay(15).length} appointments</CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            View Full Day
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getAppointmentsForDay(15).map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.customer} />
                    <AvatarFallback>{appointment.customer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{appointment.customer}</p>
                    <p className="text-sm text-muted-foreground">{appointment.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{appointment.time}</p>
                  <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"} className="capitalize">
                    {appointment.status}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                    <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Cancel Appointment</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

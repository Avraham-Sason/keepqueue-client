"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Plus, Phone, MessageSquare, Mail, Calendar, AlertTriangle, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function CustomersManager() {
  const [searchTerm, setSearchTerm] = useState("")

  const customers = [
    {
      id: 1,
      name: "Rachel Cohen",
      phone: "+972-50-123-4567",
      email: "rachel@email.com",
      totalAppointments: 12,
      lastVisit: "2024-01-10",
      totalSpent: 2160,
      status: "regular",
      notes: "Prefers morning appointments, allergic to certain hair products",
      noShows: 0,
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      id: 2,
      name: "Maya Levi",
      phone: "+972-52-987-6543",
      email: "maya@email.com",
      totalAppointments: 3,
      lastVisit: "2024-01-08",
      totalSpent: 360,
      status: "new",
      notes: "First time customer, very satisfied with service",
      noShows: 0,
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      id: 3,
      name: "Sarah Ben-David",
      phone: "+972-54-456-7890",
      email: "sarah@email.com",
      totalAppointments: 8,
      lastVisit: "2024-01-12",
      totalSpent: 1600,
      status: "regular",
      notes: "Sensitive skin, prefers organic products",
      noShows: 1,
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      id: 4,
      name: "Noa Goldberg",
      phone: "+972-53-111-2222",
      email: "noa@email.com",
      totalAppointments: 15,
      lastVisit: "2024-01-05",
      totalSpent: 4500,
      status: "vip",
      notes: "VIP customer, always books premium services",
      noShows: 0,
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      id: 5,
      name: "Tal Mizrahi",
      phone: "+972-55-333-4444",
      email: "tal@email.com",
      totalAppointments: 2,
      lastVisit: "2024-01-01",
      totalSpent: 240,
      status: "problematic",
      notes: "Multiple no-shows, requires confirmation",
      noShows: 3,
      avatar: "/placeholder.svg?height=48&width=48",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vip":
        return "default"
      case "regular":
        return "secondary"
      case "new":
        return "outline"
      case "problematic":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database and relationships</p>
        </div>
        <Button className="shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+8 from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">15% of total</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+20% growth</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Problematic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" className="bg-transparent shadow-sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customers List */}
      <div className="space-y-4">
        {filteredCustomers.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="shadow-sm hover:shadow-md transition-all">
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                    </Avatar>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{customer.name}</h3>
                        <Badge variant={getStatusColor(customer.status)} className="capitalize">
                          {customer.status}
                        </Badge>
                        {customer.noShows > 2 && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {customer.noShows} no-shows
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {customer.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {customer.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Last visit: {customer.lastVisit}
                        </span>
                        <span className="font-medium text-foreground">Total spent: ₪{customer.totalSpent}</span>
                      </div>

                      <p className="text-sm">
                        <span className="font-medium">{customer.totalAppointments}</span> appointments
                      </p>

                      {customer.notes && <p className="text-sm text-muted-foreground italic">Note: {customer.notes}</p>}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" className="bg-transparent shadow-sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent shadow-sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      WhatsApp
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent shadow-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      Book
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-transparent shadow-sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                        <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" className="shadow-sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

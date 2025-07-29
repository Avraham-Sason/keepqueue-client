"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Clock,
  Download,
  Filter,
  ArrowUpRight,
} from "lucide-react"
import { motion } from "framer-motion"

export function AnalyticsDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₪12,450",
      change: "+15.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600 bg-green-100 dark:bg-green-900/30",
      period: "This month",
    },
    {
      title: "Appointments",
      value: "89",
      change: "+8.1%",
      trend: "up",
      icon: Calendar,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
      period: "This month",
    },
    {
      title: "New Customers",
      value: "23",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
      period: "This month",
    },
    {
      title: "No-Show Rate",
      value: "5.2%",
      change: "-2.1%",
      trend: "down",
      icon: Clock,
      color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30",
      period: "This month",
    },
  ]

  const topServices = [
    { name: "Hair Cut & Style", bookings: 45, revenue: 8100, percentage: 35 },
    { name: "Manicure", bookings: 67, revenue: 5360, percentage: 28 },
    { name: "Facial Treatment", bookings: 28, revenue: 5600, percentage: 22 },
    { name: "Hair Color", bookings: 23, revenue: 6900, percentage: 15 },
  ]

  const recentActivity = [
    { date: "2024-01-15", event: "New customer registered", customer: "Rachel Cohen" },
    { date: "2024-01-15", event: "Appointment completed", customer: "Maya Levi" },
    { date: "2024-01-14", event: "Payment received", customer: "Sarah Ben-David", amount: "₪200" },
    { date: "2024-01-14", event: "Appointment cancelled", customer: "Noa Goldberg" },
    { date: "2024-01-13", event: "Review received (5 stars)", customer: "Tal Mizrahi" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track your business performance and insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-transparent shadow-sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="bg-transparent shadow-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="shadow-sm hover:shadow-md transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`h-8 w-8 rounded-full ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview" className="rounded-md">
            Overview
          </TabsTrigger>
          <TabsTrigger value="revenue" className="rounded-md">
            Revenue
          </TabsTrigger>
          <TabsTrigger value="customers" className="rounded-md">
            Customers
          </TabsTrigger>
          <TabsTrigger value="services" className="rounded-md">
            Services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Top Services */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Top Services</CardTitle>
                  <CardDescription>Most popular services this month</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  View All
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {topServices.map((service, index) => (
                  <div key={service.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{service.name}</span>
                      <span className="text-muted-foreground">{service.bookings} bookings</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${service.percentage}%` }}
                        />
                      </div>
                      <span className="ml-2 font-medium">₪{service.revenue}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest business activities</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  View All
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 text-sm p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="font-medium">{activity.event}</p>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span>{activity.customer}</span>
                        {activity.amount && <Badge variant="secondary">{activity.amount}</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Detailed revenue breakdown and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Revenue charts and detailed analytics would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
              <CardDescription>Customer behavior and retention metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Customer analytics and retention charts would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Service Performance</CardTitle>
              <CardDescription>Detailed service analytics and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Service performance charts and metrics would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

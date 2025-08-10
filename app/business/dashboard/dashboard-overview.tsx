"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Calendar,
    Users,
    DollarSign,
    TrendingUp,
    Clock,
    Star,
    Phone,
    Mail,
    MapPin,
    MoreHorizontal,
    CheckCircle,
    XCircle,
    AlertCircle,
    Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store/globalStore";
import { useBusinessAuthStore } from "@/lib/store";
import type { BusinessOwner } from "@/lib/mock-data";
import { useLanguage } from "@/lib/translations/language-context";

export function DashboardOverview() {
    const { t } = useLanguage();
    const user = useBusinessAuthStore.useUser();
    const getBusinessAppointments = useAppStore.useGetBusinessAppointments();
    const businessOwner = user as BusinessOwner;

    if (!businessOwner || businessOwner.type !== "business") {
        return <div>{t("errorUnauthorizedUser")}</div>;
    }

    // Get real appointments for this business
    const businessAppointments = getBusinessAppointments(businessOwner.id);

    // Calculate real stats
    const today = new Date().toISOString().split("T")[0];
    const todayAppointments = businessAppointments.filter((apt) => apt.date === today);
    const confirmedAppointments = businessAppointments.filter((apt) => apt.status === "confirmed");
    const totalRevenue = businessAppointments.filter((apt) => apt.status === "completed").reduce((sum, apt) => sum + apt.servicePrice, 0);

    const upcomingAppointments = businessAppointments
        .filter((apt) => apt.status === "confirmed" || apt.status === "pending")
        .filter((apt) => new Date(apt.date) >= new Date(today))
        .sort((a, b) => new Date(a.date + " " + a.time).getTime() - new Date(b.date + " " + b.time).getTime())
        .slice(0, 5);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "confirmed":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "pending":
                return <AlertCircle className="h-4 w-4 text-yellow-500" />;
            case "cancelled":
                return <XCircle className="h-4 w-4 text-red-500" />;
            case "completed":
                return <CheckCircle className="h-4 w-4 text-blue-500" />;
            default:
                return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "confirmed":
                return t("statusConfirmed");
            case "pending":
                return t("statusPending");
            case "cancelled":
                return t("statusCancelled");
            case "completed":
                return t("statusCompleted");
            default:
                return status;
        }
    };

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{t("hello")}, {businessOwner.firstName}!</h1>
                        <p className="text-muted-foreground">{t("welcomeBusinessAdminPanelOf")} {businessOwner.businessName}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={businessOwner.avatar || "/placeholder.svg"} alt={businessOwner.firstName} />
                            <AvatarFallback>{businessOwner.firstName.charAt(0)}</AvatarFallback>
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
                        <CardTitle className="text-sm font-medium">{t("todayAppointments")}</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{todayAppointments.length}</div>
                        <p className="text-xs text-muted-foreground">{todayAppointments.length === 0 ? t("noAppointmentsToday") : t("scheduledAppointments")}</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("confirmed")}</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{confirmedAppointments.length}</div>
                        <p className="text-xs text-muted-foreground">{t("totalAppointments")}</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("revenue")}</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₪{totalRevenue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">{t("fromCompletedAppointments")}</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("totalAppointments")}</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{businessAppointments.length}</div>
                        <p className="text-xs text-muted-foreground">{t("allAppointmentsInSystem")}</p>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent Appointments */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="col-span-4"
                >
                    <Card className="hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                            <CardTitle>{t("upcomingAppointmentsTitle")}</CardTitle>
                            <CardDescription>{t("yourUpcomingAppointments")}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {upcomingAppointments.length > 0 ? (
                                    upcomingAppointments.map((appointment) => (
                                        <div
                                            key={appointment.id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarFallback>{appointment.customerName.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium leading-none">{appointment.customerName}</p>
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
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p className="text-lg font-medium mb-2">{t("noUpcomingAppointments")}</p>
                                        <p className="text-sm">{t("upcomingAppointmentsEmptyHint")}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Business Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="col-span-3"
                >
                    <Card className="hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                            <CardTitle>{t("businessDetails")}</CardTitle>
                            <CardDescription>{t("yourInfoOnPlatform")}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{businessOwner.address}</p>
                                        <p className="text-xs text-muted-foreground">{t("businessAddress")}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Phone className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{businessOwner.phone}</p>
                                        <p className="text-xs text-muted-foreground">{t("phone")}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{businessOwner.email}</p>
                                        <p className="text-xs text-muted-foreground">{t("email")}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Clock className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{businessOwner.workingHours}</p>
                                        <p className="text-xs text-muted-foreground">{t("workingHours")}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <h4 className="text-sm font-medium mb-2">{t("yourServices")}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {businessOwner.services.map((service) => (
                                        <Badge key={service.id} variant="secondary">
                                            {service.name} - ₪{service.price}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                <Card className="hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                        <CardTitle>{t("quickActions")}</CardTitle>
                        <CardDescription>{t("viewAll")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                                <Plus className="h-6 w-6" />
                                <span>{t("addNewAppointment")}</span>
                            </Button>
                            <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                                <Users className="h-6 w-6" />
                                <span>{t("manageCustomers")}</span>
                            </Button>
                            <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                                <TrendingUp className="h-6 w-6" />
                                <span>{t("viewReports")}</span>
                            </Button>
                            <Button className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
                                <Star className="h-6 w-6" />
                                <span>{t("customerReviews")}</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

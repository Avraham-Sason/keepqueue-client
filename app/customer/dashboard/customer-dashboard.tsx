"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, Star, CheckCircle, XCircle, AlertCircle, Heart, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { useAuthStore } from "@/lib/store";
import type { Customer, CalendarEvent } from "@/lib/types";
import { timestampToMillis, timestampToString } from "@/lib/helpers";
import { useLanguage } from "@/hooks";

export function CustomerDashboard() {
    const { t } = useLanguage();
    const user = useAuthStore.user();
    const getCustomerAppointments = useAppStore.getCustomerAppointments();
    const businesses = useAppStore.businesses();
    const customer = user as Customer;

    if (!customer || customer.type !== "customer") {
        return <div>{t("errorUnauthorizedUser")}</div>;
    }

    // Get real appointments for this customer
    const customerAppointments: CalendarEvent[] = getCustomerAppointments(customer.id as string);

    // Get favorite businesses
    const favoriteBusinesses = businesses.filter((business) => (customer.business ?? []).includes(business.id as string));

    // Sort appointments by date
    const sortedAppointments = customerAppointments.sort(
        (a, b) => timestampToMillis(a.start) - timestampToMillis(b.start)
    );

    const upcomingAppointments = sortedAppointments.filter((apt) => timestampToMillis(apt.start) >= timestampToMillis(new Date()));

    const pastAppointments = sortedAppointments.filter((apt) => timestampToMillis(apt.start) < timestampToMillis(new Date()));

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "CONFIRMED":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "BOOKED":
                return <AlertCircle className="h-4 w-4 text-yellow-500" />;
            case "CANCELLED":
                return <XCircle className="h-4 w-4 text-red-500" />;
            case "DONE":
                return <CheckCircle className="h-4 w-4 text-blue-500" />;
            case "NO_SHOW":
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <Clock className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "CONFIRMED":
                return t("statusConfirmed");
            case "BOOKED":
                return t("statusPending");
            case "CANCELLED":
                return t("statusCancelled");
            case "DONE":
                return t("statusCompleted");
            case "NO_SHOW":
                return t("statusCancelled");
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
                        <h1 className="text-3xl font-bold tracking-tight">{t("hello")}, {customer.firstName}!</h1>
                        <p className="text-muted-foreground">{t("welcomeCustomerPanel")}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={customer.photoURL || "/placeholder.svg"} alt={customer.firstName} />
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
                        <CardTitle className="text-sm font-medium">{t("upcomingAppointmentsTitle")}</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                        <p className="text-xs text-muted-foreground">{t("plannedAppointments")}</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("completedAppointmentsTitle")}</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pastAppointments.filter((apt) => apt.status === "DONE").length}</div>
                        <p className="text-xs text-muted-foreground">{t("totalAppointments")}</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("favoriteBusinesses")}</CardTitle>
                        <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{favoriteBusinesses.length}</div>
                        <p className="text-xs text-muted-foreground">{t("savedBusinesses")}</p>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t("totalExpenses")}</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₪0</div>
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
                            <CardTitle>{t("myUpcomingAppointments")}</CardTitle>
                            <CardDescription>{t("yourAppointmentsNextDays")}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {upcomingAppointments.length > 0 ? (
                                    upcomingAppointments.slice(0, 5).map((appointment) => {
                                        const business = businesses.find((b) => b.id === appointment.business);
                                        return (
                                            <div
                                                key={appointment.id}
                                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={business?.logoUrl || "/placeholder.svg"} />
                                                        <AvatarFallback>{(business?.name ?? "").charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium leading-none">{business?.name}</p>
                                                        <p className="text-sm text-muted-foreground">{t("appointment")}</p>
                                                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                                            <Calendar className="h-3 w-3" />
                                                            <span>{timestampToString(appointment.start, { format: "YYYY-MM-DD" })}</span>
                                                            <Clock className="h-3 w-3" />
                                                            <span>{timestampToString(appointment.start, { format: "HH:mm" })}</span>
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
                                                    {/* price not available on CalendarEvent in this view */}
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p className="text-lg font-medium mb-2">{t("noUpcomingAppointments")}</p>
                                        <p className="text-sm">{t("marketplaceCta")}</p>
                                        <Button className="mt-4" asChild>
                                            <a href="/customer/marketplace">
                                                <Search className="h-4 w-4 mr-2" />
                                                {t("searchBusinesses")}
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
                            <CardTitle>{t("favoriteBusinessesTitle")}</CardTitle>
                            <CardDescription>{t("youLikeMost")}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {favoriteBusinesses.length > 0 ? (
                                favoriteBusinesses.map((business) => (
                                    <div key={business.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={business.logoUrl || "/placeholder.svg"} />
                                            <AvatarFallback>{business.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="font-medium">{business.name}</p>
                                            <p className="text-sm text-muted-foreground">{(business as any).businessType ?? ""}</p>
                                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                                                <MapPin className="h-3 w-3 mr-1" />
                                                <span>{(business as any).address ?? ""}</span>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline">
                                            {t("bookAppointment")}
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>{t("noFavoriteBusinesses")}</p>
                                    <p className="text-sm">{t("addFavoritesInMarketplace")}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

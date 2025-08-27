"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Clock, Star, Phone, Calendar, Filter, Heart, HeartOff } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useAuthStore } from "@/lib/store";
import type { Customer, BusinessOwner, Service } from "@/lib/mock-data";
import { useLanguage } from "@/hooks";

export function BusinessMarketplace() {
    const { t } = useLanguage();
    const user = useAuthStore.user();
    const businesses = useAppStore.businesses();
    const addAppointment = useAppStore.addAppointment();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBusiness, setSelectedBusiness] = useState<BusinessOwner | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [appointmentNotes, setAppointmentNotes] = useState("");
    const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

    const customer = user as Customer;

    if (!customer || customer.type !== "customer") {
        return <div>{t("errorUnauthorizedUser")}</div>;
    }

    const filteredBusinesses = businesses.filter(
        (business) =>
            business.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            business.businessType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            business.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBookAppointment = () => {
        if (!selectedBusiness || !selectedService || !appointmentDate || !appointmentTime) {
            alert(t("pleaseFillAllRequiredFields"));
            return;
        }

        const newAppointment = {
            customerId: customer.id,
            businessId: selectedBusiness.id,
            serviceId: selectedService.id,
            date: appointmentDate,
            time: appointmentTime,
            status: "pending" as const,
            notes: appointmentNotes,
            customerName: `${customer.firstName} ${customer.lastName}`,
            customerPhone: customer.phone,
            customerEmail: customer.email,
            serviceName: selectedService.name,
            servicePrice: selectedService.price,
            serviceDuration: selectedService.duration,
            createdAt: new Date().toISOString(),
        };

        // addAppointment(newAppointment);

        // Reset form
        setSelectedBusiness(null);
        setSelectedService(null);
        setAppointmentDate("");
        setAppointmentTime("");
        setAppointmentNotes("");
        setIsBookingDialogOpen(false);

        alert(t("appointmentBookedSuccess"));
    };

    const openBookingDialog = (business: BusinessOwner, service?: Service) => {
        setSelectedBusiness(business);
        setSelectedService(service || null);
        setIsBookingDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t("marketplaceTitle")}</h1>
                    <p className="text-muted-foreground">{t("marketplaceSubtitle")}</p>
                </div>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={t("searchBusinessesPlaceholder")}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <Button variant="outline" className="gap-2 bg-transparent">
                            <Filter className="h-4 w-4" />
                            {t("filter")}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Business Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredBusinesses.length > 0 ? (
                    filteredBusinesses.map((business) => (
                        <Card key={business.id} className="hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={business.avatarUrl || "/placeholder.svg"} />
                                            <AvatarFallback>{business.businessName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg">{business.businessName}</CardTitle>
                                            <CardDescription>{business.businessType}</CardDescription>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        {customer.favoriteBusinesses.includes(business.id) ? (
                                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                        ) : (
                                            <HeartOff className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">{business.description}</p>

                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        {business.address}
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="h-4 w-4 mr-2" />
                                        {business.workingHours}
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Phone className="h-4 w-4 mr-2" />
                                        {business.phone}
                                    </div>
                                    <div className="flex items-center text-sm">
                                        <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                                        <span>4.8 (127 {t("reviews")})</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-medium">{t("servicesLabel")}</h4>
                                    <div className="space-y-2">
                                        {business.services.map((service) => (
                                            <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                <div>
                                                    <p className="font-medium">{service.name}</p>
                                                    <p className="text-sm text-muted-foreground">{service.description}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="outline">{service.duration} {t("minutesShort")}</Badge>
                                                        <Badge variant="outline">₪{service.price}</Badge>
                                                        {service.popular && <Badge className="bg-orange-100 text-orange-800">{t("popular")}</Badge>}
                                                    </div>
                                                </div>
                                                <Button size="sm" onClick={() => openBookingDialog(business, service)} className="gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    {t("bookAppointment")}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium mb-2">{t("notFoundBusinesses")}</h3>
                        <p className="text-muted-foreground">{t("tryChangeSearchTerms")}</p>
                    </div>
                )}
            </div>

            {/* Booking Dialog */}
            <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t("scheduleAppointment")}</DialogTitle>
                        <DialogDescription>
                            {selectedBusiness && selectedService && (
                                <>
                                    {t("bookAppointmentFor")} {selectedService.name} {t("atBusiness")} {selectedBusiness.businessName}
                                </>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {selectedBusiness && !selectedService && (
                            <div className="grid gap-2">
                                <Label htmlFor="service">{t("selectAService")}</Label>
                                <Select
                                    onValueChange={(value) => {
                                        const service = selectedBusiness.services.find((s) => s.id === value);
                                        setSelectedService(service || null);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("selectAService")} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {selectedBusiness.services.map((service) => (
                                            <SelectItem key={service.id} value={service.id}>
                                                {service.name} - ₪{service.price} ({service.duration} {t("minutesShort")})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {selectedService && (
                            <div className="p-3 bg-muted rounded-lg">
                                <h4 className="font-medium">{selectedService.name}</h4>
                                <p className="text-sm text-muted-foreground">{selectedService.description}</p>
                                <div className="flex gap-2 mt-2">
                                    <Badge variant="outline">{selectedService.duration} דק'</Badge>
                                    <Badge variant="outline">₪{selectedService.price}</Badge>
                                </div>
                            </div>
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="date">{t("date")}</Label>
                            <Input
                                id="date"
                                type="date"
                                value={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="time">{t("time")}</Label>
                            <Input id="time" type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="notes">{t("optionalNotes")}</Label>
                            <Textarea
                                id="notes"
                                placeholder={t("additionalNotesPlaceholder")}
                                value={appointmentNotes}
                                onChange={(e) => setAppointmentNotes(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
                            {t("cancel")}
                        </Button>
                        <Button onClick={handleBookAppointment} disabled={!selectedService || !appointmentDate || !appointmentTime}>
                            {t("bookAppointment")}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

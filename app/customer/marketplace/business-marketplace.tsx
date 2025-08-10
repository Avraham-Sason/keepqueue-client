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
import { useCustomersAuthStore } from "@/lib/store";
import type { Customer, BusinessOwner, Service } from "@/lib/mock-data";

export function BusinessMarketplace() {
    const user = useCustomersAuthStore.useUser();
    const businesses = useAppStore.useBusinesses();
    const addAppointment = useAppStore.useAddAppointment();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBusiness, setSelectedBusiness] = useState<BusinessOwner | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [appointmentNotes, setAppointmentNotes] = useState("");
    const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

    const customer = user as Customer;

    if (!customer || customer.type !== "customer") {
        return <div>שגיאה: משתמש לא מורשה</div>;
    }

    const filteredBusinesses = businesses.filter(
        (business) =>
            business.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            business.businessType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            business.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBookAppointment = () => {
        if (!selectedBusiness || !selectedService || !appointmentDate || !appointmentTime) {
            alert("אנא מלא את כל השדות הנדרשים");
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

        addAppointment(newAppointment);

        // Reset form
        setSelectedBusiness(null);
        setSelectedService(null);
        setAppointmentDate("");
        setAppointmentTime("");
        setAppointmentNotes("");
        setIsBookingDialogOpen(false);

        alert("התור נקבע בהצלחה! בעל העסק יאשר את התור בקרוב.");
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
                    <h1 className="text-3xl font-bold tracking-tight">שוק העסקים</h1>
                    <p className="text-muted-foreground">מצא ותזמן תורים אצל העסקים הטובים ביותר</p>
                </div>
            </div>

            {/* Search and Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="חפש עסקים, שירותים או מיקום..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                        <Button variant="outline" className="gap-2 bg-transparent">
                            <Filter className="h-4 w-4" />
                            סנן
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
                                            <AvatarImage src={business.avatar || "/placeholder.svg"} />
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
                                        <span>4.8 (127 ביקורות)</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-medium">השירותים:</h4>
                                    <div className="space-y-2">
                                        {business.services.map((service) => (
                                            <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                <div>
                                                    <p className="font-medium">{service.name}</p>
                                                    <p className="text-sm text-muted-foreground">{service.description}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="outline">{service.duration} דק'</Badge>
                                                        <Badge variant="outline">₪{service.price}</Badge>
                                                        {service.popular && <Badge className="bg-orange-100 text-orange-800">פופולרי</Badge>}
                                                    </div>
                                                </div>
                                                <Button size="sm" onClick={() => openBookingDialog(business, service)} className="gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    קבע תור
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
                        <h3 className="text-lg font-medium mb-2">לא נמצאו עסקים</h3>
                        <p className="text-muted-foreground">נסה לשנות את מונחי החיפוש</p>
                    </div>
                )}
            </div>

            {/* Booking Dialog */}
            <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>קביעת תור</DialogTitle>
                        <DialogDescription>
                            {selectedBusiness && selectedService && (
                                <>
                                    קבע תור ל{selectedService.name} אצל {selectedBusiness.businessName}
                                </>
                            )}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {selectedBusiness && !selectedService && (
                            <div className="grid gap-2">
                                <Label htmlFor="service">בחר שירות</Label>
                                <Select
                                    onValueChange={(value) => {
                                        const service = selectedBusiness.services.find((s) => s.id === value);
                                        setSelectedService(service || null);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="בחר שירות" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {selectedBusiness.services.map((service) => (
                                            <SelectItem key={service.id} value={service.id}>
                                                {service.name} - ₪{service.price} ({service.duration} דק')
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
                            <Label htmlFor="date">תאריך</Label>
                            <Input
                                id="date"
                                type="date"
                                value={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="time">שעה</Label>
                            <Input id="time" type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="notes">הערות (אופציונלי)</Label>
                            <Textarea
                                id="notes"
                                placeholder="הערות נוספות לבעל העסק..."
                                value={appointmentNotes}
                                onChange={(e) => setAppointmentNotes(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
                            ביטול
                        </Button>
                        <Button onClick={handleBookAppointment} disabled={!selectedService || !appointmentDate || !appointmentTime}>
                            קבע תור
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

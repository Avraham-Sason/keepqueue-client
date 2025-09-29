"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Clock, MapPin, Star, Phone, User, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useLanguage } from "@/hooks"

interface BookingInterfaceProps {
  businessId: string
}

export function BookingInterface({ businessId }: BookingInterfaceProps) {
  const { t } = useLanguage()
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [step, setStep] = useState(1)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    notes: "",
  })

  const business = {
    name: "סלון יופי שרה",
    rating: 4.8,
    reviews: 127,
    address: "דיזנגוף 123, תל אביב",
    phone: "03-123-4567",
    email: "info@sarahsbeauty.com",
    image: "/placeholder.svg?height=80&width=80",
    description: "סלון יופי מוביל בתל אביב עם צוות מקצועי ושירות מעולה",
    workingHours: "ראשון-חמישי: 09:00-19:00, שישי: 09:00-15:00",
  }

  const services = [
    {
      id: 1,
      name: "תספורת ועיצוב",
      duration: 60,
      price: 180,
      description: "תספורת מקצועית עם עיצוב וסטיילינג",
      popular: true,
    },
    {
      id: 2,
      name: "צביעת שיער",
      duration: 120,
      price: 300,
      description: "צביעה מלאה עם טיפוח השיער",
      popular: false,
    },
    {
      id: 3,
      name: "מניקור",
      duration: 45,
      price: 80,
      description: "מניקור קלאסי עם לק",
      popular: true,
    },
    {
      id: 4,
      name: "טיפוח פנים",
      duration: 75,
      price: 200,
      description: "טיפוח פנים מעמיק עם לחות",
      popular: false,
    },
    {
      id: 5,
      name: "הארכת ריסים",
      duration: 90,
      price: 250,
      description: "הארכת ריסים בשיטת נפח רוסי",
      popular: true,
    },
  ]

  const availableDates = [
    { date: "2024-01-15", day: "היום", available: true },
    { date: "2024-01-16", day: "מחר", available: true },
    { date: "2024-01-17", day: "רביעי", available: true },
    { date: "2024-01-18", day: "חמישי", available: false },
    { date: "2024-01-19", day: "שישי", available: true },
    { date: "2024-01-20", day: "שבת", available: false },
    { date: "2024-01-21", day: "ראשון", available: true },
  ]

  const availableTimes = [
    { time: "09:00", available: true },
    { time: "09:30", available: false },
    { time: "10:00", available: true },
    { time: "10:30", available: true },
    { time: "11:00", available: false },
    { time: "11:30", available: true },
    { time: "14:00", available: true },
    { time: "14:30", available: true },
    { time: "15:00", available: false },
    { time: "15:30", available: true },
    { time: "16:00", available: true },
    { time: "16:30", available: true },
  ]

  const selectedServiceData = services.find((s) => s.id === selectedService)
  const totalPrice = selectedServiceData?.price || 0

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleBooking = () => {
    // Here you would typically send the booking data to your backend
    console.log("Booking data:", {
      businessId,
      service: selectedServiceData,
      date: selectedDate,
      time: selectedTime,
      customer: customerInfo,
    })
    setStep(4) // Go to confirmation step
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/marketplace" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
            <ArrowRight className="h-4 w-4" />
            <span>{t("bookingBackToSearch")}</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-medium">{t("brandName")}</span>
          </div>
        </div>

        {/* Business Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="h-24 w-24 rounded-lg">
                  <AvatarImage src={business.image || "/placeholder.svg"} alt={business.name} />
                  <AvatarFallback className="rounded-lg text-lg">{business.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-3 flex-1">
                  <div>
                    <h1 className="text-2xl font-bold">{business.name}</h1>
                    <p className="text-muted-foreground">{business.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{business.rating}</span>
                    </div>
                     <span className="text-muted-foreground">({business.reviews} {t("reviews")})</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {t("openNow")}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{business.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{business.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          {[
            { number: 1, title: t("selectService") },
            { number: 2, title: t("selectDateTime") },
            { number: 3, title: t("personalDetails") },
            { number: 4, title: t("confirm") },
          ].map((stepInfo, index) => (
            <div key={stepInfo.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step >= stepInfo.number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > stepInfo.number ? <CheckCircle className="h-5 w-5" /> : stepInfo.number}
                </div>
                <span className="text-xs mt-1 text-center">{stepInfo.title}</span>
              </div>
              {index < 3 && <div className={`w-12 h-0.5 mx-2 ${step > stepInfo.number ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Select Service */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>{t("selectService")}</CardTitle>
                <CardDescription>{t("selectAService")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`relative p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedService === service.id ? "border-primary bg-primary/5 shadow-md" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    {service.popular && <Badge className="absolute -top-2 right-4 bg-orange-500">{t("popular")}</Badge>}
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {service.duration} {t("minutes")}
                          </span>
                          <span className="font-medium text-lg">₪{service.price}</span>
                        </div>
                      </div>
                      {selectedService === service.id && (
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-primary-foreground" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <Button className="w-full" size="lg" disabled={!selectedService} onClick={handleNext}>
                  {t("goToPersonalDetails")}
                  <ArrowLeft className="h-4 w-4 mr-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>{t("selectDateTime")}</CardTitle>
                <CardDescription>
                  {selectedServiceData && (
                    <>
                      {t("selectedService")}: {selectedServiceData.name} ({selectedServiceData.duration} {t("minutes")})
                    </>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">{t("selectDate")}</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availableDates.map((dateOption) => (
                      <Button
                        key={dateOption.date}
                        variant={selectedDate === dateOption.date ? "default" : "outline"}
                        className={`h-16 flex flex-col ${!dateOption.available ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={!dateOption.available}
                        onClick={() => dateOption.available && setSelectedDate(dateOption.date)}
                      >
                        <span className="font-medium">{dateOption.day}</span>
                        <span className="text-xs">{dateOption.date.split("-").slice(1).join("/")}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div className="space-y-3">
                    <Label className="text-base font-medium">{t("selectTime")}</Label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {availableTimes.map((timeOption) => (
                        <Button
                          key={timeOption.time}
                          variant={selectedTime === timeOption.time ? "default" : "outline"}
                          size="sm"
                          className={!timeOption.available ? "opacity-50 cursor-not-allowed" : ""}
                          disabled={!timeOption.available}
                          onClick={() => timeOption.available && setSelectedTime(timeOption.time)}
                        >
                          {timeOption.time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleBack} className="bg-transparent">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {t("back")}
                  </Button>
                  <Button className="flex-1" disabled={!selectedDate || !selectedTime} onClick={handleNext}>
                    {t("goToPersonalDetails")}
                    <ArrowLeft className="h-4 w-4 mr-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Customer Details */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Customer Form */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("personalDetails")}</CardTitle>
                  <CardDescription>{t("pleaseFillYourDetails")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t("firstName")} *</Label>
                      <Input
                        id="firstName"
                        placeholder={t("firstName")}
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t("lastName")} *</Label>
                      <Input
                        id="lastName"
                        placeholder={t("lastName")}
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="phone">{t("phone")} *</Label>
                    <Input
                      id="phone"
                      placeholder="050-123-4567"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="email">{t("emailAddress")} *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="notes">{t("optionalNotes")}</Label>
                    <Textarea
                      id="notes"
                      placeholder={t("additionalNotesPlaceholder")}
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Booking Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("bookingSummary")}</CardTitle>
                  <CardDescription>{t("yourAppointmentDetails")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("businessLabel")}:</span>
                      <span className="font-medium">{business.name}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("serviceLabel")}:</span>
                      <span className="font-medium">{selectedServiceData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("dateLabel")}:</span>
                      <span className="font-medium">
                        {availableDates.find((d) => d.date === selectedDate)?.day} (
                        {selectedDate?.split("-").slice(1).join("/")})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("timeLabel")}:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("durationLabel")}:</span>
                      <span className="font-medium">{selectedServiceData?.duration} {t("minutes")}</span>
                    </div>
                    <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                      <span>{t("totalLabel")}:</span>
                      <span>₪{totalPrice}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">{t("whatsNext")}</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>{t("whatsNextLine1")}</li>
                      <li>{t("whatsNextLine2")}</li>
                      <li>{t("whatsNextLine3")}</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="bg-transparent">
                <ArrowRight className="h-4 w-4 mr-2" />
                {t("back")}
              </Button>
              <Button
                className="flex-1"
                size="lg"
                disabled={
                  !customerInfo.firstName || !customerInfo.lastName || !customerInfo.phone || !customerInfo.email
                }
                onClick={handleBooking}
              >
                {t("confirmBooking")}
                <CheckCircle className="h-4 w-4 mr-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="text-center">
              <CardContent className="pt-8 pb-8">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-green-600 mb-2">{t("bookingSuccessTitle")}</h2>
                    <p className="text-muted-foreground">{t("bookingSuccessDescription")}</p>
                  </div>

                  <div className="bg-muted/50 p-6 rounded-lg text-right space-y-2">
                    <h3 className="font-semibold mb-4">{t("appointmentDetails")}:</h3>
                    <p>
                      <strong>{t("businessLabel")}:</strong> {business.name}
                    </p>
                    <p>
                      <strong>{t("serviceLabel")}:</strong> {selectedServiceData?.name}
                    </p>
                    <p>
                      <strong>{t("dateLabel")}:</strong> {availableDates.find((d) => d.date === selectedDate)?.day} (
                      {selectedDate?.split("-").slice(1).join("/")})
                    </p>
                    <p>
                      <strong>{t("timeLabel")}:</strong> {selectedTime}
                    </p>
                    <p>
                      <strong>{t("businessAddress")}:</strong> {business.address}
                    </p>
                    <p>
                      <strong>{t("phone")}:</strong> {business.phone}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" asChild>
                      <Link href="/marketplace">{t("bookingBackToSearch")}</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/my-appointments">{t("myAppointments")}</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

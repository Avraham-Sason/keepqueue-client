"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Star, MessageCircle, BarChart3, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function LandingPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("business")

  const features = [
    {
      icon: Calendar,
      title: t("features.scheduling.title"),
      description: t("features.scheduling.description"),
    },
    {
      icon: MessageCircle,
      title: t("features.whatsapp.title"),
      description: t("features.whatsapp.description"),
    },
    {
      icon: Users,
      title: t("features.customers.title"),
      description: t("features.customers.description"),
    },
    {
      icon: BarChart3,
      title: t("features.analytics.title"),
      description: t("features.analytics.description"),
    },
    {
      icon: Shield,
      title: t("features.security.title"),
      description: t("features.security.description"),
    },
    {
      icon: Zap,
      title: t("features.automation.title"),
      description: t("features.automation.description"),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            {t("hero.badge")}
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">{t("hero.subtitle")}</p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/business/auth/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Users className="mr-2 h-5 w-5" />
                {t("cta.business")}
              </Button>
            </Link>
            <Link href="/customer/auth/signup">
              <Button size="lg" variant="outline">
                <Calendar className="mr-2 h-5 w-5" />
                {t("cta.customer")}
              </Button>
            </Link>
          </div>

          {/* Demo Video Placeholder */}
          <div className="relative max-w-3xl mx-auto">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{t("demo.placeholder")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t("features.title")}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t("features.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t("testimonials.title")}</h2>
            <p className="text-gray-600 dark:text-gray-300">{t("testimonials.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">"{t(`testimonials.testimonial${i}.text`)}"</p>
                  <div className="font-semibold">{t(`testimonials.testimonial${i}.author`)}</div>
                  <div className="text-sm text-gray-500">{t(`testimonials.testimonial${i}.role`)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t("pricing.title")}</h2>
          <p className="text-gray-600 dark:text-gray-300">{t("pricing.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {["basic", "pro", "enterprise"].map((plan, index) => (
            <Card key={plan} className={`text-center ${index === 1 ? "ring-2 ring-blue-600 scale-105" : ""}`}>
              <CardHeader>
                {index === 1 && <Badge className="w-fit mx-auto mb-2 bg-blue-600">{t("pricing.popular")}</Badge>}
                <CardTitle className="text-2xl">{t(`pricing.${plan}.name`)}</CardTitle>
                <div className="text-3xl font-bold">
                  {t(`pricing.${plan}.price`)}
                  <span className="text-sm font-normal text-gray-500">/{t("pricing.month")}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {(t(`pricing.${plan}.features`) as string[]).map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${index === 1 ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                  variant={index === 1 ? "default" : "outline"}
                >
                  {t("pricing.getStarted")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">{t("cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/business/auth/signup">
              <Button size="lg" variant="secondary">
                {t("cta.startFree")}
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              {t("cta.learnMore")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

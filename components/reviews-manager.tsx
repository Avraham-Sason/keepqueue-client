"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MessageSquare, ThumbsUp, Flag, Reply, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export function ReviewsManager() {
  const [replyText, setReplyText] = useState("")

  const reviews = [
    {
      id: 1,
      customer: "רחל כהן",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "לפני 2 ימים",
      service: "תספורת ועיצוב",
      text: "שירות מעולה! שרה מקצועית מאוד ותמיד יוצאת עם תוצאה מושלמת. הסלון נקי ויפה, ואני תמיד מרגישה מפונקת כאן.",
      helpful: 12,
      replied: false,
      verified: true,
    },
    {
      id: 2,
      customer: "מיה לוי",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "לפני 5 ימים",
      service: "מניקור",
      text: "מניקור יפה ומקצועי. הייתי רוצה שהיה יותר מגוון צבעים, אבל בסך הכל מרוצה מהשירות.",
      helpful: 8,
      replied: true,
      reply: "תודה על הביקורת! נשמח לעדכן אותך שהוספנו מגוון צבעים חדש השבוע. נשמח לראות אותך שוב!",
      verified: true,
    },
    {
      id: 3,
      customer: "שרה בן-דוד",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "לפני שבוע",
      service: "טיפוח פנים",
      text: "טיפוח פנים מדהים! העור שלי נראה זוהר ורך. בהחלט אחזור שוב. מומלץ בחום!",
      helpful: 15,
      replied: true,
      reply: "כל כך שמחים שנהנית! תודה על המילים החמות ונתראה בטיפוח הבא 💕",
      verified: true,
    },
    {
      id: 4,
      customer: "נועה גולדברג",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 3,
      date: "לפני 10 ימים",
      service: "צביעת שיער",
      text: "הצביעה יצאה בסדר אבל חיכיתי הרבה זמן. אולי כדאי לשפר את הזמנים.",
      helpful: 3,
      replied: false,
      verified: true,
    },
  ]

  const stats = [
    {
      title: "דירוג ממוצע",
      value: "4.8",
      change: "+0.2",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "סה״כ ביקורות",
      value: "127",
      change: "+12",
      icon: MessageSquare,
      color: "text-blue-600",
    },
    {
      title: "שיעור תגובה",
      value: "85%",
      change: "+15%",
      icon: Reply,
      color: "text-green-600",
    },
    {
      title: "ביקורות חיוביות",
      value: "94%",
      change: "+3%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  const ratingDistribution = [
    { stars: 5, count: 89, percentage: 70 },
    { stars: 4, count: 25, percentage: 20 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 2, percentage: 2 },
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ביקורות ודירוגים</h1>
          <p className="text-muted-foreground">נהל את הביקורות והמוניטין של העסק</p>
        </div>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          בקש ביקורת
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change} מהחודש הקודם</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>התפלגות דירוגים</CardTitle>
            <CardDescription>פירוט הדירוגים שקיבלת</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm">{item.stars}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">{item.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="md:col-span-2">
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">כל הביקורות</TabsTrigger>
              <TabsTrigger value="pending">ממתינות לתגובה</TabsTrigger>
              <TabsTrigger value="recent">אחרונות</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {/* Review Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.customer} />
                              <AvatarFallback>{review.customer.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{review.customer}</h4>
                                {review.verified && (
                                  <Badge variant="secondary" className="text-xs">
                                    מאומת
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex">{renderStars(review.rating)}</div>
                                <span className="text-sm text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Flag className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Service */}
                        <Badge variant="outline">{review.service}</Badge>

                        {/* Review Text */}
                        <p className="text-muted-foreground">{review.text}</p>

                        {/* Business Reply */}
                        {review.replied && review.reply && (
                          <div className="bg-muted/50 p-4 rounded-lg border-r-4 border-primary">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">תגובת העסק</Badge>
                            </div>
                            <p className="text-sm">{review.reply}</p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {review.helpful}
                            </Button>
                          </div>
                          {!review.replied && (
                            <Button variant="outline" size="sm">
                              <Reply className="h-4 w-4 mr-1" />
                              הגב
                            </Button>
                          )}
                        </div>

                        {/* Reply Form (if not replied) */}
                        {!review.replied && (
                          <div className="space-y-3 pt-4 border-t">
                            <Textarea
                              placeholder="כתוב תגובה..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                            <div className="flex gap-2">
                              <Button size="sm">שלח תגובה</Button>
                              <Button variant="outline" size="sm">
                                ביטול
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="pending">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">אין ביקורות ממתינות</h3>
                    <p className="text-muted-foreground">כל הביקורות קיבלו תגובה</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recent">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {reviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.customer} />
                            <AvatarFallback>{review.customer.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{review.customer}</p>
                            <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

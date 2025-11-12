import { useLanguage } from "@/hooks";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Star, TrendingUp, Users } from "lucide-react";

export const QuickActionsSection = () => {
    const { t } = useLanguage();
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                    <CardTitle>{t("quickActions")}</CardTitle>
                    <CardDescription>{t("viewAll")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <QuickActionCard icon={<Plus className="h-6 w-6" />} title={t("addNewAppointment")} />
                        <QuickActionCard icon={<Users className="h-6 w-6" />} title={t("manageCustomers")} />
                        <QuickActionCard icon={<TrendingUp className="h-6 w-6" />} title={t("viewReports")} />
                        <QuickActionCard icon={<Star className="h-6 w-6" />} title={t("customerReviews")} />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const QuickActionCard = ({ icon, title, onClick }: { icon: React.ReactNode; title: string; onClick?: () => void }) => {
    return (
        <Button title={title} onClick={onClick} className="h-20 flex-col space-y-2 bg-transparent" variant="outline">
            {icon}
            <span>{title}</span>
        </Button>
    );
};

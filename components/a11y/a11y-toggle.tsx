"use client";

import { Button } from "@/components/ui/button";
import { useA11yStore } from "@/lib/store/a11yStore";
import { useLanguage } from "@/lib/translations/language-context";
import { Accessibility ,LucideAccessibility,SlashSquare} from "lucide-react";

export function A11yToggle() {
    const a11yEnabled = useA11yStore.a11yEnabled();
    const toggleA11y = useA11yStore.toggleA11y();
    const { t } = useLanguage();

    return (
        <Button
            aria-pressed={a11yEnabled}
            aria-label={a11yEnabled ? t("disableAccessibilityMode") : t("enableAccessibilityMode")}
            title={t("accessibilityMode")}
            variant="ghost"
            size="icon"
            onClick={toggleA11y}
        >
            {a11yEnabled ? <Accessibility className="h-4 w-4" /> : <SlashSquare className="h-4 w-4" />}
        </Button>
    );
}

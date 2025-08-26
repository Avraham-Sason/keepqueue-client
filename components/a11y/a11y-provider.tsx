"use client";

import { JSX, useEffect } from "react";
import { useA11yStore } from "@/lib/store/a11yStore";

interface A11yProviderProps {
    children: React.ReactNode;
}

export function A11yProvider({ children }: A11yProviderProps) {
    const a11yEnabled = useA11yStore.useA11yEnabled();

    useEffect(() => {
        const root = document.documentElement;
        if (a11yEnabled) {
            root.classList.add("a11y");
        } else {
            root.classList.remove("a11y");
        }
    }, [a11yEnabled]);

    return children as JSX.Element;
}

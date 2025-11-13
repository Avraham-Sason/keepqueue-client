"use client";

import { InDevelop } from "@/components/InDevelop";
import { useBusinessesStore } from "@/lib/store";
import React from "react";

function Reviews() {
    const currentBusiness = useBusinessesStore.currentBusiness();
    return <InDevelop />;
}

export default Reviews;

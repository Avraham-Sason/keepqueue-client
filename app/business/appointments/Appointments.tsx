"use client";

import { InDevelop } from "@/components/InDevelop";
import { useBusinessesStore } from "@/lib/store";
import React from "react";

function Appointments() {
    const currentBusiness = useBusinessesStore.currentBusiness();
    return <InDevelop />;
}

export default Appointments;

"use client";

import { useBusinessesStore } from "@/lib/store";
import React, { useEffect } from "react";

function Calendar() {
    const currentBusiness = useBusinessesStore.currentBusiness();
    useEffect(() => {
        console.log("currentBusiness", currentBusiness);
    }, [currentBusiness]);
    return <div>Calendar</div>;
}

export default Calendar;

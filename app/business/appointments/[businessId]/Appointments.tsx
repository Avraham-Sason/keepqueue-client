"use client";

import { useBusinessesStore } from "@/lib/store";
import React from "react";

function Appointments() {
    const currentBusiness = useBusinessesStore.currentBusiness();
    return <div>Appointments</div>;
}

export default Appointments;

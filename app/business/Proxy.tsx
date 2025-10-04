"use client";
import { useBusinessProxy } from "./hooks";
import BusinessLoading from "./loading";

function Proxy() {
    useBusinessProxy();
    return <BusinessLoading />;
}

export default Proxy;

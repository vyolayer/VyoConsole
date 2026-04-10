"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

export const Logo: React.FC<{
    classname?: string;
}> = ({ classname }) => {
    return <Image className={cn(classname)} alt="logo" src="/wl_logo.png" width={32} height={32} />;
};

"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Rocket, Box, Shield, ArrowRight } from "lucide-react";
import { IOrganization } from "@org/types/organization.types";

function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

interface OrganizationCardProps {
    organization: IOrganization;
    onClickOpen: (slug: string) => void;
}

export function OrganizationCard({ organization, onClickOpen }: OrganizationCardProps) {
    const handleOpen = () => {
        onClickOpen(organization.slug);
    };

    const avatarColor = stringToColor(organization.name);
    const initials = organization.name.slice(0, 2).toUpperCase();

    // Formatting ID to look like the reference
    const shortId = `${organization.id.substring(0, 5)}...${organization.id.substring(organization.id.length - 3)}`;

    return (
        <Card
            className="group flex flex-col justify-between p-6 cursor-pointer bg-[#141418] border-transparent hover:border-[#ffffff10] shadow-none transition-all duration-300 hover:bg-[#1a1a1f] rounded-2xl h-80"
            onClick={handleOpen}
        >
            <div className="space-y-6">
                {/* Header Row: Icon & Status */}
                <div className="flex justify-between items-start">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-[#25252c] transition-colors"
                        style={{ backgroundColor: avatarColor }}
                    >
                        <span className="text-white font-bold text-sm">{initials}</span>
                    </div>
                    <Badge
                        variant="secondary"
                        className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#1e1e24] text-white/70 border border-[#ffffff10] ${organization.is_active ? "text-[#00e5ff] border-[#00e5ff]/20 bg-[#00e5ff]/5" : ""}`}
                    >
                        {organization.is_active ? (
                            <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                                ACTIVE
                            </span>
                        ) : (
                            "STANDARD"
                        )}
                    </Badge>
                </div>

                {/* Title & ID */}
                <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                        {organization.name}
                    </h3>
                    <p className="text-xs font-mono text-[#7b7b86] mt-1.5 uppercase">
                        ID: {shortId}
                    </p>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-10">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-[#7b7b86] uppercase tracking-wider">
                            Projects
                        </span>
                        <span className="text-2xl font-bold text-white leading-none">
                            {/* Assuming project count isn't in IOrganization natively yet, mocking with a random-looking number */}
                            {organization.project_count || "0"}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-[#7b7b86] uppercase tracking-wider">
                            Members
                        </span>
                        <span className="text-2xl font-bold text-white leading-none">
                            {organization.member_count || "0"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer Action */}
            <Button
                variant="outline"
                className="w-full mt-6 bg-transparent border-[#ffffff10] text-[#a1a1aa] hover:text-white hover:bg-[#ffffff05] justify-center text-sm font-medium h-11"
                onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                }}
            >
                Overview
                <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Button>
        </Card>
    );
}

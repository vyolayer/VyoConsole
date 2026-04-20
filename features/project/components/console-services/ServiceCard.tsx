"use client";

import * as React from "react";
import { Clock3, AlertCircle, Crown, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IProjectManifestService } from "@/features/project/types/projectService.type";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export function ServiceCard({
    orgSlug,
    projectId,
    service,
}: {
    orgSlug: string;
    projectId: string;
    service: IProjectManifestService;
}) {
    return (
        <Card className="group w-full bg-[#141418] hover:bg-[#1a1a1f] border border-[#ffffff10] hover:border-[#ffffff20] rounded-2xl p-6 transition-all relative flex flex-col h-full">
            {/* Card Header */}

            <CardHeader className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#ffffff08] border border-[#ffffff10] flex items-center justify-center shrink-0 group-hover:bg-[#25252c] transition-colors">
                        {/* <IconComponent className="w-6 h-6 text-[#a1a1aa] group-hover:text-white transition-colors" /> */}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                            {service.name}
                        </h3>
                        <p className="text-sm text-[#7b7b86] mt-0.5 line-clamp-1">{service.plan}</p>
                    </div>
                </div>
            </CardHeader>

            {/* Content / Info Rows */}
            <CardContent className="grid gap-3 mb-8 mt-auto pt-4 border-t border-[#ffffff08]">
                <InfoRow label="Status" value={<StatusBadge status={service.status} />} />
                <InfoRow label="Plan" value={<PlanBadge plan={service.plan} />} />
                <InfoRow
                    label="Identifier"
                    value={
                        <span className="font-mono text-[11px] text-[#a1a1aa] bg-[#ffffff05] px-2 py-0.5 rounded-md border border-[#ffffff10]">
                            {service.key}
                        </span>
                    }
                />
            </CardContent>

            {/* Actions */}
            <CardFooter className="flex gap-3 mt-auto w-full">
                <Link
                    href={`/console/${orgSlug}/projects/${projectId}/services?tab=${service.key}`}
                    className="w-full"
                >
                    <Button className="flex-1 w-full bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/20">
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        Open Service
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#7b7b86] uppercase tracking-wider">
                {label}
            </span>
            <div className="flex items-center">{value}</div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    if (status === "active") {
        return (
            <Badge
                variant="secondary"
                className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full text-emerald-400 border-emerald-400/20 bg-emerald-400/10 gap-1.5 h-6"
            >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
            </Badge>
        );
    }

    if (status === "planned") {
        return (
            <Badge
                variant="secondary"
                className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full text-amber-400 border-amber-400/20 bg-amber-400/10 gap-1.5 h-6"
            >
                <Clock3 className="w-3 h-3" />
                Planned
            </Badge>
        );
    }

    return (
        <Badge
            variant="secondary"
            className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full text-rose-400 border-rose-400/20 bg-rose-400/10 gap-1.5 h-6"
        >
            <AlertCircle className="w-3 h-3" />
            Issue
        </Badge>
    );
}

function PlanBadge({ plan }: { plan: string }) {
    if (plan === "enterprise") {
        return (
            <Badge
                variant="secondary"
                className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full text-[#ba9eff] border-[#ba9eff]/20 bg-[#ba9eff]/10 gap-1 h-6"
            >
                <Crown className="w-3 h-3" />
                Enterprise
            </Badge>
        );
    }

    if (plan === "pro") {
        return (
            <Badge
                variant="secondary"
                className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full text-[#00e5ff] border-[#00e5ff]/20 bg-[#00e5ff]/10 h-6"
            >
                Pro
            </Badge>
        );
    }

    return (
        <Badge
            variant="secondary"
            className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full text-[#a1a1aa] border-[#ffffff10] bg-[#ffffff05] h-6"
        >
            Free
        </Badge>
    );
}

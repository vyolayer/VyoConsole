"use client";

import * as React from "react";
import { IApiKey } from "@/features/project/types/apiKey.type";
import {
    Clock,
    Globe,
    Monitor,
    MoreHorizontal,
    RefreshCw,
    Shield,
    ShieldOff,
    Tag,
} from "lucide-react";
import { format, formatDistanceToNow, isPast } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ApiKeyCardProps {
    apiKey: IApiKey;
    onRotate: (id: string) => void;
    onRevoke: (id: string) => void;
}

function statusConfig(apiKey: IApiKey) {
    if (apiKey.status === "revoked" || apiKey.revoked_at) {
        return {
            label: "Revoked",
            className: "text-red-400 border-red-400/20 bg-red-400/5",
            dot: "bg-red-400",
        };
    }
    if (apiKey.expires_at && isPast(new Date(apiKey.expires_at))) {
        return {
            label: "Expired",
            className: "text-amber-400 border-amber-400/20 bg-amber-400/5",
            dot: "bg-amber-400",
        };
    }
    return {
        label: "Active",
        className: "text-[#00e5ff] border-[#00e5ff]/20 bg-[#00e5ff]/5",
        dot: "bg-[#00e5ff] animate-pulse",
    };
}

function envConfig(env: string) {
    if (env === "live") {
        return { label: "Live", className: "text-green-400 border-green-400/20 bg-green-400/5" };
    }
    return { label: "Dev", className: "text-purple-400 border-purple-400/20 bg-purple-400/5" };
}

export const ApiKeyCard: React.FC<ApiKeyCardProps> = ({ apiKey, onRotate, onRevoke }) => {
    const status = statusConfig(apiKey);
    const env = envConfig(apiKey.environment);
    const isRevoked = apiKey.status === "revoked" || !!apiKey.revoked_at;

    const lastUsed = apiKey.last_used_at
        ? formatDistanceToNow(new Date(apiKey.last_used_at), { addSuffix: true })
        : "Never";

    const expiresAt = apiKey.expires_at
        ? format(new Date(apiKey.expires_at), "MMM d, yyyy")
        : "Never";

    const createdAt = apiKey.last_used_at
        ? format(new Date(apiKey.last_used_at), "MMM d, yyyy")
        : "—";

    return (
        <div
            className={cn(
                "bg-[#141418] hover:bg-[#18181e] transition-colors rounded-2xl p-5 flex flex-col gap-4 border",
                isRevoked ? "border-[#ffffff08] opacity-60" : "border-[#ffffff08]",
            )}
        >
            {/* ── Row 1: name + badges + menu ── */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-white truncate">
                            {apiKey.name}
                        </span>
                        <Badge
                            variant="outline"
                            className={cn(
                                "text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full",
                                status.className,
                            )}
                        >
                            <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", status.dot)} />
                            {status.label}
                        </Badge>
                        <Badge
                            variant="outline"
                            className={cn(
                                "text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full",
                                env.className,
                            )}
                        >
                            {env.label}
                        </Badge>
                    </div>
                    {apiKey.description && (
                        <p className="text-xs text-[#7b7b86] truncate max-w-sm">
                            {apiKey.description}
                        </p>
                    )}
                </div>

                {!isRevoked && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="shrink-0 h-7 w-7 text-[#7b7b86] hover:text-white hover:bg-[#ffffff10]"
                            >
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem
                                className="gap-2 cursor-pointer"
                                onClick={() => onRotate(apiKey.id)}
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                                Rotate Key
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="gap-2 cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-400/10"
                                onClick={() => onRevoke(apiKey.id)}
                            >
                                <ShieldOff className="w-3.5 h-3.5" />
                                Revoke Key
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            {/* ── Row 2: prefix chip ── */}
            <div className="font-mono text-xs bg-[#0e0e12] border border-[#ffffff08] rounded-lg px-3 py-2 text-[#a1a1aa] tracking-widest select-all">
                {apiKey.prefix}
                <span className="text-[#ffffff20]">••••••••••••••••••••</span>
            </div>

            {/* ── Row 3: meta grid ── */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <MetaItem icon={Clock} label="Last used" value={lastUsed} />
                <MetaItem icon={Tag} label="Expires" value={expiresAt} />
                <MetaItem icon={Shield} label="Scopes" value={`${apiKey.scopes?.length ?? 0}`} />
                {apiKey.last_used_ip && (
                    <MetaItem icon={Globe} label="Last IP" value={apiKey.last_used_ip} mono />
                )}
                {apiKey.last_used_ua && (
                    <MetaItem
                        icon={Monitor}
                        label="Last agent"
                        value={apiKey.last_used_ua}
                        truncate
                    />
                )}
            </div>

            {/* ── Scopes list ── */}
            {apiKey.scopes && apiKey.scopes.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {apiKey.scopes.map((scope) => (
                        <span
                            key={scope}
                            className="text-[10px] font-mono bg-[#ffffff06] border border-[#ffffff10] text-[#a1a1aa] rounded-md px-2 py-0.5"
                        >
                            {scope}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

function MetaItem({
    icon: Icon,
    label,
    value,
    mono,
    truncate,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    mono?: boolean;
    truncate?: boolean;
}) {
    return (
        <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1 text-[#7b7b86]">
                <Icon className="w-3 h-3" />
                <span className="text-[10px] uppercase tracking-wide font-semibold">{label}</span>
            </div>
            <span
                className={cn(
                    "text-xs text-[#a1a1aa]",
                    mono && "font-mono",
                    truncate && "truncate max-w-[120px]",
                )}
            >
                {value}
            </span>
        </div>
    );
}

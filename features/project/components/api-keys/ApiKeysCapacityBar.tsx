"use client";

import * as React from "react";
import { Key } from "lucide-react";

interface ApiKeysCapacityBarProps {
    count: number;
    max: number;
}

export const ApiKeysCapacityBar: React.FC<ApiKeysCapacityBarProps> = ({ count, max }) => {
    const pct = max > 0 ? Math.min((count / max) * 100, 100) : 0;
    const isNearLimit = pct >= 80;
    const barColor = isNearLimit ? "bg-amber-400" : "bg-[#00e5ff]";

    return (
        <div className="bg-[#141418] rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-[#7b7b86]">
                <Key className="w-4 h-4" />
                <span className="text-sm">API key capacity</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-40 h-1.5 rounded-full bg-[#ffffff08] overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${pct}%` }}
                    />
                </div>
                <span className="text-sm font-semibold text-white tabular-nums">
                    {count} / {max}
                </span>
            </div>
        </div>
    );
};

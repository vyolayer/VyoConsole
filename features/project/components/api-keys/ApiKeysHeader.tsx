"use client";

import * as React from "react";
import { Plus, Key } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ApiKeysHeaderProps {
    projectName: string;
    onCreateClick: () => void;
}

export const ApiKeysHeader: React.FC<ApiKeysHeaderProps> = ({ projectName, onCreateClick }) => {
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Key className="w-5 h-5 text-[#00e5ff]" />
                    API Keys
                </h2>
                <p className="text-sm text-[#7b7b86] mt-0.5">
                    Manage API keys for{" "}
                    <span className="text-[#a1a1aa]">{projectName}</span>. Keys grant
                    programmatic access.
                </p>
            </div>
            <Button
                onClick={onCreateClick}
                className="bg-[#00e5ff] hover:bg-[#00e5ff]/90 text-black font-bold shrink-0"
            >
                <Plus className="w-4 h-4 mr-1.5" />
                New API Key
            </Button>
        </div>
    );
};

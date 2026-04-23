"use client";

import * as React from "react";
import { Key, ShieldCheck, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoApiKeysProps {
    onCreateClick: () => void;
}

export const NoApiKeys: React.FC<NoApiKeysProps> = ({ onCreateClick }) => {
    return (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#ffffff10] rounded-2xl py-16 gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#1e1e24] flex items-center justify-center">
                <Key className="w-6 h-6 text-[#7b7b86]" />
            </div>
            <div className="text-center">
                <h3 className="text-base font-bold text-white mb-1">No API keys yet</h3>
                <p className="text-sm text-[#7b7b86] max-w-xs">
                    Create an API key to grant programmatic access to this project.
                </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141418] border border-[#ffffff08] text-xs text-[#7b7b86]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ba9eff]" />
                Store your secret key securely — it is shown only once.
            </div>

            <Button
                onClick={onCreateClick}
                className="bg-[#00e5ff] hover:bg-[#00e5ff]/90 text-black font-bold mt-2"
            >
                <Plus className="w-4 h-4 mr-2" />
                Create API Key
            </Button>
        </div>
    );
};

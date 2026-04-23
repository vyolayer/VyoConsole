"use client";

import * as React from "react";
import { IApiKey } from "@/features/project/types/apiKey.type";
import { ApiKeyCard } from "./ApiKeyCard";

interface ApiKeyListProps {
    apiKeys: IApiKey[];
    onRotate: (id: string) => void;
    onRevoke: (id: string) => void;
}

export const ApiKeyList: React.FC<ApiKeyListProps> = ({ apiKeys, onRotate, onRevoke }) => {
    return (
        <div className="flex flex-col gap-3">
            {apiKeys.map((apiKey) => (
                <ApiKeyCard
                    key={apiKey.id}
                    apiKey={apiKey}
                    onRotate={onRotate}
                    onRevoke={onRevoke}
                />
            ))}
        </div>
    );
};

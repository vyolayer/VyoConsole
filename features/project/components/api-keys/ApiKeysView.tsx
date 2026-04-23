"use client";

import * as React from "react";
import { IApiKey } from "@/features/project/types/apiKey.type";
import { IProject } from "@/features/project/types/project.type";
import { ApiKeysHeader } from "./ApiKeysHeader";
import { ApiKeysCapacityBar } from "./ApiKeysCapacityBar";
import { ApiKeyList } from "./ApiKeyList";
import { NoApiKeys } from "./NoApiKeys";
import { CreateApiKeyDialog } from "./dialogs/CreateApiKeyDialog";
import { RevokeApiKeyDialog } from "./dialogs/RevokeApiKeyDialog";
import { RotateApiKeyDialog } from "./dialogs/RotateApiKeyDialog";
import { SecretRevealDialog } from "./dialogs/SecretRevealDialog";
import { CreateApiKeyResponse } from "@project/api/apikey.api";

interface ApiKeysViewProps {
    project: IProject;
    apiKeys: IApiKey[];
}

type ActionTarget = { id: string; name: string } | null;

export const ApiKeysView: React.FC<ApiKeysViewProps> = ({ project, apiKeys }) => {
    // Dialog open states
    const [createOpen, setCreateOpen] = React.useState(false);
    const [revokeTarget, setRevokeTarget] = React.useState<ActionTarget>(null);
    const [rotateTarget, setRotateTarget] = React.useState<ActionTarget>(null);

    // Secret reveal after create / rotate
    const [secretResult, setSecretResult] = React.useState<{
        apiKey: IApiKey;
        secret: string;
    } | null>(null);

    const handleCreated = (result: CreateApiKeyResponse) => {
        setSecretResult({ apiKey: result.api_key, secret: result.secret });
    };

    const handleRotated = (result: CreateApiKeyResponse) => {
        setSecretResult({ apiKey: result.api_key, secret: result.secret });
    };

    const handleRevokeClick = (id: string) => {
        const key = apiKeys.find((k) => k.id === id);
        if (key) setRevokeTarget({ id: key.id, name: key.name });
    };

    const handleRotateClick = (id: string) => {
        const key = apiKeys.find((k) => k.id === id);
        if (key) setRotateTarget({ id: key.id, name: key.name });
    };

    return (
        <>
            <div className="flex flex-col gap-8">
                {/* Header */}
                <ApiKeysHeader
                    projectName={project.name}
                    onCreateClick={() => setCreateOpen(true)}
                />

                {/* Capacity bar */}
                <ApiKeysCapacityBar count={apiKeys.length} max={project.max_api_keys} />

                {/* List or empty state */}
                {apiKeys.length === 0 ? (
                    <NoApiKeys onCreateClick={() => setCreateOpen(true)} />
                ) : (
                    <ApiKeyList
                        apiKeys={apiKeys}
                        onRevoke={handleRevokeClick}
                        onRotate={handleRotateClick}
                    />
                )}
            </div>

            {/* ── Dialogs ── */}
            <CreateApiKeyDialog
                open={createOpen}
                onOpenChange={setCreateOpen}
                onCreated={handleCreated}
            />

            {revokeTarget && (
                <RevokeApiKeyDialog
                    open={!!revokeTarget}
                    onOpenChange={(open) => !open && setRevokeTarget(null)}
                    apiKeyId={revokeTarget.id}
                    apiKeyName={revokeTarget.name}
                />
            )}

            {rotateTarget && (
                <RotateApiKeyDialog
                    open={!!rotateTarget}
                    onOpenChange={(open) => !open && setRotateTarget(null)}
                    apiKeyId={rotateTarget.id}
                    apiKeyName={rotateTarget.name}
                    onRotated={handleRotated}
                />
            )}

            {secretResult && (
                <SecretRevealDialog
                    open={!!secretResult}
                    onOpenChange={(open) => !open && setSecretResult(null)}
                    apiKey={secretResult.apiKey}
                    secret={secretResult.secret}
                />
            )}
        </>
    );
};

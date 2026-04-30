"use client";

import { Button } from "@/components/ui/button";
import { PowerOff, Trash2, User } from "lucide-react";
import React from "react";
import { ConfirmNameDialog } from "./ConfirmNameDialog";
import { useDeleteOrganization } from "../../hooks/useDeleteOrganization";

export const OrganizationDangerZone = ({
    is_active,
    orgName,
    orgID,
}: {
    is_active: boolean;
    orgName: string;
    orgID: string;
}) => {
    const { mutateAsync: deleteOrg, isPending: isDeleting } = useDeleteOrganization(orgID);

    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState<"delete" | "archive" | null>(null);

    const onDelete = () => {
        setOpen(true);
        setType("delete");
    };

    const onConfirmDelete = (str: string) => {
        deleteOrg({ confirm_name: str });
    };

    return (
        <div className="bg-[#141418] rounded-2xl p-8 border border-red-500/10 flex flex-col gap-5">
            <h2 className="text-sm font-bold text-red-400/80 uppercase tracking-wider">
                Danger Zone
            </h2>

            {/* Transfer Ownership */}
            <div className="flex items-center justify-between py-4 border-b border-[#ffffff08]">
                <div>
                    <p className="text-sm font-semibold text-white">Transfer Ownership</p>
                    <p className="text-xs text-[#7b7b86] mt-0.5">
                        Transfer ownership of this organization to another member.
                    </p>
                </div>
                <Button
                    variant="outline"
                    className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 bg-transparent hover:border-orange-500/50"
                >
                    <User className="w-4 h-4 mr-2" />
                    Transfer Ownership
                </Button>
            </div>

            {/* Deactivate */}
            {/* TODO: Archive */}
            <div className="flex items-center justify-between py-4 border-b border-[#ffffff08]">
                <div>
                    <p className="text-sm font-semibold text-white">
                        {is_active ? "Deactivate Organization" : "Reactivate Organization"}
                    </p>
                    <p className="text-xs text-[#7b7b86] mt-0.5">
                        {is_active
                            ? "Deactivating will suspend all access to this organization."
                            : "Reactivating will restore access to this organization."}
                    </p>
                </div>
                <Button
                    variant="outline"
                    className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 bg-transparent hover:border-orange-500/50"
                >
                    <PowerOff className="w-4 h-4 mr-2" />
                    {is_active ? "Deactivate" : "Reactivate"}
                </Button>
            </div>

            {/* Delete */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-white">Delete Organization</p>
                    <p className="text-xs text-[#7b7b86] mt-0.5">
                        Permanently delete this organization and all its data. This cannot be
                        undone.
                    </p>
                </div>
                <Button
                    variant="destructive"
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                    onClick={onDelete}
                >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                </Button>
            </div>

            {type == "delete" ? (
                <ConfirmNameDialog
                    open={open}
                    onOpenChange={setOpen}
                    type={type}
                    name={orgName}
                    isLoading={isDeleting}
                    onConfirm={onConfirmDelete}
                    title="Delete Organization"
                />
            ) : null}
        </div>
    );
};

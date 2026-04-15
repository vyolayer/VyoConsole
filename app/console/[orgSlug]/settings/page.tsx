"use client";

import { useOrganizationBySlug } from "@org/hooks/useOrganization";
import { PageHeader } from "@/features/console/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Trash2, PowerOff, Info, User } from "lucide-react";
import { useState, useEffect } from "react";
import { IOrganization } from "@/features/org/types/organization.types";

export default function ConsoleSettingsPage() {
    const { organization: org } = useOrganizationBySlug();

    return (
        <div className="flex flex-col gap-8 py-6 w-full">
            <PageHeader
                title="Settings"
                description="Manage your organization's details and preferences."
            />

            {/* General Settings Form */}
            <SettingsForm org={org} />

            {/* Limits & Quotas */}
            <LimitsAndQuotas max_members={org.max_members} max_projects={org.max_projects} />

            {/* Danger Zone */}
            <DangerZone is_active={org.is_active} />
        </div>
    );
}

const SettingsForm = ({ org }: { org: IOrganization }) => {
    const [name, setName] = useState(org.name);
    const [description, setDescription] = useState(org.description ?? "");
    const [slug, setSlug] = useState(org.slug);

    useEffect(() => {
        setName(org.name);
        setDescription(org.description ?? "");
        setSlug(org.slug);
    }, [org]);

    const isDirty =
        name !== org.name || description !== (org.description ?? "") || slug !== org.slug;

    function handleSave(e: React.FormEvent) {
        e.preventDefault();
        // TODO: connect to update org mutation
    }

    return (
        <form onSubmit={handleSave} className="bg-[#141418] rounded-2xl p-8 flex flex-col gap-6">
            <h2 className="text-sm font-bold text-[#7b7b86] uppercase tracking-wider">General</h2>

            {/* Name */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="org-name" className="text-sm font-medium text-[#a1a1aa]">
                    Organization Name
                </Label>
                <Input
                    id="org-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#0f1930] border-[#ffffff10] text-white placeholder:text-[#7b7b86] focus:border-[#00e5ff]/50 focus:ring-[#00e5ff]/20"
                    placeholder="My Organization"
                />
            </div>

            {/* Slug */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="org-slug" className="text-sm font-medium text-[#a1a1aa]">
                    Slug
                </Label>
                <div className="flex items-center gap-2 bg-[#0f1930] border border-[#ffffff10] rounded-lg px-3 focus-within:border-[#00e5ff]/50">
                    <span className="text-[#7b7b86] text-sm">console/</span>
                    <Input
                        id="org-slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                        className="bg-transparent border-0 text-white placeholder:text-[#7b7b86] focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                        placeholder="my-organization"
                    />
                </div>
                <p className="text-xs text-[#7b7b86] flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Changing the slug will update the organization URL.
                </p>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="org-description" className="text-sm font-medium text-[#a1a1aa]">
                    Description
                    <span className="ml-2 text-[#7b7b86] font-normal text-xs">(optional)</span>
                </Label>
                <Textarea
                    id="org-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-[#0f1930] border-[#ffffff10] text-white placeholder:text-[#7b7b86] focus:border-[#00e5ff]/50 focus:ring-[#00e5ff]/20 min-h-[80px] resize-none"
                    placeholder="Describe your organization..."
                />
            </div>

            <div className="flex justify-end pt-2">
                <Button
                    type="submit"
                    disabled={!isDirty}
                    className="bg-[#00e5ff] hover:bg-[#00e5ff]/90 text-black font-bold disabled:opacity-40"
                >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                </Button>
            </div>
        </form>
    );
};

const LimitsAndQuotas = ({
    max_members,
    max_projects,
}: {
    max_members: number;
    max_projects: number;
}) => {
    return (
        <div className="bg-[#141418] rounded-2xl p-8 flex flex-col gap-4">
            <h2 className="text-sm font-bold text-[#7b7b86] uppercase tracking-wider">Quotas</h2>
            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: "Max Members", value: max_members },
                    { label: "Max Projects", value: max_projects },
                ].map((q) => (
                    <div key={q.label} className="bg-[#0f1930] rounded-xl p-4">
                        <p className="text-[11px] font-bold text-[#7b7b86] uppercase tracking-wider mb-1">
                            {q.label}
                        </p>
                        <p className="text-2xl font-bold text-white">{q.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const DangerZone = ({ is_active }: { is_active: boolean }) => {
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
                >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                </Button>
            </div>
        </div>
    );
};

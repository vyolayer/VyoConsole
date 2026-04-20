"use client";

import * as React from "react";
import { IProjectMember } from "@/features/project/types/projectMemberType";
import { IProject } from "@/features/project/types/project.type";
import { Plus, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectMemberTable } from "./MemberTable";

export const ProjectMembers: React.FC<{
    project: IProject;
    members: IProjectMember[];
}> = ({ members, project }) => {
    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <ProjectMembersHeader projectName={project.name} />

            {/* Capacity bar */}
            <ProjectMembersCapacityBar
                noOfMembers={members.length}
                maxMembers={project.max_members}
            />

            {/* Empty state */}
            {members.length === 0 ? <NoMembers /> : <ProjectMemberTable members={members} />}
        </div>
    );
};

const ProjectMembersHeader = ({ projectName }: { projectName: string }) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Members</h2>
                <p className="text-sm text-[#7b7b86] mt-0.5">
                    People with access to <span className="text-[#a1a1aa]">{projectName}</span>.
                </p>
            </div>
        </div>
    );
};

const ProjectMembersCapacityBar = ({
    noOfMembers,
    maxMembers,
}: {
    noOfMembers: number;
    maxMembers: number;
}) => {
    return (
        <div className="bg-[#141418] rounded-2xl p-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-[#7b7b86]">
                <Users className="w-4 h-4" />
                <span className="text-sm">Member capacity</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-40 h-1.5 rounded-full bg-[#ffffff08] overflow-hidden">
                    <div
                        className="h-full rounded-full bg-[#00e5ff]"
                        style={{ width: `${(noOfMembers / maxMembers) * 100}%` }}
                    />
                </div>
                <span className="text-sm font-semibold text-white tabular-nums">
                    {noOfMembers} / {maxMembers}
                </span>
            </div>
        </div>
    );
};

const NoMembers = () => {
    return (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#ffffff10] rounded-2xl py-16 gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#1e1e24] flex items-center justify-center">
                <Users className="w-6 h-6 text-[#7b7b86]" />
            </div>
            <div className="text-center">
                <h3 className="text-base font-bold text-white mb-1">No members yet</h3>
                <p className="text-sm text-[#7b7b86] max-w-xs">
                    Invite colleagues to collaborate on this project.
                </p>
            </div>

            {/* Permissions hint */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141418] border border-[#ffffff08] text-xs text-[#7b7b86]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ba9eff]" />
                Members inherit permissions from the organization role.
            </div>

            <Button className="bg-[#00e5ff] hover:bg-[#00e5ff]/90 text-black font-bold mt-2">
                <Plus className="w-4 h-4 mr-2" />
                Invite Member
            </Button>
        </div>
    );
};

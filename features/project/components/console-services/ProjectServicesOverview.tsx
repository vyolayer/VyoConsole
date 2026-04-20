"use client";

import * as React from "react";
import { Boxes, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IProjectManifestService } from "@/features/project/types/projectService.type";
import { useProjectParams } from "../../hooks/useProjectParams";
import { ServiceCard } from "./ServiceCard";
import { useSearchParams } from "next/navigation";
import { useProjectService } from "../../hooks/useProjectServices";
import { DynamicServiceConsole } from "./DynamicServiceConsole";

interface ServicesOverviewProps {
    services: IProjectManifestService[];
}

export function ProjectServicesOverview({ services }: ServicesOverviewProps) {
    const { orgSlug, projectId } = useProjectParams();
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");

    if (tab) {
        return <ServiceConsole tab={tab} projectId={projectId} />;
    }

    return (
        <div className="flex flex-col gap-8 pb-10">
            {/* Services Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {services.map((service) => (
                    <ServiceCard
                        orgSlug={orgSlug}
                        projectId={projectId}
                        key={service.key}
                        service={service}
                    />
                ))}
            </div>

            {/* Empty State */}
            {services.length === 0 && (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#ffffff10] rounded-3xl py-24 gap-4 bg-[#141418]/50">
                    <div className="w-16 h-16 rounded-2xl bg-[#1e1e24] flex items-center justify-center mb-2">
                        <Boxes className="w-8 h-8 text-[#7b7b86]" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-white mb-2">No services connected</h3>
                        <p className="text-sm text-[#7b7b86] max-w-sm mx-auto">
                            Add your first service to start using project infrastructure and expand
                            capabilities.
                        </p>
                    </div>
                    <Button className="bg-[#00e5ff] hover:bg-[#00e5ff]/90 text-black font-bold mt-4">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Service
                    </Button>
                </div>
            )}
        </div>
    );
}

const ServiceConsole = ({ projectId, tab }: { projectId: string; tab?: string }) => {
    const { service, isLoading, error } = useProjectService(projectId, tab);

    if (isLoading) return null;

    if (error) return <div>{error.message}</div>;

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <DynamicServiceConsole data={{}} manifest={service} />
        </React.Suspense>
    );
};

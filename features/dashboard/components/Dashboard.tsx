"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { OrganizationCard } from "./OrganizationCard";
import { IOrganization } from "@org/types/organization.types";
import { useSelectCurrentOrganization } from "@org/hooks/useOrganization";

export const Dashboard: React.FC<{
    organizations: IOrganization[];
}> = ({ organizations }) => {
    const router = useRouter();
    const { setOrgSlug } = useSelectCurrentOrganization();

    function handleOpen(slug: string) {
        setOrgSlug(slug);
        router.push(`/console/${slug}`);
    }

    // const totalActive = organizations.filter((o) => o.is_active).length;
    // const totalMembers = organizations.reduce((acc, curr) => acc + curr.member_count, 0);

    return (
        <div className="flex flex-col gap-16 w-full pb-10">
            {/* Organizations Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-max">
                {organizations.map((org, index) => (
                    <div
                        key={org.id}
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                        style={{ animationDelay: `${index * 75}ms` }}
                    >
                        <OrganizationCard organization={org} onClickOpen={handleOpen} />
                    </div>
                ))}

                {/* Add Organization Dashed Card */}
                <div
                    onClick={() => router.push("/console?tab=organizations&action=create")}
                    className="flex flex-col items-center justify-center p-6 cursor-pointer border-2 border-dashed border-[#ffffff15] rounded-2xl h-[320px] transition-all hover:bg-[#ffffff05] hover:border-[#ffffff30] space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                    style={{ animationDelay: `${organizations.length * 75}ms` }}
                >
                    <div className="w-12 h-12 rounded-xl bg-[#25252c] flex items-center justify-center mb-2">
                        {/* Box with + inside */}
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M12 8v8" />
                            <path d="M8 12h8" />
                        </svg>
                    </div>
                    <div className="text-center space-y-1">
                        <h3 className="text-lg font-bold text-white">Add Organization</h3>
                        <p className="text-sm text-[#7b7b86]">Onboard a new team or department</p>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Health & Upgrade */}
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
                {/* System Health Card */}
                {/* <div className="md:col-span-2 lg:col-span-3 bg-[#131316] rounded-2xl p-8 border border-[#ffffff10] flex justify-between items-end h-[160px]">
                    <div className="flex flex-col h-full justify-between">
                        <span className="text-[11px] font-bold text-[#00e5ff] uppercase tracking-widest">
                            System Health
                        </span>
                        <div className="flex items-baseline gap-10">
                            <div>
                                <h4 className="text-4xl font-bold text-white tracking-tight">
                                    99.9%
                                </h4>
                                <span className="text-xs text-[#7b7b86] font-medium tracking-wide uppercase mt-1 block">
                                    Global Uptime
                                </span>
                            </div>
                            <div>
                                <h4 className="text-4xl font-bold text-white tracking-tight">
                                    12.4m
                                </h4>
                                <span className="text-xs text-[#7b7b86] font-medium tracking-wide uppercase mt-1 block">
                                    Requests/24H
                                </span>
                            </div>
                        </div>
                    </div>
                    // Mock Glowing Bar Chart 
                    <div className="flex items-end gap-1.5 h-[60px]">
                        {[0.4, 0.7, 0.3, 0.9, 0.6, 0.8, 1].map((h, i) => (
                            <div
                                key={i}
                                className="w-6 bg-[#00e5ff] rounded-t-sm"
                                style={{ height: `${h * 100}%`, opacity: 0.3 + h * 0.7 }}
                            />
                        ))}
                    </div>
                </div> */}

                {/* Pro Plan Card */}
                {/* <div className="bg-[#131316] rounded-2xl p-8 border border-[#ffffff10] flex flex-col items-center justify-center text-center h-[160px] cursor-pointer hover:bg-[#1a1a1f] transition-colors">
                    <div className="w-8 h-8 rounded bg-[#1e1e24] flex items-center justify-center mb-3">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[#00e5ff]"
                        >
                            <path d="M12 19V5" />
                            <path d="M5 12l7-7 7 7" />
                        </svg>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">PRO PLAN</h4>
                    <p className="text-[11px] text-[#7b7b86] leading-tight px-4">
                        Upgrade for advanced security features
                    </p>
                </div> */}
            </div>
        </div>
    );
};

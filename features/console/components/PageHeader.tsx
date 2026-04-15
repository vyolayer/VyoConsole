import * as React from "react";

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
    return (
        <div className="flex items-start justify-between py-6">
            <div className="space-y-1.5">
                <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
                {description && (
                    <p className="text-sm text-[#a1a1aa] leading-relaxed">{description}</p>
                )}
            </div>
            {action && <div className="shrink-0 mt-1">{action}</div>}
        </div>
    );
}

"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, Building2 } from "lucide-react";
import * as React from "react";

export const EmptyOrganization: React.FC<{
    onCreateOrganization: () => void;
}> = ({ onCreateOrganization }) => {
    return (
        <div className="flex w-full items-center justify-center p-8">
            <div className="flex max-w-md w-full flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed border-border bg-card/30 p-12 text-center transition-all hover:bg-card/50">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-2 shadow-inner">
                    <Building2 className="h-10 w-10 opacity-80" />
                </div>
                
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold tracking-tight">No organizations yet</h3>
                    <p className="text-sm text-muted-foreground">
                        Get started by creating your first organization to manage projects and teams.
                    </p>
                </div>

                <Button 
                    onClick={onCreateOrganization}
                    size="lg"
                    className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all font-medium rounded-full px-8"
                >
                    <PlusIcon className="mr-2 h-5 w-5" />
                    Create Organization
                </Button>
            </div>
        </div>
    );
};

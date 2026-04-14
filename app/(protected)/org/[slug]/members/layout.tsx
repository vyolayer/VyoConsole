import { InviteMemberDialog } from "@/features/org/components/dialog/InviteMemberDialog";
import { InvitationDialogProvider } from "@/features/org/providers/InvitationDialogProvider";

type OrganizationLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
};

export default async function OrganizationMembersLayout({ children }: OrganizationLayoutProps) {
    return (
        <InvitationDialogProvider>
            {children}
            <InviteMemberDialog />
        </InvitationDialogProvider>
    );
}

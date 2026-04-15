import { InviteMemberDialog } from "@/features/org/components/dialog/InviteMemberDialog";
import { InvitationDialogProvider } from "@/features/org/providers/InvitationDialogProvider";

export default function ConsoleMembersLayout({ children }: { children: React.ReactNode }) {
    return (
        <InvitationDialogProvider>
            {children}
            <InviteMemberDialog />
        </InvitationDialogProvider>
    );
}

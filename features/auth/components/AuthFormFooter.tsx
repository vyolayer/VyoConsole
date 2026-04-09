"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldSeparator } from "@/components/ui/field";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

export const AuthFormFooter = ({
    text,
    link,
    linkText,
}: {
    text: string;
    link: React.ComponentProps<typeof Link>["href"];
    linkText: string;
}) => {
    function onClickGitHub() {
        toast.warning("Write now github login not available");
    }

    return (
        <>
            <FieldSeparator>Or continue with</FieldSeparator>
            <Field>
                <Button variant="outline" type="button" onClick={onClickGitHub}>
                    <GitHubLogoIcon className="mr-1 size-3.5" />
                    Login with GitHub
                </Button>
                <FieldDescription className="text-center">
                    {text} <Link href={link}>{linkText}</Link>
                </FieldDescription>
            </Field>
        </>
    );
};

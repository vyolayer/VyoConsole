"use client";

import {
    CodeExampleSection,
    CTABanner,
    FeaturesSection,
    Footer,
    HeroSection,
    HowItWorksSection,
    TechStackSection,
} from "@/components/landing";
import { useMe } from "@/features/auth/hooks/useMe";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const { data, isLoading, isError } = useMe();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isError && data) {
            router.push("/dashboard");
        }
    }, [isLoading, isError, data, router]);

    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <CodeExampleSection />
            <HowItWorksSection />
            <TechStackSection />
            <CTABanner />
            <Footer />
        </>
    );
}

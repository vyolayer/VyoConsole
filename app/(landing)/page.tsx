"use client";

import {
    CodeExampleSection,
    CTABanner,
    FeaturesSection,
    Footer,
    HeroSection,
    HowItWorksSection,
    TechStackSection,
} from "./_components";

export default function Home() {
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

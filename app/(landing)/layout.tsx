export default function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="landing-page relative min-h-screen overflow-auto">
            {/* ── Ambient glow blobs ── */}
            <div className="pointer-events-none absolute inset-0">
                <div className="landing-blob-1 absolute -top-40 left-1/4 h-150 w-150 rounded-full opacity-20 blur-[120px]" />
                <div className="landing-blob-2 absolute top-1/3 -right-20 h-125 w-125 rounded-full opacity-15 blur-[100px]" />
                <div className="landing-blob-3 absolute bottom-1/4 -left-20 h-100 w-100 rounded-full opacity-10 blur-[80px]" />
            </div>
            {children}
        </div>
    );
}

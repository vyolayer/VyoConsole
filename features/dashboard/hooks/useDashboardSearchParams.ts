import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useDashboardSearchParams = () => {
    const [searchParam, setSearchParam] = useState<{
        tab: string | null;
        action: string | null;
    }>({
        tab: null,
        action: null,
    });

    const searchParams = useSearchParams();

    useEffect(() => {
        const tab = searchParams.get("tab");
        const action = searchParams.get("action");

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSearchParam({
            tab,
            action,
        });
    }, [searchParams]);

    return searchParam;
};

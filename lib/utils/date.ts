import { formatDistanceToNow } from "date-fns";
import { differenceInDays, format } from "date-fns";

export function formatSmartDate(date: string | Date): string {
    const d = new Date(date);

    const days = differenceInDays(new Date(), d);

    if (days < 7) {
        return formatDistanceToNow(d, { addSuffix: true });
    }

    return format(d, "MMM d, yyyy");
}

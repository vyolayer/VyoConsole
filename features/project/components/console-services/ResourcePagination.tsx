import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function ResourcePagination({ page, totalPages, onPageChange }: Props) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={() => onPageChange(Math.max(1, page - 1))} />
                </PaginationItem>

                {Array.from(
                    {
                        length: totalPages,
                    },
                    (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={page === i + 1}
                                onClick={() => onPageChange(i + 1)}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ),
                )}

                <PaginationItem>
                    <PaginationNext onClick={() => onPageChange(Math.min(totalPages, page + 1))} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

import { PaginationWithLinks } from '@/components/ui/pagination-with-links'

interface PaginationProp {
    currentPage: number,
    totalCount: number,
    pageSize: number,
    navToPage: Function,
    navToPageSize: Function
}

const Pagination = ({
    currentPage,
    totalCount,
    pageSize,
    navToPage,
    navToPageSize
}: PaginationProp) => {
    return (
        <PaginationWithLinks
            pageSizeSelectOptions={{
                pageSizeOptions: [5, 10, 20, 25]
            }}
            pageSize={pageSize}
            page={currentPage}
            totalCount={totalCount}
            navToPage={navToPage}
            navToPageSize={navToPageSize}
        />
    )
}

export default Pagination
import { useMemo } from "react"
import { PageInfo } from "src/interfaces"

export const usePagenation = (pageInfo?: PageInfo) => {
    return useMemo(() => {
        if(!pageInfo) return 0

        const { hasNextPage, page } = pageInfo

        return hasNextPage ? page + 1 : page
    }, [pageInfo])
}
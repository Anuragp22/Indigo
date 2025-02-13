import { getAllUserVideos, getFolderInfo } from '@/actions/workspace'
import FolderInfo from '@/components/global/folders/forlder-info'
import Videos from '@/components/global/videos'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'
import React from 'react'

type Props = {
    params: {
        folderId: string
        workspaceId: string
    }
}

const page = async ({ params }: Props) => {
    // Await the params proxy before using its properties
    const resolvedParams = await Promise.resolve(params)
    const { folderId, workspaceId } = resolvedParams

    const query = new QueryClient()
    await query.prefetchQuery({
        queryKey: ['folder-videos'],
        queryFn: () => getAllUserVideos(folderId),
    })

    await query.prefetchQuery({
        queryKey: ['folder-info'],
        queryFn: () => getFolderInfo(folderId),
    })

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <FolderInfo folderId={folderId} />

            <Videos
                workspaceId={workspaceId}
                folderId={folderId}
                videosKey="folder-videos"
            />

        </HydrationBoundary>
    )
}

export default page

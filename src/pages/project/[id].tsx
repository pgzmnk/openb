import { useRouter } from 'next/router';
import useSwr from 'swr';

import { Project } from '@/interfaces';

const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())

export default function Project() {
    const { query } = useRouter()
    const { data, error, isLoading } = useSwr<Project>(
        query.id ? `/api/project/${query.id}` : null,
        fetcher
    )

    if (error) return <div>Failed to load project.</div>
    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>No project found.</div>

    return <div>Project: {data.name}</div>

}
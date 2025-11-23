import EventDetails from "@/app/components/EventDetails"
import { Suspense } from "react"

const EventDetailPage = async ({ params }: { params: Promise<{slug: string}> }) => {
    const slug = params.then((p) => p.slug)
    return (
        <div>
            <Suspense fallback={<div>loading...</div>} >
                <EventDetails params={slug}/>
            </Suspense>
        </div>
    )
}
export default EventDetailPage
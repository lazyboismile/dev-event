import { BASE_URL } from "@/lib/config";
import { notFound } from "next/navigation";

const EventDetails = async ({params}: {params: Promise<{slug: string}>}) => {
    const { slug } = await params;
    const result = await fetch(`${BASE_URL}/api/events/${slug}`);
    const event = await result.json();
    console.log("Event Data: ", event);

    if(!event) return notFound();
    
    return (
        <section id="event">
            <h1>Event Details: <br /> { slug }</h1>
            <p>event name {event.title}</p>
        </section>
    )
}

export default EventDetails
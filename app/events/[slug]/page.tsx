import BookEvent from "@/app/components/BookEvent";
import EventCard from "@/app/components/EventCard";
import { IEvent } from "@/database";
import { getSimilarEventBySlug } from "@/lib/actions/event.actions";
import { BASE_URL } from '@/lib/config';
import Image from "next/image";
import { notFound } from "next/navigation";

const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string; }) => (
    <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
    <div className="agenda">
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
)

const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
        {tags.map((tag) => (
            <div className="pill" key={tag}>{tag}</div>
        ))}
    </div>
)

const EventDetails = async ({ params }: { params: Promise<string> }) => {
    const { slug } = await params;

    let event;
    try {
        const request = await fetch(`${BASE_URL}/api/events/${slug}`, {
            next: { revalidate: 60 }
        });

        const response = await request.json();
        event = response.event;
    } catch (error) {
        console.error('Error fetching event:', error);
        return notFound();
    }

    if(!event) return notFound();

    const bookings = 10;

    const similarEvents: IEvent[] = await getSimilarEventBySlug(slug);
    console.log("similarEvents:" , similarEvents);

    return (
        <section id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p>{event.description}</p>
            </div>

            <div className="details">
                {/*    Left Side - Event Content */}
                <div className="content">
                    <img src={`${BASE_URL}${event.image}`} alt="Event Banner" width={800} height={800} className="banner" />

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{event.overview}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>

                        <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={event.date} />
                        <EventDetailItem icon="/icons/clock.svg" alt="clock" label={event.time} />
                        <EventDetailItem icon="/icons/pin.svg" alt="pin" label={event.location} />
                        <EventDetailItem icon="/icons/mode.svg" alt="mode" label={event.mode} />
                        <EventDetailItem icon="/icons/audience.svg" alt="audience" label={event.audience} />
                    </section>

                    <EventAgenda agendaItems={event.agenda} />

                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{event.organizer}</p>
                    </section>

                    <EventTags tags={event.tags} />
                </div>

                {/*    Right Side - Booking Form */}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">
                                Join {bookings} people who have already booked their spot!
                            </p>
                        ): (
                            <p className="text-sm">Be the first to book your spot!</p>
                        )}
                        
                        <BookEvent eventId={""} slug={""} />
                    </div>
                </aside>
            </div>

            <div className="flex w-full flex-col  gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents?.length > 0 && similarEvents.map((similarEvent: IEvent) => {
                        return <EventCard key={similarEvent.title} { ...similarEvent} />
                    })}
                </div>
            </div>

        </section>
    )
}
export default EventDetails
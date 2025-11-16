import Link from "next/link";
import Image from "next/image";
import { BASE_URL } from "@/lib/config";

interface Props {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

const EventCard = ({title, image, slug, location, date, time}: Props) => {
  return (
    <Link href={`/events/${slug}`} id="event-card">
        <img src={`${BASE_URL}/public${image}`} alt={title} width={410} height={300} className="poster"/>

        <div className="flex flex-row gap-2">
            <Image src="/icons/pin.svg" alt="date" width={14} height={14} />
            <p>{location}</p>
        </div>

        <p className="title">{title}</p>

        <div className="datetime">
            <div>
                <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
                <p>{date}</p>
            </div>
            <div>
                <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
                <p>{time}</p>
            </div>
        </div>
    </Link>
  )
}

export default EventCard
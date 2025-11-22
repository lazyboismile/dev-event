'use server';

import { Event } from "@/database";
import connectDB from "../mongodb";

export const getSimilarEventBySlug = async (slug: string) => {
    try {
        await connectDB();

        const event = await Event.findOne({ slug });
        const similarEvents = await Event.find({
            _id: { $ne: event._id },
            tags: { $in: event.tags }
        }).lean().exec();

        return similarEvents;
    } catch (error) {
        console.log("Event fetching failed:", error);
        return [];
    }
}
'use server';

import { Booking } from "@/database";
import connectDB from "../mongodb";

export const createBooking = async ({ eventId, slug, email }: { eventId: string, slug: string, email: string }) => {
    console.log("POST, createBooking");
    try {
        await connectDB();

        const result = await Booking.create({ eventId, slug, email });
        return { success: true };
    } catch (error) {
        console.log("Error, createBooking failed :", error);
        return { success: false };
    }
}
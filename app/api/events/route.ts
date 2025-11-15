import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { SEGMENT_EXPLORER_SIMULATED_ERROR_MESSAGE } from "next/dist/next-devtools/userspace/app/segment-explorer-node";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();  

        const formData = await req.formData();

        let event;
        try {
            event = Object.fromEntries(formData.entries());
        } catch (error) {
            console.log("Error, Event :", error);
            return NextResponse.json({ message: 'Invalid JSON data format:', error}, { status: 400 })
        }

        const createEvent = await Event.create(event);
        
        const result = NextResponse.json({ message: 'CreateEvent is succesfully completed', Event: createEvent}, { status: 201 });
        return result;
    } catch (error) {
        console.log("Error, POST :", error);
        return NextResponse.json({ message: 'Event Creation failed:', error}, { status: 400 })
    }
}
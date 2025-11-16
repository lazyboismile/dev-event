    import { Event } from "@/database";
    import { getSerialForImage, validMimeTypes } from "@/lib/config";
    import connectDB from "@/lib/mongodb";
    import { writeFile } from "fs/promises";
    import { NextRequest, NextResponse } from "next/server";
    import path from "path";

    export async function POST(req: NextRequest) {
        try {
            await connectDB();  

            const formData = await req.formData();

            const event = Object.fromEntries(formData.entries());

            const filename = formData.get('image') as File;
            console.log('POST: imageUploader');

            if (!filename) return NextResponse.json({message: 'Image is required'}, { status: 400 });

            const mimetype = filename.type;
            const validMime = validMimeTypes.includes(mimetype);
            if (!validMime) return NextResponse.json({message: "Invalid format. Allowed: png, jpg, jpeg, webp"}, { status: 400 });

            const name = getSerialForImage(filename.name);

            // Generate filename
            const imageName = `${Date.now()}-${name}`;
            const uploadDir = path.join(process.cwd(), "uploads", "events");
            const filePath = path.join(uploadDir, imageName);

            // Save file
            await writeFile(filePath, name);

            event.image = `/uploads/events/${imageName}`;

            const createEvent = await Event.create(event);
            
            const result = NextResponse.json({ message: 'CreateEvent is succesfully completed', Event: createEvent}, { status: 201 });
            return result;
            
        } 
        catch (error) {
            console.log("Error, POST :", error);
            return NextResponse.json({ message: 'Event Creation failed:', error}, { status: 400 })
        }
    }

    export async function GET() {
        try {
            await connectDB();

            const events = await Event.find().sort({ createdAt: -1 }).exec();
            console.log('GET, getEvents', events);
            return NextResponse.json({ message: 'data fetching completed', events}, { status: 200})
        } catch (error) {
            console.log('Error, getEvents', error);
            return NextResponse.json({ message: 'getEvents =>', error }, { status: 500 });
        }
    }
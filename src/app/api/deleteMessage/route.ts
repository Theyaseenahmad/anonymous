import connectDb from "@/lib/dbConnect";
import { UserModel } from "@/models/user";
import { getServerSession } from "next-auth";
import { z } from "zod";
import authOptions from "../auth/[...nextauth]/options";

export async function DELETE(req: Request) {
    await connectDb();

    // Extract messageId from the request URL
    const url = new URL(req.url);
    const messageId = url.searchParams.get("messageId");

    if (!messageId) {
        return Response.json({
            success: false,
            message: "Message ID is required"
        });
    }

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.username) {
        return Response.json({
            success: false,
            message: "Unauthorized"
        });
    }

    try {
        const username = session.user.username;

        const user = await UserModel.findOne({ username });
        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            });
        }

        // Ensure _id is treated as a string for comparison
        const updatedMessages = user.messages.filter(msg => String(msg._id) !== messageId);

        if (updatedMessages.length === user.messages.length) {
            return Response.json({
                success: false,
                message: "Message not found"
            });
        }

        user.messages = updatedMessages;
        await user.save();

        return Response.json({
            success: true,
            message: "Message deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting message:", error);
        return Response.json({
            success: false,
            message: "Internal server error"
        });
    }
}

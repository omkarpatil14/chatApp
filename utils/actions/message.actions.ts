"use server"
import { createClient } from "@/utils/supabase/server";

export default async function getAllMessages(chatId) {
    if (!chatId) return { error: "Chat ID is required" };
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chatId", chatId)
        .order("created_at", { ascending: true }); // Order by time

    if (error) {
        console.error("Error fetching messages:", error);
        return { error };
    }

    return data;
};

export async function sendMessage(chatId, senderId, content) {

    if (!chatId || !senderId || !content) return { error: "Missing required fields" };
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("messages")
        .insert([{  chatId, senderId, content }])
        .select("*") // This ensures we return the inserted message
        .single(); // Since we're inserting one message, we expect one result

    if (error) {
        console.error("Error sending message:", error);
    }
    
    return { data,error };
};

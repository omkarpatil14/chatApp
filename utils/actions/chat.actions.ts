"use server"
import { createClient } from "@/utils/supabase/server"

export async function createChat(myUserId, otherUserEmail) {
    const supabase =await createClient();
    // Step 1: Get other user's ID from email
    const { data: otherUser, error: userError } = await supabase
        .from("users") // Replace with your actual users table name
        .select("userId")
        .eq("email", otherUserEmail)
        .single();

    if (userError || !otherUser) {
        console.error("Error fetching user ID:", userError);
        return { error: "User not found" };
    }
    const otherUserId = otherUser.userId;
    if(myUserId === otherUserId) 
        return { error: "Give other's email, not yours!" };

    // Step 2: Check if a chat already exists
    const { data: existingChat, error: chatError } = await supabase
        .from("chats") // Replace with your actual chats table name
        .select("id")
        .or(`user1.eq.${myUserId},user2.eq.${myUserId}`)
        .or(`user1.eq.${otherUserId},user2.eq.${otherUserId}`)
        .maybeSingle(); // Expecting one or zero records

    if (chatError) {
        console.error("Error checking existing chat:", chatError);
        return { error: "Failed to check existing chats" };
    }

    if (existingChat) {
        return { chatId: existingChat.id, message: "Chat already exists" };
    }

    // Step 3: Create new chat
    const { data: newChat, error: createError } = await supabase
        .from("chats")
        .insert([{ user1: myUserId, user2: otherUserId }])
        .select()
        .single();

    if (createError) {
        console.error("Error creating chat:", createError);
        return { error: "Failed to create chat" };
    }

    return { chatId: newChat.id, message: "Chat created successfully" };
}


export async function getAllChats(userId) {
    const supabase =await createClient();
    const { data, error } = await supabase
    .from("chats") // Replace "chats" with your actual table name
    .select("*")
    .or(`user1.eq.${userId},user2.eq.${userId}`) // Fetch where user is user1 OR user2
    .order("created_at", { ascending: false });
    if (error) {
      console.error("Error fetching chats:", error);
      return null;
    }
  
    return data;
  }
export async function getChatDetails(userId: string, chatId: string) {
    const supabase =await createClient();
    // Fetch chat details
    const { data: chat, error: chatError } = await supabase
        .from("chats")
        .select("*")
        .eq("id", Number(chatId))
        .single();
    if (chatError) {
        console.error("Error fetching chat:", chatError);
        return null;
    }

    // Determine the other user's ID
    const otherUserId = chat.user1 === userId ? chat.user2 : chat.user1;
    // Fetch the other user's details
    const { data: otherUser, error: userError } = await supabase
        .from("users") // Replace "users" with your actual users table name
        .select("*") // Adjust fields as needed
        .eq("userId", otherUserId)
        .single();

    if (userError || !otherUser) {
        console.error("Error fetching user details:", userError);
        return { ...chat, otherUser: null };
    }

    // Return chat details with the other user's info
    return {
        ...chat,
        otherUser
    };
}


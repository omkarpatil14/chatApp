"use server";
import { createClient } from "@/utils/supabase/server";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();
  const response = await supabase.auth.signInWithPassword({ email, password });
  if (response.error) {
    return { success: false, message: response.error.message };
  }
  return { success: true, message: "Logged in successfully!" };
}

export async function signup({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const supabase = await createClient();
  const response = await supabase.auth.signUp({ email, password });

  if (response.error) {
    return { success: false, message: response.error.message };
  }

  const { error } = await supabase
    .from('users')
    .insert({
      userId: response.data.user!.id,
      firstName,
      lastName,
      email,
    });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Signed Up!" };
}



export async function getOtherUserInfo(user1: string, user2: string, currentUserId: string) {
  const supabase =await createClient();

  // Determine the other user's ID
  const otherUserId = currentUserId === user1 ? user2 : user1;

  // Fetch the other user's details
  const { data: user, error } = await supabase
      .from("users") // Replace with your actual users table name
      .select("id, firstName, lastName, email") // Select the fields you need
      .eq("userId", otherUserId)
      .single();
 
  console.log("user",user)
  if (error) {
      console.error("Error fetching user:", error);
      return null;
  }

  return user;
}


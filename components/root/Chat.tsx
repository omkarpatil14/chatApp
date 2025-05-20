"use client"
import { useEffect, useState } from "react";
import ChatElement from "./ChatElement"
import ChatSidebar from "./ChatSidebar"
import ChatsSection from "./ChatsSection"
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const Chat = () => {
  const [user, setUser] = useState<any>(null)
  const searchParams = useSearchParams(); // Get query parameters
  const chatId = searchParams.get("chatId");
  const router = useRouter()
  const supabase = createClient()


  useEffect(() => {
    toast("Click on new chat button to add new chat !",{
      duration:15000,
      closeButton:true,
      style:{
        fontSize:'15px'
      },
      position:"top-center"
    })
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) router.push('/sign-in')
      else setUser(data.user)
    }
    getUser()
  },[router])
  if (!user) return null; 
  return (
     <div className="flex w-full flex-1 overflow-hidden">
      <ChatsSection user={user}/>
      {chatId && <>
        <ChatElement chatId={chatId} user={user}/>
        <ChatSidebar />
      </>}
      {!chatId && <div className="flex">Open a chat to Message</div>}
    </div>
  )
}

export default Chat

import React, { useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import MessageBox from './MessageBox'
import { createClient } from '@/utils/supabase/client'
import getAllMessages from '@/utils/actions/message.actions'

const ChatElement = ({ chatId, user }) => {
  const [newMessage, setnewMessage] = useState('')
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true)
      const data = await getAllMessages(chatId)
      if (data) setMessages(data)
        setnewMessage('')
      setLoading(false)
    }
    getMessages()


    // Subscribe to real-time messages for this chat
    const supabase = createClient()
    const subscription = supabase
      .channel("messages")
      .on("postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMsg = payload.new;
          // Ensure message belongs to this chat and is from another user
          if (newMsg.chatId === chatId && newMsg.senderId !== user.id) {
            console.log("New message received:", newMsg);
            setMessages((prevMessages) => [...prevMessages, newMsg]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [chatId])

  return (
    <div className='flex flex-1 h-[93vh] flex-col justify-center overflow-x-hidden'>
      <ChatHeader chatId={chatId} user={user} />
      <ChatMessages loading={loading} user={user} chatId={chatId} messages={messages}/>
      <MessageBox chatId={chatId} user={user} setMessages={setMessages} newMessage={newMessage} setnewMessage={setnewMessage}/>
    </div>
  )
}

export default ChatElement

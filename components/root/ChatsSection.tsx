import React, { useEffect, useState } from 'react'
import ChatBox from './ChatBox'
import { createChat, getAllChats } from "@/utils/actions/chat.actions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const ChatsSection = ({ user }) => {
    const [chats, setchats] = useState<any>([])
    const [newChatEmail, setnewChatEmail] = useState<any>('')
    const router = useRouter()
    const handleonChange = (e)=>{
        setnewChatEmail(e.target.value)
    }
    useEffect(() => {
        const getChats = async () => {
            const data = await getAllChats(user.id)
            if (data) setchats(data)
        }
        getChats()
    }, [setchats, user.id])

    const handleonClick = async () => {
        toast("Please wait..")
        const myUserId = user.id
        const otherUserEmail = newChatEmail
        if (!myUserId || !otherUserEmail) {
            toast("Missing required data");
            return;
        }
    
        try {
            const response = await createChat(myUserId, otherUserEmail);
            if (response.error) {
                toast(response.error)
                console.log("Error:", response.error);
            } else {
                console.log("Chat created successfully:", response.chatId);
                // Optionally, navigate to the chat
                const updatedChats = await getAllChats(myUserId);
                setchats(updatedChats);
                router.push(`/?chatId=${response.chatId}`);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }finally{
            setnewChatEmail('')
        }
    };
    
    return (<div className=''>
        <div className=' flex !h-12 flex-shrink-0 items-center justify-between border-b border-gray-200 px-2 py-2 max-lg:px-4 '>
            <div className='relative flex h-full w-full flex-shrink-0 flex-col border-r bg-gray-50 lg:w-48'>
                <div className="relative" data-headlessui-state="">
                    <div id="headlessui-menu-button-:rd:" aria-haspopup="menu" aria-expanded="false" data-headlessui-state="" fdprocessedid="vumkkp" className=''>
                        <div className="flex w-full items-center ">
                            <button className="bg-white border-gray-200 text-gray-800 hover:bg-gray-100 shadow-sm disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100 border py-1.5 px-3 text-xs rounded transition flex w-40 items-center gap-x-1.5 !border-none !bg-transparent !px-1 !shadow-none" fdprocessedid="3betem"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 text-gray-600" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V10.5Z" clipRule="evenodd"></path></svg><div className="flex flex-col gap-y-0.5 text-xs13 font-semibold whitespace-nowrap text-gray-600">Inbox</div></button></div></div>

                </div>
            </div>
            <div className="flex items-center gap-x-2">
                <button className="bg-white border-gray-200 text-gray-800 hover:bg-gray-100 shadow-sm disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100 border py-1.5 px-3 text-xs rounded transition flex w-20 items-center justify-center gap-x-1 !shadow-none max-lg:w-auto max-lg:px-2" fdprocessedid="dgn53b">
                    <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z" fill="currentColor"></path></svg><span className="max-lg:hidden">Search</span>
                </button>
                <div className="relative rounded-md">
                    <div className="relative"><button className="bg-white border-gray-200 text-gray-800 hover:bg-gray-100 shadow-sm disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100 border py-1.5 px-3 text-xs rounded transition flex w-20 items-center justify-center gap-x-1 !shadow-none max-lg:w-auto max-lg:px-2" fdprocessedid="66ber8"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="h-4 w-4 shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"></path></svg><span className="max-lg:hidden">Filter</span></button></div>
                </div>
            </div>
        </div>
        <div className="periskope-scrollbar flex flex-col overflow-x-hidden  !overflow-y-scroll bg-white h-[100vh]">
            <div style={{
                width: "100%",
                height: "auto",
                top: "",
            }}>
                <div style={{
                    boxSizing: "border-box",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                    marginTop: "0px",
                }}
                >
                    <div className="">
                        {/* <ChatBox /> */}
                        {chats.map((chat) => {
                            return <ChatBox key={chat.id} chat={chat} user={user} />
                        })}

                    </div>
                </div>
            </div>
        </div>
        <div className="absolute bottom-4 left-[24vw] scale-125 lg:scale-100">
            <div className="relative" data-headlessui-state="">
                <AlertDialog>
                    <AlertDialogTrigger><div id="headlessui-menu-button-:r6m:"  aria-haspopup="menu" aria-expanded="false" data-headlessui-state="" fdprocessedid="l7rs5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-2xl transition-all hover:scale-105">
                            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12.007 19.98a9.869 9.869 0 0 1 -4.307 -.98l-4.7 1l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c1.992 1.7 2.93 4.04 2.747 6.34"></path><path d="M16 19h6"></path><path d="M19 16v6"></path>
                            </svg>
                        </div>
                    </div></AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Create Chat</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input value={newChatEmail} onChange={handleonChange} placeholder='Enter receiver email..'/>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleonClick}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>




    </div>
    )
}

export default ChatsSection

import { formUrlQuery } from '@/lib/utils'
import { getOtherUserInfo } from '@/utils/actions/user.actions';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ChatBox = ({ chat,user }) => {
    const [otherUser, setotherUser] = useState({})
    const searchParams = useSearchParams();
    const router = useRouter()
    const isActive = searchParams.get("chatId") === `${chat.id}`


    const handleClick = () => {
        if (!chat?.id) return;
        const url = formUrlQuery({
            params: searchParams.toString(),
            key: "chatId",
            value: chat.id
        })
        router.push(window.location.pathname + url)
    }
    useEffect(()=>{
        const fetch =async ()=>{
            const data =await getOtherUserInfo(chat.user1,chat.user2,user.id)
            if(data) setotherUser(data)
        }
    fetch()
    },[chat.user1, chat.user2, user.id])
    return (
        <div className={`group mb-0.5 flex shrink-0 items-start gap-x-2 rounded px-2 pb-1 pt-2 max-lg:mb-2 max-lg:px-4 cursor-pointer hover:bg-gray-200/50  bg-white ${isActive?"highlight":""}`} onClick={handleClick}>
            <div className="flex flex-col items-center justify-center gap-y-1 py-1">
                <figure className="flex h-10 w-10 items-center shrink-0 justify-center rounded-full border" style={{ backgroundColor: "rgb(209, 213, 219)" }}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" className="text-gray-50" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </figure>
            </div>
            <div className="flex flex-1 flex-col gap-y-0.5 overflow-hidden ">
                <div className="flex items-center gap-x-0.5">
                    <h4 className="line-clamp-2 flex-1 truncate text-ellipsis whitespace-normal text-[15px] font-semibold lg:text-xs13">{otherUser.firstName?otherUser.firstName:"Loading.."}</h4>
                </div>
            </div>

        </div>
    )
}

export default ChatBox

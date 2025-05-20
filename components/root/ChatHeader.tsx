import { getChatDetails } from '@/utils/actions/chat.actions'
import React, { useEffect, useState } from 'react'

const ChatHeader = ({ user, chatId }) => {
    const [data, setdata] = useState({ otherUser: { firstName: 'Loading..', email: '' } })
      const [loading, setLoading] = useState<any>(false);
    
    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const details = await getChatDetails(user.id, chatId)
            if (details) setdata(details)
                setLoading(false)
        }
        fetch()
    }, [chatId, user.id])
    return (
        <header className='flex !h-12  items-center justify-between gap-x-4 border-b border-gray-200 bg-white px-2 py-2'>
            <div className="flex max-w-3xl items-center gap-x-3 overflow-hidden">
                {/* figure */}
                <div className="flex flex-col items-center justify-center gap-y-1 py-1">
                    <figure className="flex h-10 w-10 items-center shrink-0 justify-center rounded-full border" style={{ backgroundColor: "rgb(209, 213, 219)" }}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" className="text-gray-50" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </figure>
                </div>
                <div className="flex w-full flex-col gap-y-1 truncate "><span className="flex items-center gap-x-2 text-[15px] font-bold text-gray-900 lg:text-sm ">{loading?"Loading..":data.otherUser.firstName}</span><div className="flex items-center gap-x-1 overflow-ellipsis text-xs leading-3 text-gray-400"><span className="max-lg:max-w-[80vw] max-lg:truncate">{loading?"Loading...":data.otherUser.email}</span></div></div>
            </div>
            <div className="hidden gap-2 lg:flex">
                <div className="flex items-center"><button className="bg-transparent border-transparent text-gray-800 hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed border py-1 px-2 text-xs rounded transition flex items-center justify-start min-w-max cursor-pointer "><div role="button" className="flex w-max text-xs"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 shrink-0 " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"></path></svg></div><div className="group/popperel invisible relative z-50 rounded-md border bg-white p-2 text-xs font-medium text-gray-600 opacity-0 shadow-lg data-[show=true]:visible data-[show=true]:opacity-100 max-md:hidden" style={{
                    position: "absolute",
                    inset: "0px 0px auto auto",
                    transform: "translate3d(-106.4px, 84.8px, 0px)"
                }}
                    data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-end">Summarize chat history with AI<span className="transition-[&quot;top 0.3s ease-in, bottom 0.3s ease-in, left 0.3s ease-in, right 0.3s ease-in&quot;] invisible absolute h-2 w-2 bg-inherit before:transition-[&quot;top 0.3s ease-in, bottom 0.3s ease-in, left 0.3s ease-in, right 0.3s ease-in&quot;] before:invisible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:shadow-lg before:content-[&quot;&quot;] group-data-[popper-placement^=top]/popperel:-bottom-1 group-data-[popper-placement^=top]/popperel:before:border-b group-data-[popper-placement^=top]/popperel:before:border-r group-data-[popper-placement^=right]/popperel:-left-1 group-data-[popper-placement^=right]/popperel:before:border-b group-data-[popper-placement^=right]/popperel:before:border-l group-data-[popper-placement^=bottom]/popperel:-top-1 group-data-[popper-placement^=bottom]/popperel:before:border-l group-data-[popper-placement^=bottom]/popperel:before:border-t group-data-[popper-placement^=left]/popperel:-right-1 group-data-[popper-placement^=left]/popperel:before:border-r group-data-[popper-placement^=left]/popperel:before:border-t group-data-[show=true]/popperel:before:visible" style={{
                        position: "absolute",
                        left: 0,
                        transform: "translate3d(182.4px, 0px, 0px)"
                    }}
                    ></span></div></button><button className="bg-transparent border-transparent text-gray-800 hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed border py-1 px-2 text-xs rounded transition"><svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg></button></div>
            </div>
        </header>
    )
}

export default ChatHeader

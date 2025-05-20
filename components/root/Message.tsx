import React from 'react'

const Message = ({type,message}) => {
  return <>
  {type =="other"?<>
    <div className="relative block">
        <div className="group/message-row flex w-full gap-x-2 px-4 pb-1 transition-all duration-300 bg-transparent">
        <div className="relative flex h-full min-w-[128px] max-w-md flex-col gap-y-0.5 rounded-lg px-2.5 pb-1 pt-2 shadow bg-white ">
            <div className="whitespace-pre-wrap break-words text-sm lg:text-xs13">
                <span className="">{message.content}</span>
            </div>
        </div>
        </div>
    </div>
  </>:<>
  <div className="relative block">
    <div className="group/message-row flex w-full gap-x-2 px-4 pb-1 transition-all duration-300 flex-row-reverse pt-2 bg-transparent">
    <div className="relative flex h-full min-w-[128px] max-w-md flex-col gap-y-0.5 rounded-lg px-2.5 pb-1 pt-2 shadow bg-[#E2FFD4] rounded-tr-none">
            <div className="whitespace-pre-wrap break-words text-sm lg:text-xs13">
                <span className="">{message.content}</span>
            </div>
    </div>
    </div>
  </div>
  </>}
  </>
}

export default Message

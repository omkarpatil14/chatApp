import React from 'react'
import Message from './Message';

const ChatMessages = ({ loading, user, chatId, messages }) => {
    const safeMessages = Array.isArray(messages) ? messages : [];

    return (
        <div className='chat relative flex h-full w-full flex-1 flex-col !overflow-x-hidden '>
            {loading && <div className='text-center'>Loading..........</div>}
            {!loading && (
                <div className="">
                    {safeMessages.map((message) => {
                        if (!message || !user?.id) return null;
                        return (
                            <Message
                                key={message.id}
                                message={message}
                                type={message.senderId === user.id ? "me" : "other"}
                            />
                        );
                    })}
                </div>
            )}
            <div><div className="h-6"></div></div>
        </div>
    );
};


export default ChatMessages

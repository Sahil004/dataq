import React, { useEffect, useState } from 'react'
import SendIcon from './icons/SendIcon'

function Chat() {
    const [currMessage, setCurrMessage] = useState('')
    const [chat, setChat] = useState([
        {
            date: '23-07-2023',
            messages: [
                {
                    user: 'someuser',
                    img: '/assets/other-user.png',
                    message: ['some question']
                },
                {
                    user: 'me',
                    img: '/assets/user.png',
                    message: ['yeah']
                }
            ]
        },
        {
            date: 'today',
            messages: [
                {
                    user: 'someuser',
                    img: '/assets/other-user.png',
                    message: ['some other important question']
                },
                {
                    user: 'me',
                    img: '/assets/user.png',
                    message: ['reply']
                }
            ]
        },

    ])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Check if the Enter key is pressed (keyCode 13) and not holding Shift (event.shiftKey is false)
        if (event.keyCode === 13 && !event.shiftKey) {
          event.preventDefault(); // Prevent default behavior (adding a newline)
          sendMessage();
        }
      };
    
    const sendMessage = () => {
        let temp = [...chat]
        temp[1].messages[1].message.push(currMessage)
        setChat(temp)
        setCurrMessage('')
    }

    const resetScroll = () => {
        let objDiv = document.getElementById("chat-wrap");
        if (objDiv) {
            objDiv.scrollTop = objDiv.scrollHeight + 200;
        }
    }

    useEffect(() => {
        resetScroll()
    }, [chat])
    

    return (
        <div className='flex flex-1 flex-col'>
            {/* <div className='flex h-14 bg-white px-3 fixed top-[70x] right-0 w-[418px]'>
                
            </div> */}
            <div className='w-full flex flex-1 bg-[#F6F8FC] flex-col justify-end px-3 pb-[70px] pt-[126px]'>
                {
                    React.Children.toArray(
                        chat.map((res) => (
                            <div className='m-3'>
                                <div className='text-center text-xs text-[#838282] mb-5'>{res.date}</div>
                                <div>
                                    {
                                        React.Children.toArray(
                                            res.messages.map((item) => {
                                                const isMe = item.user === 'me'
                                                return (
                                                    <div className={`flex flex-1 ${isMe ? ' items-end': ' flex-row-reverse'}`}>
                                                        <div className={`${isMe? ' items-end': ''} flex flex-col flex-1`}>
                                                            {
                                                                React.Children.toArray(
                                                                    item.message.map((message) => {
                                                                        return (
                                                                            <div className={`max-w-[80%] bg-white p-3 ${isMe ? 'rounded-t-xl rounded-bl-xl': 'rounded-b-xl rounded-tr-xl'} mb-5`}>
                                                                                {message}
                                                                            </div>
                                                                        )
                                                                    })
                                                                )
                                                            }
                                                        </div>
                                                        <div className={`${isMe? 'ml-2.5': 'mr-2.5'}`}>
                                                            <div className={`w-9 h-9 rounded-full`} style={{ background: `url(${item.img})`, backgroundSize: 'cover' }}>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
            <div className='fixed w-full max-w-[418px] flex items-center px-3 min-h-[70px] bg-white bottom-0 right-0'>
                <textarea placeholder='type text here...' value={currMessage} onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setCurrMessage(e.target.value)} className="w-full text-xs text-[#535353] focus:outline-none mr-3 cursor-pointer" />
                <span className='cursor-pointer' onClick={() => sendMessage()}><SendIcon /></span>
            </div>
        </div>
    )
}

export default Chat
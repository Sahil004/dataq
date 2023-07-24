import React from 'react'

type PopupWrapProps = {
    children: React.ReactNode
    callBack: CallBackForPopup
    show: boolean
}

type CallBackForPopup = (show: boolean) => void

function PopupWrap(props: PopupWrapProps) {
    return (
        <>
            {
                props.show 
                    ? <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/70 p-2.5 z-50' onClick={e => props.callBack(false)}>
                        {props.children}
                    </div>

                    : <></>
            }
        </>
    )
}

export default PopupWrap
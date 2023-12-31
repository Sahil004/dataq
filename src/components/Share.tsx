import React, { lazy, startTransition, useState } from 'react'
import Button from './Button'
import ProfilePic from './ProfilePic'
import { userProfileData } from '../utils/static';
// import SharePopup from './Popups/SharePopup'

const SharePopup = lazy(() => import("./Popups/SharePopup"));


function Share() {
    const [fetch, setFetch] = useState(false)

    return (
        <div className='flex'>
            {
                React.Children.toArray(
                    userProfileData.map((res) => (
                        <div className='mr-6'>
                            <ProfilePic src={res.url} active={res.active} />
                        </div>
                    ))
                )
            }
            <Button style={{ padding: '5px 24px', fontSize: '16px' }} onClick={() => startTransition(() => {setFetch(true)})}>
                Share
            </Button>
            {fetch && <SharePopup show={fetch} setShow={setFetch}  />}
        </div>
    )
}

export default React.memo(Share)
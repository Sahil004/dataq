import React from 'react'

type ProfilePicProps = {
    src: string
    active?: boolean
}  

function ProfilePic(props: ProfilePicProps) {
    return (
        <div><img className={`w-10 ${props.active? 'border-2 rounded border-[#0A82AC]': ''}`} src={props.src} alt='user' /></div>
    )
}

export default ProfilePic
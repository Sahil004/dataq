import React, { useEffect, useState } from 'react'
import DoubleArrowSelect from './icons/DoubleArrowSelect'
import DashboardIcon from './icons/DashboardIcon'
import SettingsIcon from './icons/SettingsIcon'
import Search from './Search'
import Share from './Share'
import ProfilePic from './ProfilePic'
import Chat from './Chat'
import LeftNav from './LeftNav'
import MenuIcon from './icons/MenuIcon'
import SendIcon from './icons/SendIcon'
import SearchIcon from './icons/SearchIcon'

type LayoutProps = {
    children: React.ReactNode
}

type MobileToggle = 'leftnav' | 'chat' | ''

function Layout({
    children
}: LayoutProps) {
    const [show, setshow] = useState<MobileToggle>('')
    
  return (
    <div className='min-h-[100%] flex flex-1'>
        <div className='left-nav hidden lg:flex w-full max-w-[350px] lg:border-r-2 border-r-line-grey'>
            <LeftNav />
        </div>
        <div className='center-and-right-content flex-1 flex-col'>
            <div className='top-nav h-[70px] flex lg:border-b-2 border-b-line-grey'>
                <div className='px-14 hidden lg:flex w-full flex-1 justify-between items-center'>
                    <Search />
                    <Share />
                </div>
                <div className='flex justify-between items-center lg:hidden py-2.5 bg-white px-4 w-full'>
                    <div className='max-w-[100px]' onClick={() => setshow('leftnav')}><MenuIcon /></div>
                    <img className='w-[100px]' src={'/dataQ-2.svg'} alt='logo' />
                    <div className='flex'>
                        <div className='mr-2'><Search /></div>
                        <div className='mr-2' onClick={() => setshow('chat')}><SendIcon width={25} height={25} /></div>
                    </div>
                </div>
            </div>
            <div className='editor-and-chat flex flex-1'>
                <div className='editor flex flex-1' style={{
                    ...(window.innerWidth > 800? {
                    maxWidth: (window.innerWidth - (770)) + 'px'
                    }: {})
                }}>
                    {children}
                </div>
                <div id='chat-wrap' className='chat w-full hidden lg:flex max-w-[420px] lg:border-l-2 border-l-line-grey overflow-y-auto' style={{
                    height: `${window.innerHeight - 70}px`
                }}>
                    <Chat />
                </div>
            </div>
        </div>
        {show && <div className='fixed block lg:hidden top-0 left-0 w-full bg-black/70 h-full z-50 pt-[70px]' onClick={(e) => {
            e.stopPropagation()
            setshow('')
        }}>
            <style>
                {`
                    body {
                        overflow: hidden
                    }
                `}
            </style>
            <div className='bg-white h-full flex' onClick={(e) => e.stopPropagation()}>
                {show === 'leftnav' && <LeftNav />}
                {show === 'chat' && <div id='chat-wrap-1' className=' overflow-y-auto' style={{
                    height: `${window.innerHeight - 70}px`
                }}><Chat /></div>}
            </div>
        </div>}
    </div>
  )
}

export default Layout
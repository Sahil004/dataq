import React, { useState } from 'react'
import DoubleArrowSelect from './icons/DoubleArrowSelect'
import DashboardIcon from './icons/DashboardIcon'
import SettingsIcon from './icons/SettingsIcon'
import Search from './Search'
import Share from './Share'
import ProfilePic from './ProfilePic'
import Chat from './Chat'

type LayoutProps = {
    children: React.ReactNode
}

const dataSources = ['Atlan Dev', 'Atlan Prod']

function Layout({
    children
}: LayoutProps) {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(dataSources[0])
  return (
    <div className='min-h-[100%] flex flex-1'>
        <div className='left-nav hidden lg:flex flex-col p-8 justify-between items-start w-full max-w-[350px] lg:border-r-2 border-r-line-grey text-2xl'>
            <div className='flex flex-1 flex-col w-full'>
                <img className='w-[141px] mb-11' src={'/dataQ-2.svg'} alt='logo' />
                <div className='flex relative justify-between h-20 border-2 rounded-lg bg-white px-2.5 py-1.5 border-line-grey items-center mb-12 cursor-pointer' onClick={() => {
                    setIsSelectOpen(!isSelectOpen);
                }}>
                    <div className='flex items-center'>
                        <div className='bg-[#F7F7F7] w-14 h-14 rounded-lg px-2.5 flex justify-center items-center'>
                            <img className=' max-w-full' src='/assets/atlan.png' alt='atlan' />
                        </div>
                        <div className='ml-4'>
                            {selectedTab}
                        </div>
                    </div>
                    <div className='mr-3'><DoubleArrowSelect /></div>
                    <div className='absolute left-0 bottom-1 pa'>
                        {isSelectOpen && <select value={selectedTab} onChange={(e) => setSelectedTab(e.target.value)} size={isSelectOpen ? dataSources.length : 1}>
                            {
                                React.Children.toArray(
                                    dataSources.map(res => <option value={res}>{res}</option>)
                                )
                            }
                        </select>}
                    </div>
                </div>
                {
                    [{
                        icon: <DashboardIcon />,
                        text: 'Dashboard',
                        active: true
                    },{
                        icon: <SettingsIcon />,
                        text: 'Settings'
                    }].map((res) => (
                        <div className='flex items-center mb-7 cursor-pointer'>
                            {res.icon}
                            <div className='ml-5 text-2xl'>{res.text}</div>
                        </div>
                    ))
                }
            </div>
            <div className='flex w-full items-center cursor-pointer'>
                <ProfilePic src='/assets/user.png' />
                <div className='ml-5'>
                    <div className='text-lg flex'>Sahil Singh</div>
                    <div className='text-sm text-[#535353]'>sahilkrsingh004@gmail.com</div>
                </div>
            </div>
        </div>
        <div className='center-and-right-content flex-1 flex-col'>
            <div className='top-nav h-[70px] flex lg:border-b-2 border-b-line-grey'>
                <div className='px-14 hidden lg:flex w-full flex-1 justify-between items-center'>
                    <Search />
                    <Share />
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
    </div>
  )
}

export default Layout
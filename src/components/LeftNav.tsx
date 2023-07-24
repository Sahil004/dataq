import React, { useState } from 'react'
import ProfilePic from './ProfilePic';
import DashboardIcon from './icons/DashboardIcon';
import DoubleArrowSelect from './icons/DoubleArrowSelect';
import SettingsIcon from './icons/SettingsIcon';
import { dataSources, logoPath, userProfileData } from '../utils/static';

function LeftNav() {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(dataSources[0])
    
  return (
    <>
        <div className='flex flex-1 flex-col p-8 justify-between items-start w-full max-w-[350px] text-2xl'>
            <div className='flex flex-1 flex-col w-full'>
                <img className='w-[141px] mb-11' src={logoPath} alt='logo' />
                <div className='flex relative justify-between h-20 border-2 rounded-lg bg-white px-2.5 py-1.5 border-line-grey items-center mb-12 cursor-pointer' onClick={() => setIsSelectOpen(!isSelectOpen)}>
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
                    React.Children.toArray(
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
                    )
                }
            </div>
            <div className='flex w-full items-center cursor-pointer'>
                <ProfilePic src={userProfileData[0].url} />
                <div className='ml-5'>
                    <div className='text-lg flex'>Sahil Singh</div>
                    <div className='text-sm text-[#535353]'>sahilkrsingh004@gmail.com</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default LeftNav
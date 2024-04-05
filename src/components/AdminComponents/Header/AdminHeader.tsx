import Logo from '../../../assets/icon/Logo.svg'
import Elysia from '../../../assets/img/elysia.jpg'
import GridIcon from '../../../assets/icon/grid-outline.svg'
import NotificationIcon from '../../../assets/icon/bell-outline.svg'
import React from 'react'

interface AdminHeaderProps{
    className?: string
}

const AdminHeader: React.FC<AdminHeaderProps> = ({className}) => {
    return (
        <div className={` ${className} flex flex-col px-4 justify-center align-middle border-1 border-solid border-gray-200 bg-white`}>
            <div id='navBar' className='flex py-4 justify-between items-center self-stretch'>
                <div id='logo_role' className='flex items-center gap-[4.25rem]'>
                    <div id='logo' className='flex items-center gap-[1.5rem]'>
                        <img src={Logo} width={138} height={36}></img>
                        <span className='text-2xl font-semibold text-secondary'>Admin</span>
                    </div>
                </div>
                <div id='cta' className='flex items-center gap-4'>
                    <div id='user-button' className='flex justify-center items-center gap-2 py-5]'>
                        <img className='rounded-full' src={Elysia} width={36} height={36} ></img>
                        <span className='text-sm font-medium'>Elysia</span>
                    </div>
                    <div id='grid-btn-container' className='flex px-[1.25rem]'>
                    <img src={GridIcon} width={20} height={20}></img>
                    </div>
                    <div id='grid-btn-container' className='flex px-1'>
                    <img src={NotificationIcon} width={24} height={24}></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHeader
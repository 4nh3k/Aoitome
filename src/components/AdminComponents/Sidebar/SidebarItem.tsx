import React from 'react'

interface SidebarItemProps {
    imageSrc?: string;
    label: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ imageSrc, label }) => {
    return (
        <div className='flex flex-1 gap-3 items-stretch sidebar-hover'>
            {imageSrc && <img src={imageSrc} width={24} height={24}></img>}
            {label}
        </div>
    )
}

export default SidebarItem
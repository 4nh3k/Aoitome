import React, { useState } from 'react'
import ChevronUp from '../../../assets/icon/chevron-up-outline.svg'
import SidebarItem from './SidebarItem';

interface SidebarCollapseProps {
    imageSrc?: string;
    label: string;
    items: string[];
}

const SidebarCollapse: React.FC<SidebarCollapseProps> = ({ imageSrc, label, items }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [rotation, setRotation] = useState(0);
    const duration = 700; // ms
    const delay = 350; // ms
    const animStr = (i) => `fadeIn-${duration}-${delay * i}`;

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
        if (rotation == 180) setRotation(0);
        else setRotation(180);
    };
    return (
        <div className='flex flex-col items-start'>
            <div className='flex flex-1 gap-3 items-center'>
                {imageSrc && <img src={imageSrc} width={24} height={24}></img>}
                {label}
                <img className={`align-middle rotate-${rotation} transition ease-in-out duration-700`} src={ChevronUp} width={16} height={16} onClick={toggleCollapse} ></img>
            </div>
            <div className={`mt-1 flex flex-col gap-3 sidebar-content ml-[2.25rem] ${collapsed ? 'collapsed' : ''}`}>
                    {items.map((item, i) => (
                        <SidebarItem key={i} label={item}></SidebarItem>
                    ))}
            </div>
        </div>

    )
}

export default SidebarCollapse
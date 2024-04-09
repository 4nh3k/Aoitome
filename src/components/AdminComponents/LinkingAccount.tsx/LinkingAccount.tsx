import { ToggleSwitch } from 'flowbite-react';
import React, { useState } from 'react'

interface LinkingAccountProps {
  logo: string;
}

const LinkingAccount: React.FC<LinkingAccountProps> = ({logo}) => {
  const [linkingOn, setLinkingOn] = useState<boolean>(false);

  return (
    <div className='flex py-4 px-3 flex-col items-start gap-2 self-stretch rounded-md border-1 border-solid  border-gray-300 bg-white'>
      <div className='flex items-start basis-full self-stretch justify-between'>
        <img src={logo} width={60} height={30} />
        <ToggleSwitch checked={linkingOn} onChange={function (): void {
          setLinkingOn(!linkingOn);
        } } />
        
      </div>
      <span className='text-sm font-medium leading-4 text-gray-500'>Integrate your knowledge base and customer success seamlessly with your apps</span>
    </div>
  )
}
      
export default LinkingAccount
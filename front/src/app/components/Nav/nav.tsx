"use client"

import { useRouter } from 'next/navigation';

const Nav = () => {
    const router = useRouter();
    
    
  return (
    <div>
       <nav className="bg-black w-full h-10 text-white flex justify-between p-8  items-center font-bold">
          <p className="ml-5">PAULOCRM</p>
          <p onClick={()=> router.push('/')} className="cursor-pointer">HOME</p>
        </nav>
    </div>
  )
};

export default Nav;

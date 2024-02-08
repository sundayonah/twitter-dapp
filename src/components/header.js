import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

import ConnectButton from './connectButton';
// import { MinningContext } from '@/Context/MinnigContext';
// import logo from '../../yolva.png';

const Header = () => {
   // const { connectWallet, connect } = useContext(MinningContext);

   const router = useRouter();

   const navMenu = [
      { name: 'Invest', url: '/' },
      { name: 'Referral', url: '/referalMenu' },
   ];

   return (
      <main className="w-full flex justify-between  items-center fixed top-0  bg-opacity-10 backdrop-blur-md shadow-lg h-16 z-20">
         <div className="flex w-full p-4 justify-between items-center  shadow-custom">
            <div className=" pr-2">
               <img src="https://imgs.search.brave.com/JSCTdx5RmCcveSa-5gF69eVlcSf-4pr9WuYI_fLZqlE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY5MDY0Mzc3/N3R3aXR0ZXIteCUy/MGxvZ28tcG5nLXdo/aXRlLnBuZw" alt="logo-image" className="h-8 w-8" />
            </div>
            <div className="flex space-x-5 justify-center items-center">
               <div className="">
                  <w3m-button />
               </div>
            </div>
            <style jsx>{`
               .active-link {
                  color: #bf9221;
               }
            `}</style>
         </div>
      </main>
   );
};

export default Header;

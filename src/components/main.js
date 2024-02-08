import React, { useContext, useState } from 'react';
import { TwitterDappContext } from '@/Context/TwitterDappContext';
import toast, { Toaster } from 'react-hot-toast';
import { useAccount } from 'wagmi';
import { Loading } from './Loading';

const MainPage = () => {
   const {
 getAllTweets
   } = useContext(TwitterDappContext);

   const { ethAddress } = useAccount();


   
   function shortenAddress(ethAddress) {
    // Check if the ethAddress is valid
   //  if (!isValidAddress(ethAddress)) {
   //      return "Invalid Ethereum ethAddress";
   //  }

    // Extract the first and last few characters of the ethAddress
    const firstPart = ethAddress.substring(0, 6);
    const lastPart = ethAddress.substring(ethAddress.length - 4);

    // Concatenate the first and last parts with ellipsis in between
    const shortenedAddress = `${firstPart}...${lastPart}`;

    return shortenedAddress;
}




   return (
      <main className="grid grid-cols-1 lg:grid-cols-1 gap-6 w-[80%] md:w-[75%] lg:w-[75%] m-auto my-10 border-solid border-2 border-gray-800">
         <Toaster />
       {/* <h1>Twitter Dapp</h1> */}
       <div className='flex mt-2 flex flex-col'>
         {/* AVATAR LEFT SIDE */}

            {/* MAIN CONTENT RIGHT SIDE */}
                     {getAllTweets.map((tweet)=>(

         <div key={tweet.id} className='w-full flex bg-transparent p-2 border-b mb-2'>
         <div className='mx-2'>
            <img src="https://imgs.search.brave.com/JSCTdx5RmCcveSa-5gF69eVlcSf-4pr9WuYI_fLZqlE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY5MDY0Mzc3/N3R3aXR0ZXIteCUy/MGxvZ28tcG5nLXdo/aXRlLnBuZw" alt="logo-image" className="h-8 w-8 rounded-full p-1 bg-gray-700" />
         </div>
         <div>

          <span className='text-gray-400'>{shortenAddress(tweet.author)}</span>

            <p className='text-sm'>{tweet.content}</p>
            <div className='mt-2'>
               <img src='/blog17.jpg' className='rounded-xl' />
            </div>
            <div className='mt-2'>

            <spn><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
</spn>
            </div>
         </div>
         </div>

))}
       </div>
   
      </main>
   );
};

export default MainPage;
//
// loading

{
   /* <div class="flex items-center justify-center">
   <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
</div>; */
}

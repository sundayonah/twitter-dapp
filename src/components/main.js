import React, { useContext, useState } from 'react';
import { TwitterDappContext } from '@/Context/TwitterDappContext';
import toast, { Toaster } from 'react-hot-toast';
import { useAccount } from 'wagmi';
import { Loading } from './Loading';

const MainPage = () => {
   const {
 getAllTweets
   } = useContext(TwitterDappContext);

   const { address } = useAccount();



   return (
      <main className="grid grid-cols-1 lg:grid-cols-1 gap-6 w-[80%] md:w-[75%] lg:w-[75%] m-auto my-10 border-solid border-2 border-gray-800">
         <Toaster />
       {/* <h1>Twitter Dapp</h1> */}
       <div className='flex mt-2'>
         {/* AVATAR LEFT SIDE */}
         <div className='mx-2'>
            <img src="https://imgs.search.brave.com/JSCTdx5RmCcveSa-5gF69eVlcSf-4pr9WuYI_fLZqlE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mcmVl/bG9nb3BuZy5jb20v/aW1hZ2VzL2FsbF9p/bWcvMTY5MDY0Mzc3/N3R3aXR0ZXIteCUy/MGxvZ28tcG5nLXdo/aXRlLnBuZw" alt="logo-image" className="h-8 w-8 rounded-full p-1 bg-gray-700" />
         </div>

            {/* MAIN CONTENT RIGHT SIDE */}
                     {getAllTweets.map((tweet)=>(

         <div key={tweet.id} className='w-full flex flex-col bg-transparent p-2'>
                       <span>{tweet.author}</span>

            <p>{tweet.content}</p>
            <div className='mt-2'>
               <img src='/blog17.jpg' className='rounded-xl' />
            </div>
            <spn>Like</spn>
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

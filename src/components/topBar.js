import { TwitterDappContext } from '@/Context/TwitterDappContext';
import React, { useContext } from 'react';
import { Loading } from './Loading';
import { Toaster } from 'react-hot-toast';

const TopBar = () => {
   const { content, handleContent, CreateTweet, contentLoading } =
      useContext(TwitterDappContext);
   return (
      <div className="max-w-6xl mx-auto w-[70%]  mt-28 z-0">
         <Toaster />

         <div className="">
            <h1 className="flex justify-center text-lg ">Twitter DApp</h1>
            <span className="text-sm text-gray-500">
               {/* Stake ANC and ANC while Staking */}
            </span>
            <div className="flex max-w-2xl justify-between items-start border-b m-3 py-4 px-4 rounded-md">
               <input
                  value={content}
                  onChange={handleContent}
                  placeholder="What is happening?!"
                  className="bg-transparent border-none focus-none py-4 px-16  outline-none"
               />
            </div>
            <div className="flex justify-end mb-3">
               <button
                  onClick={CreateTweet}
                  className="py-1 px-3 rounded-xl bg-blue-500"
               >
                  {contentLoading ? <Loading /> : 'Post'}
               </button>
            </div>
         </div>
      </div>
   );
};

export default TopBar;

import { TwitterDappContext } from '@/Context/TwitterDappContext';
import { useContext } from 'react';
import { Loading } from './Loading';
import { Toaster } from 'react-hot-toast';

export const UserProfile = () => {
   const {
      setDisplayName,
      setBio,
      displayName,
      bio,
      SetProfile,
      userLoading,
      error,
   } = useContext(TwitterDappContext);

   const handleDisplay = async (e) => {
      setDisplayName(e.target.value);
   };

   const handleBio = async (e) => {
      setBio(e.target.value);
   };

   return (
      <>
         <div className="max-w-2xl mx-auto sm:w-[80%] lg:w-[60%] xl:w-[50%] mt-52 px-4">
            <Toaster />
            <h1 className="text-center text-2xl mb-4">Twitter DApp</h1>

            <div className="flex flex-col justify-center items-center border border-gray-700 rounded-md shadow-2xl px-8 py-6">
               <h2 className="text-2xl text-blue-500 mb-4">
                  Create Your Profile
               </h2>
               <p className="text-red-500">{error}</p>

               <div className="my-4 w-full">
                  <div className="mb-4">
                     <label htmlFor="displayName">Username</label>
                     <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={handleDisplay}
                        className="bg-gray-800/90 border-none rounded-md py-2 pl-2 outline-none w-full"
                     />
                  </div>
                  <div className="mb-4">
                     <label htmlFor="bio">Bio</label>
                     <textarea
                        id="bio"
                        value={bio}
                        onChange={handleBio}
                        className="bg-gray-800/90 border-none rounded-md py-2 pl-2 outline-none w-full resize-none"
                        rows={2}
                     ></textarea>
                  </div>
               </div>
               <button
                  className="py-2 px-8 rounded-md bg-blue-500 text-white mb-4 shadow-2xl"
                  onClick={() => SetProfile()}
               >
                  {userLoading ? <Loading /> : 'Set Profile'}
               </button>
            </div>
         </div>
      </>
   );
};

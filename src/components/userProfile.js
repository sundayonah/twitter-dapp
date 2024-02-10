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
         <div className="max-w-2xl mx-auto lg:w-[35%] w-[60%] 2xl:[20%]  mt-52">
            <Toaster />
            <h1 className="flex justify-center text-2xl mb-4 ">Twitter DApp</h1>

            <div className="flex flex-col justify-center items-center border border-gray-700 rounded-md shadow-2xl">
               <h2 className="mt-4 text-2xl text-blue-500">
                  Create Your Profile
               </h2>
               <p className="text-red-500">{error}</p>

               <div className=" my-5">
                  <div>
                     <label>UserName</label> <br />
                     <input
                        type="text"
                        // placeholder="Display Name"
                        value={displayName}
                        onChange={handleDisplay}
                        className="bg-gray-800/90 border-none rounded-md focus-none py-2 pr-28 pl-6 outline-none"
                     />
                  </div>
                  <div>
                     <br />
                     <label>Bio</label> <br />
                     <input
                        type="text"
                        // placeholder="Bio"
                        value={bio}
                        onChange={handleBio}
                        className="bg-gray-800/90 border-none rounded-md focus-none py-2 pr-28 pl-6  outline-none"
                     />
                  </div>
               </div>
               <button
                  className="flex py-1 px-16 rounded-md bg-blue-500 mb-4 shadow-2xl"
                  onClick={() => SetProfile()}
               >
                  {userLoading ? <Loading /> : 'Set Profile'}
               </button>

               {/*<h2>Get Profile</h2>
                  <input type="text" placeholder="User Address" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
                  <button onClick={getProfile}>Get Profile</button> */}

               {/* {userProfile && (
                  <div>
                  <h3>User Profile</h3>
                  <p>Display Name: {userProfile.displayName}</p>
                  <p>Bio: {userProfile.bio}</p>
                  </div>
                )} */}
            </div>
         </div>
      </>
   );
};

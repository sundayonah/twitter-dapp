import Image from 'next/image';
import MainPage from '@/components/main';
import Header from '@/components/header';
import TopBar from '@/components/topBar';
import { UserProfile } from '@/components/userProfile';
import { useContext } from 'react';
import { TwitterDappContext } from '@/Context/TwitterDappContext';

export default function Home() {
   const { isRegistered } = useContext(TwitterDappContext);
   return (
      <div>
         <Header />
         {!isRegistered ? (
            <UserProfile />
         ) : (
            <>
               <TopBar />
               <MainPage />
            </>
         )}
      </div>
   );
}

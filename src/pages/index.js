import Image from 'next/image';
import MainPage from '@/components/main';
import Header from '@/components/header';
import TopBar from '@/components/topBar';
import { UserProfile } from '@/components/userProfile';

export default function Home() {
   const profile = true;
   return (
      <div>
         <Header />
         {profile ? (
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

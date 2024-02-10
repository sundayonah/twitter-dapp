import React, { useState, useEffect, useContext, createContext } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useWeb3Modal, useWeb3ModalTheme } from '@web3modal/wagmi/react';
import { ethers } from 'ethers';
import twitterDappAbi from '@/Contract/twitterDappAbi.json';
import approveAbi from '@/Contract/approve.json';
import toast, { Toaster } from 'react-hot-toast';

// import axios from 'axios';

export const TwitterDappContext = createContext({});

export const TwitterDappContextProvider = ({ children }) => {
   // testnet
   const TwitterDappContractAddress =
      '0xdd1e775ce676983851681178AF821f6A6fBc0e0e';

   const { address, isConnected } = useAccount();
   const { connect } = useConnect({
      connector: new InjectedConnector(),
   });
   const { disconnect } = useDisconnect();

   /// state variables
   const [getAllTweets, setGetAllTweets] = useState([]);
   const [content, setContent] = useState();
   const [contentLoading, setContentLoading] = useState(false);
   const [events, setEvents] = useState([]);
   const [displayName, setDisplayName] = useState('');
   const [bio, setBio] = useState('');
   const [userLoading, setUserLoading] = useState(false);
   const [error, setError] = useState('');

   const [userProfile, setUserProfile] = useState(null);

   const handleContent = async (e) => {
      setContent(e.target.value);
   };

   // async function getContract() {
   //    try {
   //       const provider = new ethers.providers.Web3Provider(window.ethereum);
   //       const signer = provider.getSigner();

   //       const contractInstance = new ethers.Contract(
   //          TwitterDappContractAddress,
   //          twitterDappAbi,
   //          signer
   //       );

   //       return contractInstance;
   //    } catch (error) {
   //       console.error('Error getting approval contract:', error);
   //       throw error;
   //    }
   // }

   useEffect(() => {
      const viewFunction = async () => {
         try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contractInstance = new ethers.Contract(
               TwitterDappContractAddress,
               twitterDappAbi,
               signer
            );
            const getMaxTweet = await contractInstance.MAX_TWEET();
            console.log(getMaxTweet.toString());
            const getAllTweets = await contractInstance.getAllTweets();
            const tweets = await contractInstance.tweets(address, 1);
            console.log(tweets.toString());
            console.log(getAllTweets);
            setGetAllTweets(getAllTweets);
            // const getId = getAllTweets[2]
            // console.log(getId.toString())
         } catch (error) {
            console.error(error);
         }
      };
      viewFunction();
   }, []);

   const likeTweet = async (id) => {
      try {
         const provider = new ethers.providers.Web3Provider(window.ethereum);
         const signer = provider.getSigner();

         const contract = new ethers.Contract(
            TwitterDappContractAddress,
            twitterDappAbi,
            signer
         );

         const tx = await contract.likeTweet(address, id);
         console.log(tx);

         await tx.wait();

         // Update UI or perform other actions
      } catch (error) {
         console.error('Error liking tweet:', error);
         // Handle error
      }
   };

   ///// CreaTetweet F(x) ///////////
   const CreateTweet = async () => {
      console.log('hello create content');
      setContentLoading(true);
      try {
         // const contract = await getContract();

         const provider = new ethers.providers.Web3Provider(window.ethereum);
         const signer = provider.getSigner();

         const contract = new ethers.Contract(
            TwitterDappContractAddress,
            twitterDappAbi,
            signer
         );

         if (address === undefined) {
            toast.success(`Please Connect Your Wallet.`, {
               duration: 4000,
               position: 'top-right',
               icon: '❌',
               style: {
                  color: '#fff',
                  background: `linear-gradient(to right, #000f58, #000624)`,
               },
            });
            return;
         }

         const tx = await contract.createTweet(content, {
            gasLimit: 300000,
            gasPrice: ethers.utils.parseUnits('15.0', 'gwei'),
         });

         setContent('');

         const receipt = await tx.wait();

         //   check if the transaction was successful
         if (receipt.status === 1) {
            setContentLoading(true);

            toast.success(`Tweet Created`, {
               duration: 4000,
               position: 'top-right',
               icon: '✅',
               style: {
                  color: '#fff',
                  background: `linear-gradient(to right, #000f58, #000624)`,
               },
            });
            window.location.reload();
         } else {
            console.log('error');
            setContentLoading(false);
         }
      } catch (err) {
         console.error('Error while creating tweet:', err.message);

         // error();
         // setStatus('error');
      }
      setContentLoading(false);
   };

   // Set userProfile function
   const SetProfile = async () => {
      if (!displayName || !bio) {
         setError('Display name and bio cannot be empty.');
         setTimeout(() => {
            setError('');
         }, 3000);
         return;
      }
      setUserLoading(true);

      try {
         const provider = new ethers.providers.Web3Provider(window.ethereum);
         const signer = provider.getSigner();

         const contract = new ethers.Contract(
            TwitterDappContractAddress,
            twitterDappAbi,
            signer
         );

         const tx = await contract.setProfile(displayName, bio, {
            gasLimit: 300000,
            gasPrice: ethers.utils.parseUnits('15.0', 'gwei'),
         });

         const receipt = await tx.wait();

         setDisplayName('');
         setBio('');

         //   check if the transaction was successful
         if (receipt.status === 1) {
            setUserLoading(false);

            toast.success(`Profile set successfully`, {
               duration: 4000,
               position: 'top-right',
               icon: '✅',
               style: {
                  color: '#fff',
                  background: `linear-gradient(to right, #000f58, #000624)`,
               },
            });
         }
         setUserLoading(false);
      } catch (error) {
         console.error('Error setting profile:', error);
      }
   };

   // ///// APPROVE F(x) ///////////
   // const Approved = async () => {
   //    // console.log('hello approve');
   //    setApprovedLoading(true);
   //    // setLessAmount(false);

   //    if (address === undefined) {
   //       toast.success(`Please Connect Your Wallet.`, {
   //          duration: 4000,
   //          position: 'top-right',
   //          icon: '❌',
   //          style: {
   //             color: '#fff',
   //             background: `linear-gradient(to right, #000f58, #000624)`,
   //          },
   //       });
   //       return;
   //    }

   //    try {
   //       // const getApproveContractAddress = new ethers.Contract(
   //       //    TwitterDappContractAddress,
   //       //    twitterDappAbi,
   //       //    signer
   //       // );

   //       const provider = new ethers.providers.Web3Provider(window.ethereum);
   //       const signer = provider.getSigner();

   //       // const instanceContract = getContract();

   //       const contractInstance = new ethers.Contract(
   //          '0xba0161322A09AbE48F06cE5656c1b66bFB01BE56',
   //          approveAbi,
   //          signer
   //       );

   //       // Convert the input stakeAmount to Ether
   //       const _amount = ethers.utils.parseEther(stakeAmount, 'ether');
   //       // console.log(_amount);
   //       const amountToString = _amount.toString();

   //       // estimatesGas//////////

   //       // Estimate gas for the approve function
   //       const estimatedGas = await contractInstance.estimateGas.approve(
   //          TwitterDappContractAddress,
   //          amountToString
   //       );
   //       /////////////

   //       // console.log(estimatedGas.toString());

   //       let tx;

   //       tx = await contractInstance.approve(
   //          TwitterDappContractAddress,
   //          amountToString,
   //          {
   //             gasLimit: estimatedGas,
   //             gasPrice: ethers.utils.parseUnits('15', 'gwei'),
   //          }
   //       );

   //       // setIsApproved(true);
   //       const receipt = await tx.wait();
   //       //   check if the transaction was successful
   //       if (receipt.status === 1) {
   //          toast.success(`Approved.`, {
   //             duration: 4000,
   //             position: 'top-right',
   //             icon: '✅',
   //             style: {
   //                color: '#fff',
   //                background: `linear-gradient(to right, #000f58, #000624)`,
   //             },
   //          });

   //          setIsApproved(true);
   //          setApprovedLoading(false);
   //       } else {
   //       }
   //       // }

   //       // setIsApproved(true);
   //    } catch (error) {
   //       console.error(error);

   //       if (error.code === 4001) {
   //          // User cancelled the transaction, set loading to false
   //          setApprovedLoading(false);
   //       } else {
   //          // Handle other transaction errors
   //          console.error(error);
   //       }
   //       setApprovedLoading(false);
   //    }

   //    // setIsLoading(false);
   // };

   return (
      <TwitterDappContext.Provider
         value={{
            content,
            getAllTweets,
            setContent,
            handleContent,
            CreateTweet,
            contentLoading,
            likeTweet,
            setDisplayName,
            setBio,
            displayName,
            bio,
            SetProfile,
            userLoading,
            error,
         }}
      >
         {children}
      </TwitterDappContext.Provider>
   );
};

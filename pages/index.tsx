// import React from "react";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { ConnectKitButton } from 'connectkit';
// import { useAccount } from 'wagmi';
// import axios from 'axios';

// export default function EnhancedWorldIDVerification() {
//   const { data: session, status } = useSession();
//   const loading = status === "loading";
//   const { address, isConnecting, isDisconnected } = useAccount();

//   const sendDataToBlockchain = async () => {
//     if (!address || !session) {
//       console.error('Address or session data is missing.');
//       return;
//     }

//     try {
//       const response = await axios.post('/api/sendData/page', {
//         address: address,
//         userId: session.user?.email ?? session.user?.name
//       });

//       if (response.data.success) {
//         console.log('Transaction successful with hash:', response.data.transactionHash);
//         alert(`Transaction successful! Hash: ${response.data.transactionHash}`);
//       } else {
//         console.error('Transaction failed:', response.data.error);
//         alert('Transaction failed');
//       }
//     } catch (error) {
//       console.error('Error sending data:', error);
//       alert('Error sending data to blockchain');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
//         <div className="flex items-center justify-center mb-6">
//           <img
//             src="https://pbs.twimg.com/profile_images/1683371529269137409/1VQdZPHJ_400x400.jpg"
//             alt="Worldcoin Logo"
//             className="w-16 h-16 mr-4 rounded-full"
//           />
//           <h1 className="text-3xl font-bold text-gray-800">Verify Your World ID</h1>
//         </div>

//         <div className="mb-8 p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
//           <p className="text-lg text-gray-700 text-center">
//             Verifying your World ID entitles you to reduced transaction fees and gas subsidies, enhancing your experience and saving costs.
//           </p>
//         </div>

//         <div className="space-y-6">
//           {!session && !loading && (
//             <div className="flex flex-col items-center space-y-4">
//               <span className="text-gray-600">You are not signed in</span>
//               <button
//                 className="w-full bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-semibold px-6 py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50 shadow-lg"
//                 onClick={() => signIn("worldcoin")}
//               >
//                 Sign in with World ID
//               </button>
//             </div>
//           )}

//           {session?.user && (
//             <div className="flex flex-col items-center space-y-4">
//               <div className="flex items-center space-x-4">
//                 {session.user.image && (
//                   <img
//                     src={session.user.image}
//                     alt="User Avatar"
//                     className="w-16 h-16 rounded-full border-2 border-yellow-400 shadow-lg"
//                   />
//                 )}
//                 <div className="text-center">
//                   <small className="block text-gray-500">Signed in as</small>
//                   <strong className="text-xl text-gray-800">{session.user.email ?? session.user.name}</strong>
//                 </div>
//               </div>
//               <button
//                 className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 shadow-lg"
//                 onClick={() => signOut()}
//               >
//                 Sign out
//               </button>
//             </div>
//           )}

//           {session && (
//             <div className="mt-6 flex flex-col items-center space-y-4">
//               <div className="mb-4 w-full">
//                 <div className="mb-6 flex justify-center">
//                   <ConnectKitButton />
//                 </div>
//               </div>

//               {address && (
//                 <div className="text-center w-full">
//                   <small className="block text-gray-500">Wallet Address</small>
//                   <strong className="text-lg text-gray-800 break-all">{address}</strong>
//                 </div>
//               )}

//               <button
//                 className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 shadow-lg"
//                 onClick={sendDataToBlockchain}
//               >
//                 Send to Blockchain
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';
import axios from 'axios';


export default function EnhancedWorldIDVerification() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const { address, isConnecting, isDisconnected } = useAccount();

  const sendDataToBlockchain = async () => {
    if (!address || !session) {
      console.error('Address or session data is missing.');
      return;
    }

    try {
      const response = await axios.post('/api/sendData/page', {
        address: address,
        userId: session.user?.email ?? session.user?.name
      });

      if (response.data.success) {
        console.log('Transaction successful with hash:', response.data.transactionHash);
        alert(`Transaction successful! Hash: ${response.data.transactionHash}`);
      } else {
        console.error('Transaction failed:', response.data.error);
        alert('Transaction failed');
      }
    } catch (error) {
      console.error('Error sending data:', error);
      alert('Error sending data to blockchain');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <img
            src="https://pbs.twimg.com/profile_images/1683371529269137409/1VQdZPHJ_400x400.jpg"
            alt="Worldcoin Logo"
            className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-blue-500 shadow-lg"
          />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Verify Your World ID</h1>
          <p className="text-lg text-gray-600">
            Enhance your experience with reduced fees and gas subsidies
          </p>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8 transition-all duration-300 hover:shadow-md">
          <p className="text-lg text-gray-700 text-center">
            Verifying your World ID entitles you to reduced transaction fees and gas subsidies, enhancing your experience and saving costs.
          </p>
        </div>

        <div className="space-y-6">
          {!session && !loading && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 transition-all duration-300 hover:shadow-md">
              <span className="block text-gray-600 text-center mb-4">You are not signed in</span>
              <button
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-semibold px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
                onClick={() => signIn("worldcoin")}
              >
                Sign in with World ID
              </button>
            </div>
          )}

          {session?.user && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-center space-x-4 mb-4">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full border-2 border-green-400 shadow-lg"
                  />
                )}
                <div className="text-center">
                  <small className="block text-gray-500">Signed in as</small>
                  <strong className="text-xl text-gray-800">{session.user.email ?? session.user.name}</strong>
                </div>
              </div>
              <button
                className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </div>
          )}

          {session && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 transition-all duration-300 hover:shadow-md">
              <div className="mb-6 flex justify-center">
                <ConnectKitButton />
              </div>

              {address && (
                <div className="text-center mb-6">
                  <small className="block text-gray-500 mb-1">Wallet Address</small>
                  <div className="bg-white p-3 rounded-lg shadow-inner overflow-x-auto">
                    <code className="text-sm text-gray-800 break-all">{address}</code>
                  </div>
                </div>
              )}

              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                onClick={sendDataToBlockchain}
              >
                Send to Blockchain
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
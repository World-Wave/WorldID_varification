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

    alert(`Your worldId: ${session.user?.email ?? session.user?.name} , Your wallet address:  ${address}`);

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
    <div className="container">
  <div className="card">
    <div className="header">
      <img
        src="https://pbs.twimg.com/profile_images/1683371529269137409/1VQdZPHJ_400x400.jpg"
        alt="Worldcoin Logo"
        className="logo"
      />
      <h1 className="title">Verify Your World ID with WorldWave</h1>
    </div>

    <div className="info-box">
      <p className="info-text">
        Verifying your World ID entitles you to reduced transaction fees and gas subsidies, enhancing your experience and saving costs.
      </p>
    </div>

    <div className="action-container">
      {!session && !loading && (
        <div className="sign-in-box">
          <span className="sign-in-text">You are not signed in</span>
          <button
            className="sign-in-button"
            onClick={() => signIn("worldcoin")}
          >
            Sign in with World ID
          </button>
        </div>
      )}

      {session?.user && (
        <div className="signed-in-box">
          <div className="user-info">
            {session.user.image && (
              <img
                src={session.user.image}
                alt="User Avatar"
                className="user-avatar"
              />
            )}
            <div className="user-details">
              <small className="user-label">Signed in as</small>
              <strong className="user-name">{session.user.email ?? session.user.name}</strong>
            </div>
          </div>
          <button
            className="sign-out-button"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      )}

      {session && (
        <div className="wallet-box">
          <div className="wallet-connect-button">
            <ConnectKitButton />
          </div>

          {address && (
            <div className="wallet-address">
              <small className="wallet-address-label">Wallet Address</small>
              <div className="wallet-address-value">
                <code className="wallet-address-code">{address}</code>
              </div>
            </div>
          )}

          <button
            className="send-button"
            onClick={sendDataToBlockchain}
          >
            {/* Send to Blockchain */}
            Register Your worldID
          </button>
        </div>
      )}
    </div>
  </div>
</div>
  );
}
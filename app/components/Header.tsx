'use client';

import Image from "next/image";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import AptosWallet from "./AptosWallet";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const Header = () => {
  const { account, connected, wallet, changeNetwork } = useWallet();

  // const handleClick = () => {
  //   setConnected(!connected);
  //   console.log("Wallet Connected: ", !connected);
  // };

  return (
    <div className="flex items-center justify-between p-3 h-[8vh] bg-secondary">
      <Image className="" width={100} height={80} src="/logo.png" alt="logo" />
      
      <AptosWallet />
      {/* <button onClick={handleClick} className="bg-blue-500 rounded-2xl w-36 h-12 hover:shadow-xl">
        {connected ? "Disconnect Wallet" : "Connect Wallet"}
      </button> */}
    </div>
  );
};

export default Header;
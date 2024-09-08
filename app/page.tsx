'use client';

import Image from "next/image";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AptosWallet from "./components/AptosWallet";
import { checkAccountInitialized, initializeUser } from "./lib/GreenToken";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

export default function Home() {
  const router = useRouter();
  const { account, connected, wallet, changeNetwork, signAndSubmitTransaction } = useWallet();
  const [accountHasList, setAccountHasList] = useState<boolean>(false);
  
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);

  const [walletInitialized, setWalletInitialized] = useState(false);

  const handleInitialize = async() => {
    await initializeUser(signAndSubmitTransaction);
    setWalletInitialized(true);
  };

  // const fetchList = async () => {
  //   if (!account) return [];
  //   // change this to be your module account address
  //   const moduleAddress = "0x7996e8716fb67da48d174d6e9a1bf2517e8ab37fac63a3af1f42f4e3b5644a1c";
  //   try {
  //     const todoListResource = await aptos.getAccountResource(
  //       {
  //         accountAddress:account?.address,
  //         resourceType:`${moduleAddress}::todolist::TodoList`
  //       }
  //     );
  //     setAccountHasList(true);
  //   } catch (e: any) {
  //     setAccountHasList(false);
  //   }
  // };
  
  useEffect(()=>{
    const checkWalletInitialized = async() => {
      if (account) {
        const isWalletInitialized = await checkAccountInitialized({ account });
      }
      console.log(walletInitialized);
    }

    if (account){
      console.log("Wallet Connected");
      checkWalletInitialized();
    }


  }, [account, walletInitialized]);

  // useEffect(() => {
  //   fetchList();
  // }, [account?.address]);

  // const isAccountInitialized = async() => {
  //   if (!account) return false;
  //   return await checkAccountInitialized(account);
  // }


  return (
    <main className="bg-background h-full">
        {
          (walletInitialized && account) ? (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <Image
                className="mt-5 mb-5"
                src="/ConnectedWallet.png"
                alt="logo"
                width={200}
                height={200}
              />

              <div className="text-4xl font-bold text-black">Account</div>
              <div className="text-4xl font-bold text-black mb-6">Initialized</div>
      
              <button onClick={() => {router.push("/dashboard")}} className="bg-secondary text-white w-auto p-4 rounded-md text-2xl hover:shadow-xl">
                Go to Dashboard
              </button>
      
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <Image
                className="mt-5 mb-5"
                src="/UnconnectedWallet.png"
                alt="logo"
                width={200}
                height={200}
              />

              <div className="text-4xl font-bold text-black">Account Not</div>
              <div className="text-4xl font-bold text-black mb-6">Initialized</div>
      
              <button onClick={handleInitialize} className="bg-secondary text-white w-auto p-4 rounded-md text-2xl hover:shadow-xl">
                Initialize Wallet
              </button>
            </div>
          )
        }
    </main>
  );
}

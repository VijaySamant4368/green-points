'use client';

import { useWallet } from '@aptos-labs/wallet-adapter-react';
import Image from 'next/image';
import Balance from '../../components/Balance';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

const Dashboard = () => {
    const router = useRouter();
    const { account, isLoading, connected, wallet, changeNetwork } = useWallet();

    useEffect(() => {
        if (!connected) {
            router.push("/");
        }
    }, [connected]);

    if (!connected) {
      router.push("/");
    }

    const handleScan = () => {
        router.push("/scanner");
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-full bg-background">
          
          
          <div className="text-3xl font-bold text-black">Start claiming</div>
          <div className="text-3xl font-bold text-black">tokens!</div>

          <Image
            className="mt-5 mb-5"
            src="/ScanQR.png"
            alt="logo"
            width={200}
            height={200}
          />

          <Balance update={connected} />

  
          <button onClick={handleScan} className="bg-secondary text-white w-auto p-4 rounded-md text-2xl hover:shadow-xl">
            Scan QR
          </button>
        </div>
    )
}

export default Dashboard;
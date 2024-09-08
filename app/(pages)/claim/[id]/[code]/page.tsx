'use client';

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image';
import Balance from '@/app/components/Balance';
import { claimGreenToken } from '@/app/lib/GreenToken';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { useEffect, useState } from 'react';

const Page = () => {
    const router = useRouter();
    const params = useParams()
    console.log(params)
    const { id, code } = params;

    const { account, signAndSubmitTransaction } = useWallet();

    console.log(id);

    const [isSuccessful, setIsSuccessful] = useState(false);
    useEffect(() => {

      const claim = async () => {
        if (await claimGreenToken(parseInt(id.toString()), code.toString(), account, signAndSubmitTransaction)) {
          setIsSuccessful(true);
        }
      }

      claim();

    }, []);

    useEffect(() => {
      console.log("claim done")
    }, [isSuccessful])

    const handleClick = () => {
        router.push("/dashboard");
    };

    return (
        <div className="bg-background flex flex-col justify-center items-center w-full h-full">
          {
            isSuccessful ? (
              <>
                <Image
                  className="mt-5 mb-5"
                  src="/QrSuccess.png"
                  alt="logo"
                  width={200}
                  height={200}
                />
                <div className="text-4xl font-bold text-black mb-4">Success!</div>
                
              </>
            ) : (
              <>
                <Image
                  className="mt-5 mb-5"
                  src="/QrFail.png"
                  alt="logo"
                  width={200}
                  height={200}
                />
                <div className="text-4xl font-bold text-black mb-4">Failed!</div>
                
              </>
            )
          }

          <Balance update={isSuccessful} /> 
  
          <button onClick={handleClick} className="bg-red-500 mt-10 text-white w-auto p-4 rounded-md text-2xl hover:shadow-xl">
            Go Back
          </button>
        </div>
    );
}

export default Page;
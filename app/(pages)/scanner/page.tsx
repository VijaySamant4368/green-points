'use client';

import Image from "next/image";
import QrReader from "@/app/components/QrReader";
import { useRouter } from "next/navigation";

const ScannerPage = () => {
    const router = useRouter();

    const handleQuit = () => {
        router.replace("/dashboard");
    }

    return (
        <div className="flex flex-col items-center">
            <div className="mt-5">
                <QrReader />
            </div>
            <div className="text-black font-bold text-3xl mt-4">
                Please scan the QR code
            </div>
            
          <button onClick={handleQuit} className="bg-red-700 text-white w-auto mt-2 p-4 rounded-md text-2xl hover:shadow-xl">
            Quit
          </button>

        </div>
    );
}

export default ScannerPage;
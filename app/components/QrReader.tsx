'use client';

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Qr Scanner
import QrScanner from "qr-scanner";
import Image from "next/image";

const QrReader = () => {
  const router = useRouter();

  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  // Result
  const [scannedResult, setScannedResult] = useState("");

  // Success
  const onScanSuccess = (result: QrScanner.ScanResult) => {
    setQrOn(false);
    // 🖨 Print the "result" to browser console.
    console.log(result);

    // ✅ Handle success.
    // 😎 You can do whatever you want with the scanned result.
    setScannedResult(result?.data);
    console.log(result?.data);

    const regex = /^https:\/\/green-points\.vercel\.app\/claim\/\w+\/\w+/;
    const isValid = regex.test(result?.data);
    if (isValid) {
      console.log("Valid URL");
      const [id, code] = result?.data.split('/').slice(-2);
      console.log(id, code);
      router.replace(`/claim/${id}/${code}`);
    }
  };

  // Fail
  const onScanFail = (err: string | Error) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn && !scanner?.current)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <div className="qr-reader w-full h-[70vh] flex justify-cente items-center border-2">
      {/* QR */}
      <video className="w-full h-full object-cover" ref={videoEl}></video>

      <div ref={qrBoxEl} className="qr-box w-full flex justify-center items-center">
        <Image
          src={"/qr-scanner.png"}
          alt="Qr Frame"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default QrReader;

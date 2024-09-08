'use client';

import { ReactNode } from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { Network } from "@aptos-labs/ts-sdk";

const WalletContextProvider = ({ children }: { children: ReactNode }) => {
  const wallets = [new PetraWallet()]

  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      dappConfig={{ network: Network.TESTNET }}
      onError={(error) => {
    console.log("error", error);
  }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};

export default WalletContextProvider;
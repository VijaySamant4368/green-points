import { AccountInfo, InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network, InputViewFunctionData } from "@aptos-labs/ts-sdk";

const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(aptosConfig);

const greenToken = '0x7996e8716fb67da48d174d6e9a1bf2517e8ab37fac63a3af1f42f4e3b5644a1c::green_token::GreenToken'
const greenTokenStore = `0x1::coin::CoinStore<${greenToken}>`;
const aptosContract = '0x7996e8716fb67da48d174d6e9a1bf2517e8ab37fac63a3af1f42f4e3b5644a1c'
const storageAccount = '0x7996e8716fb67da48d174d6e9a1bf2517e8ab37fac63a3af1f42f4e3b5644a1c'


const checkAccountInitialized = async ({account}: { account: any}) =>{
    if(!account){return[]}
    try{
        const payload: InputViewFunctionData = {
            function: `${aptosContract}::green_token::is_initialized`,
            functionArguments: [account.address]
            };
            const isInitialized = (await aptos.view({ payload }))[0];
            console.log("Successful:", isInitialized)

            return {isInitialized};
    }catch(e){
        console.log("Error Happened");
        console.log(e);
    }
}

const checkTokenBalance = async ({account}: { account: any}) =>{
    if(!account){return[]}
    try{
        const balance = await aptos.getAccountResource({
            accountAddress: account.address,
            resourceType: greenTokenStore,
        });
        console.log("Balance is", balance);
        return balance.coin.value;
    }catch(e){
        const balance = 0;
        console.log("Balance is 0")
    }
}

//id is an integer, code is a string. Both Random
const claimGreenToken = async (id: number, code: string, account: any, signAndSubmitTransaction: any)=>{
    const transaction:InputTransactionData = {
        data: {
        function:`${aptosContract}::accounts::claim_points`,
        functionArguments:[`${storageAccount}`, id, code, ]
        }
    }
    try{
        const response = await signAndSubmitTransaction(transaction);
        await aptos.waitForTransaction({transactionHash:response.hash});
        console.log("Transaction Successful, Green Token Claimed"); 
        return true;
    } catch (error: any) {
        console.log(error);
        return false;
    }
}

const initializeUser = async (signAndSubmitTransaction: any)=>{
    const transaction:InputTransactionData = {
        data: {
        function:`${aptosContract}::green_token::initialize_user`,
        functionArguments:[]
        }
    }
    try{
        const response = await signAndSubmitTransaction(transaction);
        await aptos.waitForTransaction({transactionHash:response.hash});
        console.log("Transaction Successful");
    } catch (error: any) {
        console.log(error);
    }
}

export {checkAccountInitialized, checkTokenBalance, claimGreenToken, initializeUser}
`use client`;
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { Col } from "antd";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";


function App() {
    return (
        <>
            <Col style={{}}>
                <WalletSelector />
            </Col>
        </>
    );
  }
   
  export default App;
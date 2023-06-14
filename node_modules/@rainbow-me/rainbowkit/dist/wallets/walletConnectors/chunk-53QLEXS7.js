// src/wallets/getWalletConnectConnector.ts
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
var sharedConnectors = /* @__PURE__ */ new Map();
function createConnector(options) {
  const connector = new WalletConnectConnector(options);
  sharedConnectors.set(JSON.stringify(options), connector);
  return connector;
}
function getWalletConnectConnector({
  chains,
  qrcode = false
}) {
  const options = {
    chains,
    options: {
      qrcode
    }
  };
  const serializedOptions = JSON.stringify(options);
  const sharedConnector = sharedConnectors.get(serializedOptions);
  return sharedConnector != null ? sharedConnector : createConnector(options);
}

export {
  getWalletConnectConnector
};

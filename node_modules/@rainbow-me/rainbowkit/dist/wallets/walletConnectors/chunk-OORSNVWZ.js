import {
  isIOS
} from "./chunk-KHDDZZDB.js";
import {
  getWalletConnectConnector
} from "./chunk-53QLEXS7.js";

// src/wallets/walletConnectors/walletConnectWallet/walletConnectWallet.ts
var walletConnectWallet = ({
  chains
}) => ({
  id: "walletConnect",
  name: "WalletConnect",
  iconUrl: async () => (await import("./walletConnectWallet-GTSESN7Q.js")).default,
  iconBackground: "#3b99fc",
  createConnector: () => {
    const ios = isIOS();
    const connector = getWalletConnectConnector({
      chains,
      qrcode: ios
    });
    const getUri = async () => (await connector.getProvider()).connector.uri;
    return {
      connector,
      ...ios ? {} : {
        mobile: { getUri },
        qrCode: { getUri }
      }
    };
  }
});

export {
  walletConnectWallet
};

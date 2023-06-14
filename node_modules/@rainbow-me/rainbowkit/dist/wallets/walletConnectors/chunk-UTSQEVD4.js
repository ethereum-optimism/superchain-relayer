import {
  getWalletConnectConnector
} from "./chunk-53QLEXS7.js";
import {
  isAndroid
} from "./chunk-KHDDZZDB.js";

// src/wallets/walletConnectors/ledgerWallet/ledgerWallet.ts
var ledgerWallet = ({ chains }) => ({
  id: "ledger",
  iconBackground: "#000",
  name: "Ledger Live",
  iconUrl: async () => (await import("./ledgerWallet-PVIKNN23.js")).default,
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=com.ledger.live",
    ios: "https://apps.apple.com/us/app/ledger-live-web3-wallet/id1361671700",
    qrCode: "https://www.ledger.com/ledger-live/download#download-device-2"
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return isAndroid() ? uri : `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      desktop: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
        }
      }
    };
  }
});

export {
  ledgerWallet
};

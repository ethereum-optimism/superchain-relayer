import {
  isAndroid
} from "./chunk-KHDDZZDB.js";
import {
  getWalletConnectConnector
} from "./chunk-53QLEXS7.js";

// src/wallets/walletConnectors/trustWallet/trustWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
var trustWallet = ({
  chains,
  shimDisconnect
}) => ({
  id: "trust",
  name: "Trust Wallet",
  iconUrl: async () => (await import("./trustWallet-TQQHHBST.js")).default,
  iconBackground: "#fff",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp",
    ios: "https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409",
    qrCode: "https://link.trustwallet.com"
  },
  createConnector: () => {
    var _a;
    const inAppBrowser = Boolean(typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.isTrust));
    if (inAppBrowser) {
      return {
        connector: new InjectedConnector({
          chains,
          options: { shimDisconnect }
        })
      };
    }
    const connector = getWalletConnectConnector({ chains });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return isAndroid() ? uri : `https://link.trustwallet.com/wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: "https://trustwallet.com/blog/an-introduction-to-trustwallet",
          steps: [
            {
              description: "Put Trust Wallet on your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the Trust Wallet app"
            },
            {
              description: "Create a new wallet or import an existing one.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "Choose New Connection, then scan the QR code and confirm the prompt to connect.",
              step: "scan",
              title: "Tap WalletConnect in Settings"
            }
          ]
        }
      }
    };
  }
});

export {
  trustWallet
};

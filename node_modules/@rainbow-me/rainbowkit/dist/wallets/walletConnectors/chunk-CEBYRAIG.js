import {
  isAndroid
} from "./chunk-KHDDZZDB.js";
import {
  getWalletConnectConnector
} from "./chunk-53QLEXS7.js";

// src/wallets/walletConnectors/rainbowWallet/rainbowWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
function isRainbow(ethereum) {
  const isRainbow2 = Boolean(ethereum.isRainbow);
  if (!isRainbow2) {
    return false;
  }
  return true;
}
var rainbowWallet = ({
  chains,
  shimDisconnect
}) => {
  const isRainbowInjected = typeof window !== "undefined" && typeof window.ethereum !== "undefined" && isRainbow(window.ethereum);
  const shouldUseWalletConnect = !isRainbowInjected;
  return {
    id: "rainbow",
    name: "Rainbow",
    iconUrl: async () => (await import("./rainbowWallet-KSMGN6MJ.js")).default,
    iconBackground: "#0c2f78",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=me.rainbow",
      ios: "https://apps.apple.com/us/app/rainbow-ethereum-wallet/id1457119021",
      qrCode: "https://rainbow.download"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({ chains }) : new InjectedConnector({
        chains,
        options: { shimDisconnect }
      });
      const getUri = async () => {
        const { uri } = (await connector.getProvider()).connector;
        return isAndroid() ? uri : `https://rnbwapp.com/wc?uri=${encodeURIComponent(uri)}`;
      };
      return {
        connector,
        mobile: { getUri: shouldUseWalletConnect ? getUri : void 0 },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://learn.rainbow.me/connect-your-wallet-to-a-website-or-app",
            steps: [
              {
                description: "We recommend putting Rainbow on your home screen for faster access to your wallet.",
                step: "install",
                title: "Open the Rainbow app"
              },
              {
                description: "You can easily backup your wallet using our backup feature on your phone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "After you scan, a connection prompt will appear for you to connect your wallet.",
                step: "scan",
                title: "Tap the scan button"
              }
            ]
          }
        } : void 0
      };
    }
  };
};

export {
  rainbowWallet
};

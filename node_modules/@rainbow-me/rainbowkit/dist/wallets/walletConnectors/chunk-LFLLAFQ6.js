// src/wallets/walletConnectors/braveWallet/braveWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
var braveWallet = ({
  chains,
  shimDisconnect
}) => {
  var _a;
  return {
    id: "brave",
    name: "Brave Wallet",
    iconUrl: async () => (await import("./braveWallet-VWIUQB2U.js")).default,
    iconBackground: "#fff",
    installed: typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.isBraveWallet) === true,
    downloadUrls: {},
    createConnector: () => ({
      connector: new InjectedConnector({
        chains,
        options: { shimDisconnect }
      })
    })
  };
};

export {
  braveWallet
};

// src/wallets/walletConnectors/injectedWallet/injectedWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
var injectedWallet = ({
  chains,
  shimDisconnect
}) => ({
  id: "injected",
  name: "Injected Wallet",
  iconUrl: async () => (await import("./injectedWallet-FYEFRY76.js")).default,
  iconBackground: "#fff",
  hidden: ({ wallets }) => wallets.some((wallet) => wallet.installed && (wallet.connector instanceof InjectedConnector || wallet.id === "coinbase")),
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
      options: { shimDisconnect }
    })
  })
});

export {
  injectedWallet
};

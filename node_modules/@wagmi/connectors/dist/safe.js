import {
  Connector,
  __privateAdd,
  __privateGet,
  __privateSet,
  __publicField
} from "./chunk-5NCTPR6C.js";

// src/safe.ts
import { SafeAppProvider } from "@safe-global/safe-apps-provider";
import { default as SafeAppsSDK } from "@safe-global/safe-apps-sdk";
import {
  ConnectorNotFoundError,
  getClient,
  normalizeChainId
} from "@wagmi/core";
import { providers } from "ethers";
import { getAddress } from "ethers/lib/utils.js";
var _provider, _sdk;
var SafeConnector = class extends Connector {
  constructor({
    chains,
    options: options_
  }) {
    const options = {
      shimDisconnect: false,
      ...options_
    };
    super({ chains, options });
    __publicField(this, "id", "safe");
    __publicField(this, "name", "Safe");
    __publicField(this, "ready", !(typeof window === "undefined") && window?.parent !== window);
    __privateAdd(this, _provider, void 0);
    __privateAdd(this, _sdk, void 0);
    __publicField(this, "shimDisconnectKey", `${this.id}.shimDisconnect`);
    let SDK = SafeAppsSDK;
    if (typeof SafeAppsSDK !== "function" && typeof SafeAppsSDK.default === "function")
      SDK = SafeAppsSDK.default;
    __privateSet(this, _sdk, new SDK(options));
  }
  async connect() {
    const provider = await this.getProvider();
    if (!provider)
      throw new ConnectorNotFoundError();
    if (provider.on) {
      provider.on("accountsChanged", this.onAccountsChanged);
      provider.on("chainChanged", this.onChainChanged);
      provider.on("disconnect", this.onDisconnect);
    }
    this.emit("message", { type: "connecting" });
    const account = await this.getAccount();
    const id = await this.getChainId();
    if (this.options.shimDisconnect)
      getClient().storage?.setItem(this.shimDisconnectKey, true);
    return {
      account,
      provider,
      chain: { id, unsupported: this.isChainUnsupported(id) }
    };
  }
  async disconnect() {
    const provider = await this.getProvider();
    if (!provider?.removeListener)
      return;
    provider.removeListener("accountsChanged", this.onAccountsChanged);
    provider.removeListener("chainChanged", this.onChainChanged);
    provider.removeListener("disconnect", this.onDisconnect);
    if (this.options.shimDisconnect)
      getClient().storage?.removeItem(this.shimDisconnectKey);
  }
  async getAccount() {
    const provider = await this.getProvider();
    if (!provider)
      throw new ConnectorNotFoundError();
    const accounts = await provider.request({
      method: "eth_accounts"
    });
    return getAddress(accounts[0]);
  }
  async getChainId() {
    const provider = await this.getProvider();
    if (!provider)
      throw new ConnectorNotFoundError();
    return normalizeChainId(provider.chainId);
  }
  async getProvider() {
    if (!__privateGet(this, _provider)) {
      const safe = await __privateGet(this, _sdk).safe.getInfo();
      if (!safe)
        throw new Error("Could not load Safe information");
      __privateSet(this, _provider, new SafeAppProvider(safe, __privateGet(this, _sdk)));
    }
    return __privateGet(this, _provider);
  }
  async getSigner() {
    const provider = await this.getProvider();
    const account = await this.getAccount();
    return new providers.Web3Provider(provider).getSigner(account);
  }
  async isAuthorized() {
    try {
      if (this.options.shimDisconnect && !getClient().storage?.getItem(this.shimDisconnectKey))
        return false;
      const account = await this.getAccount();
      return !!account;
    } catch {
      return false;
    }
  }
  onAccountsChanged(_accounts) {
  }
  onChainChanged(_chainId) {
  }
  onDisconnect() {
    this.emit("disconnect");
  }
};
_provider = new WeakMap();
_sdk = new WeakMap();
export {
  SafeConnector
};

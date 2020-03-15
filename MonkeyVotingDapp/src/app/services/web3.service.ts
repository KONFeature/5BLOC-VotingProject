import { InjectionToken } from "@angular/core";
import Web3 from "web3";

export const WEB3 = new InjectionToken<Web3>("web3", {
  providedIn: "root",
  factory: () => {
    try {
        // Modern dapp browsers...
          return new Web3(Web3.givenProvider || "ws://localhost:7545");
    } catch (err) {
      throw new Error(
        "Non-Ethereum browser detected. You should consider trying Mist or MetaMask!"
      );
    }
  }
});

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace Tipping {
  export type TipStruct = {
    sender: PromiseOrValue<string>;
    receiver: PromiseOrValue<string>;
    amount: PromiseOrValue<BigNumberish>;
    message: PromiseOrValue<string>;
  };

  export type TipStructOutput = [string, string, BigNumber, string] & {
    sender: string;
    receiver: string;
    amount: BigNumber;
    message: string;
  };
}

export interface TippingInterface extends utils.Interface {
  functions: {
    "sendTip(address,address,uint256,string)": FunctionFragment;
    "tips(uint256)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "sendTip" | "tips"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "sendTip",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "tips",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "sendTip", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tips", data: BytesLike): Result;

  events: {
    "TipSend(tuple)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "TipSend"): EventFragment;
}

export interface TipSendEventObject {
  arg0: Tipping.TipStructOutput;
}
export type TipSendEvent = TypedEvent<
  [Tipping.TipStructOutput],
  TipSendEventObject
>;

export type TipSendEventFilter = TypedEventFilter<TipSendEvent>;

export interface Tipping extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TippingInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    sendTip(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      message: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    tips(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber, string] & {
        sender: string;
        receiver: string;
        amount: BigNumber;
        message: string;
      }
    >;
  };

  sendTip(
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    message: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  tips(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, string, BigNumber, string] & {
      sender: string;
      receiver: string;
      amount: BigNumber;
      message: string;
    }
  >;

  callStatic: {
    sendTip(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      message: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    tips(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber, string] & {
        sender: string;
        receiver: string;
        amount: BigNumber;
        message: string;
      }
    >;
  };

  filters: {
    "TipSend(tuple)"(arg0?: null): TipSendEventFilter;
    TipSend(arg0?: null): TipSendEventFilter;
  };

  estimateGas: {
    sendTip(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      message: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    tips(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    sendTip(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      message: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    tips(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}

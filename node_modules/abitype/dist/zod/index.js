// src/zod/zod.ts
import { z } from "zod";
var SolidityAddress = z.literal("address");
var SolidityBool = z.literal("bool");
var SolidityBytes = z.string().regex(
  /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/
);
var SolidityFunction = z.literal("function");
var SolidityString = z.literal("string");
var SolidityTuple = z.literal("tuple");
var SolidityInt = z.string().regex(
  /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/
);
var SolidityArrayWithoutTuple = z.string().regex(
  /^(address|bool|function|string|bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?|u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?)(\[[0-9]{0,}\])+$/
);
var SolidityArrayWithTuple = z.string().regex(/^tuple(\[[0-9]{0,}\])+$/);
var SolidityArray = z.union([
  SolidityArrayWithTuple,
  SolidityArrayWithoutTuple
]);
var AbiParameter = z.lazy(
  () => z.intersection(
    z.object({
      name: z.string().optional(),
      internalType: z.string().optional()
    }),
    z.union([
      z.object({
        type: z.union([
          SolidityAddress,
          SolidityBool,
          SolidityBytes,
          SolidityFunction,
          SolidityString,
          SolidityInt,
          SolidityArrayWithoutTuple
        ])
      }),
      z.object({
        type: z.union([SolidityTuple, SolidityArrayWithTuple]),
        components: z.array(AbiParameter)
      })
    ])
  )
);
var AbiStateMutability = z.union([
  z.literal("pure"),
  z.literal("view"),
  z.literal("nonpayable"),
  z.literal("payable")
]);
var AbiFunction = z.preprocess(
  (val) => {
    const abiFunction = val;
    if (abiFunction.type === "constructor" || abiFunction.type === "fallback" || abiFunction.type === "receive")
      return abiFunction;
    if (abiFunction.stateMutability === void 0) {
      if (abiFunction.constant)
        abiFunction.stateMutability = "view";
      else if (abiFunction.payable)
        abiFunction.stateMutability = "payable";
      else
        abiFunction.stateMutability = "nonpayable";
    }
    return val;
  },
  z.intersection(
    z.object({
      constant: z.boolean().optional(),
      gas: z.number().optional(),
      payable: z.boolean().optional(),
      stateMutability: AbiStateMutability
    }),
    z.discriminatedUnion("type", [
      z.object({
        type: z.literal("function"),
        inputs: z.array(AbiParameter),
        name: z.string(),
        outputs: z.array(AbiParameter)
      }),
      z.object({
        type: z.literal("constructor"),
        inputs: z.array(AbiParameter)
      }),
      z.object({
        type: z.literal("fallback"),
        inputs: z.tuple([]).optional()
      }),
      z.object({
        type: z.literal("receive"),
        stateMutability: z.literal("payable")
      })
    ])
  )
);
var AbiEvent = z.object({
  type: z.literal("event"),
  anonymous: z.boolean().optional(),
  inputs: z.array(
    z.intersection(AbiParameter, z.object({ indexed: z.boolean().optional() }))
  ),
  name: z.string()
});
var AbiError = z.object({
  type: z.literal("error"),
  inputs: z.array(AbiParameter),
  name: z.string()
});
var Abi = z.array(z.union([AbiFunction, AbiEvent, AbiError]));
export {
  Abi,
  AbiError,
  AbiEvent,
  AbiFunction,
  AbiParameter,
  AbiStateMutability,
  SolidityAddress,
  SolidityArray,
  SolidityArrayWithTuple,
  SolidityArrayWithoutTuple,
  SolidityBool,
  SolidityBytes,
  SolidityFunction,
  SolidityInt,
  SolidityString,
  SolidityTuple
};

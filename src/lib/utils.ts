import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { clsx, type ClassValue } from "clsx";
import { derivePath } from "ed25519-hd-key";
import { twMerge } from "tailwind-merge";
import nacl from "tweetnacl";
import hdkey from "hdkey";
import ethUtil from "ethereumjs-util";
import { Wallet, JsonRpcProvider } from "ethers";
import { toast } from "@/hooks/use-toast";
import { sendAndConfirmTransaction } from "@solana/web3.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum Chain_Type {
  solana = "sol",
  eth = "eth",
}

interface KeyPairResult {
  privateKey: string | Uint8Array;
  publicKey: string;
}

const metamask_RPC_URL =
  "https://mainnet.infura.io/v3/7afa7276f34247f682e26e42f040d515";

export async function generatePair({
  index,
  seed,
  type,
}: {
  index: number;
  seed: Buffer;
  type: Chain_Type;
}): Promise<KeyPairResult> {
  if (index < 0) throw new Error("Index must be non-negative");
  if (!seed || seed.length === 0) throw new Error("Seed cannot be empty");

  try {
    const path =
      type === Chain_Type.solana
        ? `m/44'/501'/${index}'/0'`
        : `m/44'/60'/${index}'/0/0`;

    if (type === Chain_Type.eth) {
      const root = hdkey.fromMasterSeed(seed);

      if (!root.privateKey) {
        throw new Error("Failed to generate root key from seed");
      }

      const addrNode = root.derive(path);
      if (!addrNode.privateKey) {
        throw new Error("Failed to derive key at path: " + path);
      }

      const privateKey = addrNode.privateKey;
      const publicKey = ethUtil.privateToPublic(privateKey);
      const address = ethUtil.publicToAddress(publicKey);

      const checksumAddress = ethUtil.toChecksumAddress(
        "0x" + address.toString("hex")
      );

      return {
        privateKey: privateKey.toString("hex"),
        publicKey: checksumAddress,
      };
    }

    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);

    return {
      privateKey: keypair.secretKey,
      publicKey: Keypair.fromSecretKey(keypair.secretKey).publicKey.toBase58(),
    };
  } catch (error) {
    throw new Error(`Failed to generate keypair: ${(error as Error).message}`);
  }
}

export async function sendTxn({
  toAddress,
  amount,
  privateKey,
  type,
}: {
  toAddress: string;
  amount: number;
  privateKey: Uint8Array;
  type: Chain_Type;
}) {
  if (type === Chain_Type.eth) {
    const provider = new JsonRpcProvider(metamask_RPC_URL);
    try {
      const wallet = new Wallet(privateKey.toString(), provider);

      const txn = await wallet.sendTransaction({
        to: toAddress,
        value: amount,
      });

      await txn.wait();

      toast({
        title: "Success",
        description: "Transaction sent successfully",
      });

      console.log("ETH txn sent", txn);
    } catch (error: unknown) {
      console.error("ETH txn error:", error);

      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to send transaction",
        });

        if (error.message.includes("insufficient funds")) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Insufficient funds to send transaction",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to send transaction",
          });
        }
      }
    }
  } else {
    console.log("Sending SOL txn");

    try {
      const lampots = amount * LAMPORTS_PER_SOL;

      const txn = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: Keypair.fromSecretKey(privateKey).publicKey,
          toPubkey: new PublicKey(toAddress),
          lamports: lampots,
        })
      );

      const tx = await sendAndConfirmTransaction(
        new Connection("https://api.devnet.solana.com"),
        txn,
        [Keypair.fromSecretKey(privateKey)]
      );

      console.log("SOL txn sent", tx);

      toast({
        title: "Success",
        description: "Transaction sent successfully",
      });
    } catch (error: unknown) {
      console.error("SOL txn error:", error);
      if (error instanceof Error) {
        if (error.message) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Insufficient funds to send transaction",
          });
        }
      }
    }
  }
}

export async function getAirdrop(privateKey: Uint8Array) {
  const connection = new Connection("https://api.devnet.solana.com", {
    disableRetryOnRateLimit: true,
  });

  const drop = await connection.requestAirdrop(
    Keypair.fromSecretKey(privateKey).publicKey,
    LAMPORTS_PER_SOL
  );

  console.log("Airdrop", drop);

  toast({
    title: "Success",
    description: "Airdrop successful",
  });
}

export async function getBalance(
  address: string,
  type: Chain_Type
): Promise<number> {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const A_SOL_URL = process.env.NEXT_PUBLIC_A_SOL_URL;
  const A_ETH_URL = process.env.NEXT_PUBLIC_A_ETH_URL;

  if (!A_SOL_URL || !A_ETH_URL) {
    throw new Error("API URLs not found");
  }

  if (!address) {
    return 0;
  }

  if (type === Chain_Type.eth) {
    try {
      const body = {
        id: 1,
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [address, "latest"],
      };

      const response = await fetch(A_ETH_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();

      console.log(data);

      if (data.error) {
        console.error("ETH API Error:", data.error);

        return 0;
      }

      if (!data.result) {
        console.error("No result in ETH response:", data);
        return 0;
      }

      const balanceInWei = BigInt(data.result);
      const balanceInEth = Number(balanceInWei) / 1e18;

      console.log(balanceInEth);

      return balanceInEth;
    } catch (error) {
      console.error("ETH Balance fetch error:", error);
      return 0;
    }
  } else {
    try {
      const body = {
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [address],
      };

      const response = await fetch(A_SOL_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.error) {
        console.error("SOL API Error:", data.error);
        return 0;
      }

      return data.result.value / 1e9;
    } catch (error) {
      console.error("SOL Balance fetch error:", error);
      return 0;
    }
  }
}

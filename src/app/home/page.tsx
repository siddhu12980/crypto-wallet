"use client";
import MainButton from "@/components/MainButton";
import ChainSelector from "@/components/models/ChainSelector";
import WelcomeModal from "@/components/models/WelcomeModels";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import Wallet from "@/components/Wallet";
import { useToast } from "@/hooks/use-toast";
import { Chain_Type } from "@/lib/utils";
import { generateMnemonic } from "bip39";

import { useState } from "react";

async function generateSeedPhrase() {
  const mnemonic = generateMnemonic();
  return mnemonic.split(" ");
}

export default function Home() {
  const [seedPhrase, setSeedPhrase] = useState<string[] | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const [wallet, setWallet] = useState<Chain_Type | null>(null);
  const { toast } = useToast();

  if (!userName) {
    return <WelcomeModal setUserName={setUserName} />;
  }

  if (done) {
    if (!seedPhrase || seedPhrase.length === 0) setDone(false);
    return (
      <ChainSelector
        onChainSelect={(data) => {
          setWallet(data);
          setDone(false);
        }}
      />
    );
  }

  if (wallet) {
    return <Wallet wallet_type={wallet} seed={seedPhrase!.join(" ")} />;
  }

  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col gap-6 items-center justify-center h-screen">
        <h1 className="text-5xl font-bold">Welcome {userName},</h1>
        <h1 className="text-4xl font-bold">Generate Your Seed Phrase</h1>
        <h3 className="text-xl">Store these words in a safe place</h3>

        {seedPhrase && (
          <div className="grid grid-cols-4  gap-4 lg:gap-6 items-center justify-center">
            {seedPhrase.map((word, index) => (
              <Card key={index} className="p-2 text-center text-2xl">
                {word}
              </Card>
            ))}
          </div>
        )}

        <Button
          onClick={() => {
            generateSeedPhrase().then(setSeedPhrase);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {seedPhrase ? "Generate New Seed Phrase" : "Generate Seed Phrase"}
        </Button>

        {seedPhrase && (
          //copy button

          <Button
            onClick={() => {
              navigator.clipboard.writeText(seedPhrase.join(" "));
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Copy Seed Phrase
          </Button>
        )}
      </div>

      <div className=" pb-4">
        <MainButton
          onSubmit={() => {
            console.log("clicked");

            if (!seedPhrase) {
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please Generate The Seed Pharse.",
              });
              return;
            }
            //navigate to next component
            setDone(true);
          }}
          input="Continue"
        />
      </div>
      <Toaster />
    </div>
  );
}

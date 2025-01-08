import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeDollarSignIcon, Wallet } from "lucide-react";
import { Chain_Type } from "@/lib/utils";
import { BackgroundGradient } from "../ui/background-gradient";

interface ChainOption {
  id: Chain_Type;
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

interface ChainSelectorProps {
  onChainSelect: (chain: ChainOption["id"]) => void;
}

const ChainSelector: React.FC<ChainSelectorProps> = ({ onChainSelect }) => {
  const chains: ChainOption[] = [
    {
      id: Chain_Type.eth,
      name: "Ethereum",
      description: "The World Computer",
      icon: <BadgeDollarSignIcon className="h-12 w-12 text-blue-500" />,
      features: ["Smart Contracts", "DeFi Ecosystem", "NFT Support"],
    },
    {
      id: Chain_Type.solana,
      name: "Solana",
      description: "Built for Speed",
      icon: <Wallet className="h-12 w-12 text-purple-500" />,
      features: ["Fast Transactions", "Low Fees", "Web3 Apps"],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
    

        <div className="h-[50rem] flex-col w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            <h2 className="text-7xl font-bold">Choose Your Chain</h2>
            <p className="text-muted-foreground text-3xl">
              Select a blockchain to generate your wallet
            </p>
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {chains.map((chain,i) => (
              <BackgroundGradient  key={i} className="rounded-[22px]   p-1 dark:bg-zinc-900 ">
                <Card
                  key={chain.id}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => onChainSelect(chain.id)}
                >
                  <CardContent className="p-8 space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        {chain.icon}
                        <div>
                          <h3 className="text-2xl font-bold">{chain.name}</h3>
                          <p className="text-muted-foreground">
                            {chain.description}
                          </p>
                        </div>
                      </div>

                      <ul className="space-y-2">
                        {chain.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => onChainSelect(chain.id)}
                    >
                      Select {chain.name}
                    </Button>
                  </CardContent>
                </Card>
              </BackgroundGradient>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChainSelector;

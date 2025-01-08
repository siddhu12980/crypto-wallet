import { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
  WalletIcon,
  ExternalLink,
  Trash2,
  Plus,
  Send,
  Wallet2Icon as WalletIcon2,
  Search,
  RefreshCcw,
} from "lucide-react";
import { Chain_Type, generatePair, getBalance, sendTxn } from "@/lib/utils";
import { SendModal } from "../../SendModel";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WalletInterface {
  index: number;
  privateKey: Uint8Array;
  publicKey: string;
  balance: number;
}

const SOL_EXPLORER_URL = "https://explorer.solana.com/address/";
const ETH_EXPLORER_URL = "https://etherscan.io/address/";
interface WalletProps {
  seed: string;
  userName?: string;
  wallet_type: Chain_Type;
}

const Wallet: React.FC<WalletProps> = ({
  seed,
  userName = "Guest",
  wallet_type = Chain_Type.solana,
}) => {
  const seeds = mnemonicToSeedSync(seed);
  const [wallets, setWallets] = useState<WalletInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);

  const filteredWallets = wallets.filter(
    (wallet) =>
      wallet.publicKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (wallet.index === 0 ? "Main Account" : `Account ${wallet.index}`)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const handleGenerateKeyPair = async () => {
    try {
      const lastIndex = wallets.length;
      const { privateKey, publicKey } = await generatePair({
        index: lastIndex,
        seed: seeds,
        type: wallet_type,
      });

      setWallets((prev) => [
        ...prev,
        {
          index: lastIndex,
          privateKey: privateKey as Uint8Array,
          publicKey,
          balance: 0,
        },
      ]);

      toast({
        title: "Success",
        description: "New wallet keypair generated successfully",
      });
    } catch (error : unknown) {
      console.log("Error generating keypair", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate keypair",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-6xl w-full space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold text-primary">
            Welcome, {userName}
          </h1>
          <div className="flex items-center justify-center gap-2">
            <WalletIcon2 className="h-6 w-6" />
            <p className="text-2xl font-semibold">
              Total Balance: {totalBalance.toFixed(4)}{" "}
              {wallet_type.toUpperCase()}
            </p>
          </div>
        </div>
        {wallets.length === 0 ? (
          <Card className="p-8 text-center bg-card/50 backdrop-blur-sm">
            <CardContent className="space-y-4">
              <WalletIcon className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="text-xl font-medium">No Wallets Generated</h3>
              <p className="text-muted-foreground">
                Get started by generating your first wallet keypair.
              </p>
              <Button onClick={handleGenerateKeyPair}>
                <Plus className="mr-2 h-4 w-4" />
                Generate First Wallet
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button
                size="lg"
                onClick={handleGenerateKeyPair}
                className="w-full sm:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" />
                Generate New Keypair
              </Button>
              <div className="relative w-full sm:w-auto flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search wallets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <Button
                size="lg"
                onClick={async () => {
                  const updatedWallets = await Promise.all(
                    wallets.map(async (wallet) => {
                      const balance = await getBalance(
                        wallet.publicKey,
                        wallet_type
                      );
                      return {
                        ...wallet,
                        balance: balance ?? 0,
                      };
                    })
                  );

                  setWallets(updatedWallets);
                  toast({
                    title: "Refreshed",
                    description: "Wallets refreshed successfully",
                  });
                }}
                className="w-full sm:w-auto bg-black text-white hover:text-black "
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <RefreshCcw className="mr-2 h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Refresh Wallet Content</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {" "}
              {filteredWallets.map((wallet) => (
                <Card key={wallet.index} className="bg-card">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <WalletIcon className="h-6 w-6 text-primary" />{" "}
                        <span className="font-medium text-lg">
                          {wallet.index === 0
                            ? "Main Account"
                            : `Account ${wallet.index}`}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            window.open(
                              wallet_type === Chain_Type.solana
                                ? SOL_EXPLORER_URL + wallet.publicKey
                                : ETH_EXPLORER_URL + wallet.publicKey
                            )
                          }
                        >
                          <ExternalLink className="h-5 w-5" />{" "}
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Send className="h-5 w-5" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>
                                Send {wallet_type.toUpperCase()}
                              </DialogTitle>
                            </DialogHeader>
                            <SendModal
                              type={wallet_type}
                              fromAddress={wallet.publicKey}
                              onSend={async (toAddress, amount) => {
                                sendTxn({
                                  toAddress,
                                  amount,
                                  privateKey: wallet.privateKey,
                                  type: wallet_type,
                                });
                              }}
                            />
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setWallets((prev) =>
                              prev.filter((w) => w.index !== wallet.index)
                            );
                            toast({
                              title: "Deleted",
                              description: "Wallet removed successfully",
                            });
                          }}
                        >
                          <Trash2 className="h-5 w-5 trash-icon  " />
                        </Button>
                      </div>
                    </div>
                    <div
                      className="space-y-4 cursor-pointer "
                      onClick={async () => {
                        navigator.clipboard.writeText(wallet.publicKey);
                        toast({
                          title: "Copied",
                          description: "Public key copied to clipboard",
                        });
                      }}
                    >
                      <div className="text-xl font-medium">
                        Balance: {wallet.balance.toFixed(4)}{" "}
                        {wallet_type.toLocaleUpperCase()}
                      </div>
                      <div className="text-sm text-muted-foreground break-all  ">
                        {wallet.publicKey}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wallet;

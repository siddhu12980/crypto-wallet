"use client";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Chain_Type } from "@/lib/utils";
import { CardContent } from "@/components/ui/card";

interface SendModalProps {
  fromAddress: string;
  onSend: (toAddress: string, amount: number) => Promise<void>;
  type: Chain_Type;
}

export const SendModal: React.FC<SendModalProps> = ({
  fromAddress,
  onSend,
  type,
}) => {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    try {
      setIsLoading(true);
      await onSend(toAddress, Number(amount));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardContent className="sm:max-w-md" aria-describedby="modal-description">
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label>From</Label>
          <Input disabled value={fromAddress} />
        </div>
        <div className="space-y-2">
          <Label>To</Label>
          <Input
            placeholder="Enter recipient's address"
            value={toAddress}
            onChange={(e1) => setToAddress(e1.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Amount ({type.toUpperCase()})</Label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e2) => setAmount(e2.target.value)}
          />
        </div>
        <Button
          onClick={handleSend}
          disabled={isLoading || !toAddress || !amount}
          className="w-full"
        >
          {isLoading ? "Sending..." : `Send ${type.toUpperCase()}`}
        </Button>
      </div>
    </CardContent>
  );
};

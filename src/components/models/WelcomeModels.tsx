import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Meteors } from "../ui/Meotors";

interface WelcomeModalProps {
  setUserName: (name: string) => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ setUserName }) => {
  const [enterName, setEnterName] = useState<string>("");
  const { toast } = useToast();

  const handleContinue = () => {
    if (!enterName.trim()) {
      toast({
        variant: "destructive",
        title: "Name Required",
        description: "Please enter your name to continue.",
      });
      return;
    }
    setUserName(enterName.trim());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm gap-4 flex items-center justify-center p-4 rounded-lg">
      <Card className="max-w-md  w-full bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader className="space-y-2 gap-4 text-center">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome to the Seed Phrase Generator
          </CardTitle>
          <CardDescription className="text-xl text-white">
            Please Enter Your Name
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your name"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            onChange={(e) => setEnterName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleContinue()}
          />
          <Button
            onClick={handleContinue}
            className="  w-full bg-white/20  hover:bg-white/30 text-white"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
      <Meteors  number={20} />
    </div>
  );
};

export default WelcomeModal;

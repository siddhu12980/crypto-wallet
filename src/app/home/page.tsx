import { Button } from "@/components/ui/button";


export default function Home() {

  return (
    <div>
      <div className="flex flex-col gap-3 items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Generate Your Seed Phrase</h1>
        <h3 className="text-xl">Store these words in a safe place</h3>

        <Button onClick={()=>{
            console.log("Generate Seed Phrase")
        }} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Generate Seed Phrase
        </Button>
      </div>
    </div>
  );
}

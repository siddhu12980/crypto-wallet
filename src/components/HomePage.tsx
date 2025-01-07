import { FeaturesSection } from "./Features";
import MainButton from "./MainButton";
import { Testimonials } from "./Testimonial";
import { BackgroundLines } from "./ui/background-lines";
import { Cover } from "./ui/cover";

export const HOMEPAGE = () => {
  return (
    <div>
      <BackgroundLines className="flex gap-4 items-center justify-center w-full flex-col px-6">
        <div>
          <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white sm:text-4xl md:text-7xl  lg:text-9xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            100x Wallet
          </h1>
          <h3 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center  relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
            Generate Crypto Wallet, <br /> at <Cover>Light speed</Cover>
          </h3>
        </div>

        <MainButton />
      </BackgroundLines>

      <FeaturesSection />
      <div>
        <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white sm:text-2xl md:text-4xl  lg:text-6xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Don't just take our word for it,
          <br />
          Hear from our customers
        </h1>
      </div>
      <Testimonials />
    </div>
  );
};

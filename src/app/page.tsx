import { HOMEPAGE } from "@/components/HomePage";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Suscribe from "@/components/Suscribe";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <FloatingNav
        className="w-[80%]  "
        navItems={[
          { name: "Home", link: "/" },
          { name: "About", link: "/" },
          { name: "Contact", link: "/" },
        ]}
      />
      <HOMEPAGE />

      <Footer />
    </>
  );
}

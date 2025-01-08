
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Suscribe() {

  return (
    <section className="w-full py-2 md:py-3 lg:py-4 bg-zinc-900 ">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-xl md:text-xl lg:text-4xl/none text-white">
          Stay Connected
        </h2>
        <p className="mx-auto max-w-[700px] text-zinc-100 md:text-xl ">
          Subscribe to our newsletter and follow us on our social media.
        </p>
        <div className="w-full max-w-md space-y-2 my-4">
          <form className="flex space-x-2">
            <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1 text-zinc-900 bg-white  active:no-underline active:border-none " />
            <Button type="submit" variant="outline" className="text-white border-white text-sm">
              Subscribe
            </Button>
          </form>
        </div>
   
      </div>
    </section>
  )
}


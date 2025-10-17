import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b">
      {/* Logo */}
      <Link href="/" className="text-xl font-semibold">
        MyApp
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-primary transition">Home</Link>
        <Link href="/about" className="hover:text-primary transition">About</Link>
        <Link href="/contact" className="hover:text-primary transition">Contact</Link>
      </div>

      {/* Call to Action */}
      <div className="hidden md:block">
        <Button>Sign In</Button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[200px]">
            <div className="flex flex-col space-y-4 mt-8">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Button className="mt-4">Sign In</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

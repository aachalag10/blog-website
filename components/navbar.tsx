import Link from "next/link";
import { ModeToggle } from "./Theme";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between  px-8 py-4 bg-gray-50 border-b shadow-sm">
      <h1 className="text-xl font-bold text-gray-800">My Blog</h1>
      <div className="flex gap-4  text-gray-700">
        <Link href="/">Home</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/reviews">Reviews</Link>
        <Link href="/news">News</Link>
        <Link href="/membership">Membership</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <div className="flex gap-4 text-gray-700">
        <ModeToggle />

        <Link href="/search">search</Link>
        <Link href="/signin">Sign in</Link>
        <Link href="/signup">Sign up</Link>
      </div>
    </nav>
  );
}

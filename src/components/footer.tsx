import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="mt-10 py-6">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-xs text-gray-300 dark:text-gray-600 md:flex-row md:justify-between">

                {/* Left: Copyright */}
                <div className="mb-2 md:mb-0 hidden md:block">
                    <Link href="/" className="link-underline">
                        © {new Date().getFullYear()} - JT
                    </Link>
                </div>

                {/* Center: Author */}
                <div className="mb-2 md:mb-0 text-center">by Justin Kenzie</div>

                {/* Right: Social Icons (Auto-Adjust Grid) */}
                <div className="flex space-x-4">
                    <Link href="https://instagram.com" className="hover:text-pink-400">
                        <FaInstagram size={20} />
                    </Link>
                    <Link href="https://linkedin.com" className="hover:text-blue-600">
                        <FaLinkedin size={20} />
                    </Link>
                </div>

            </div>
        </footer>
    );
}

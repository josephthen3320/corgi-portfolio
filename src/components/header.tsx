'use client';
import { useState } from 'react';
import Link from 'next/link';
import Typewriter from 'typewriter-effect';
import { FaBars, FaTimes } from 'react-icons/fa';

export function Header({ navLinks }: { navLinks: { href: string; title: string }[] }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="relative flex flex-wrap items-center justify-between py-6 px-4 md:px-10">
            {/* Left-Aligned Logo */}
            <div className="text-primary-color dark:text-primary-color-dark text-xl font-semibold z-10">
                <Link href="/" passHref legacyBehavior>
                    <a>
                        <Typewriter
                            options={{
                                strings: [`12.1 Creative :: `], // ${pathname}
                                autoStart: true,
                                loop: false,
                                deleteSpeed: 100000,
                                delay: 0,
                            }}
                        />
                    </a>
                </Link>
            </div>

            {/* Hamburger Icon for Mobile */}
            <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="text-gray-600 dark:text-gray-400">
                    {isMenuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
                </button>
            </div>

            {/* Centered Navigation Links */}
            <nav
                className={`${
                    isMenuOpen ? 'block' : 'hidden'
                } absolute left-0 right-0 top-[70px] md:block md:flex md:space-x-4 md:justify-center md:relative md:top-0 md:left-0 md:right-0`}
            >
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full bg-white md:bg-transparent md:text-gray-900 dark:bg-black dark:text-gray-100 p-2.5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="link-underline rounded py-1 px-2 text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 sm:py-2 sm:px-3"
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}

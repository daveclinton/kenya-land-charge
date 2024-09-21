"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event?.target as Node))
        setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            L-Charge
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link
            href="/registration"
            type="button"
            className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          >
            Get started
          </Link>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className={`block py-2 px-3 ${
                  pathname === "/"
                    ? "text-white bg-orange-500 md:bg-transparent md:text-orange-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500"
                } rounded md:p-0 md:dark:text-orange-500`}
              >
                Home
              </Link>
            </li>
            {/* <li>
              <Link
                href="/about"
                className={`block py-2 px-3 ${
                  pathname === "/about"
                    ? "text-white bg-orange-500 md:bg-transparent md:text-orange-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500"
                } rounded md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                About
              </Link>
            </li> */}
            <li>
              <Link
                href="/registration"
                className={`block py-2 px-3 ${
                  pathname === "/registration"
                    ? "text-white bg-orange-500 md:bg-transparent md:text-orange-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500"
                } rounded md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                Register
              </Link>
            </li>
            {/* <li>
              <Link
                href="/form"
                className={`block py-2 px-3 ${
                  pathname === "/form"
                    ? "text-white bg-orange-500 md:bg-transparent md:text-orange-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500"
                } rounded md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                Form
              </Link>
            </li> */}
            {/* <li>
              <Link
                href="/faqs"
                className={`block py-2 px-3 ${
                  pathname === "/faqs"
                    ? "text-white bg-orange-500 md:bg-transparent md:text-orange-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500"
                } rounded md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`block py-2 px-3 ${
                  pathname === "/contact"
                    ? "text-white bg-orange-500 md:bg-transparent md:text-orange-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500"
                } rounded md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
              >
                Contact
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-orange-100 rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link href="/" className="hover:underline">
            Kenya Land Charge Registration
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link href="/about" className="hover:underline me-4 md:me-6">
              About
            </Link>
          </li>
          <li>
            <Link
              href="/privacy-policy"
              className="hover:underline me-4 md:me-6"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/licensing" className="hover:underline me-4 md:me-6">
              Licensing
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </section>
  );
}

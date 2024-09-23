import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpenText, CreditCard, Database } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                Kiathagana Financial Management LLC
                <span className="block text-sky-500">
                  Secure Your Property Rights
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Welcome to the official portal for land charge registration in
                Kenya. Protect your interests and manage your property
                transactions efficiently.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <Link
                  href="/registration"
                  className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-lg px-8 py-4 inline-flex items-center justify-center"
                >
                  Start Registration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <Image
                src="/hero.svg"
                alt="Description of the SVG"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sky-500 text-white">
                <BookOpenText />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  What is a Land Charge?
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  A land charge is a legal claim or interest in land that
                  affects the use or value of the property. It serves as
                  security for a loan or other obligation related to the land.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sky-500 text-white">
                <Database className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Why Register a Land Charge?
                </h2>
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                  <li>Secure your financial interests in property</li>
                  <li>Establish legal rights over land</li>
                  <li>Facilitate property transactions</li>
                  <li>Comply with Kenyan land laws</li>
                </ul>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-sky-500 text-white">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  Registration Process at a Glance
                </h2>
                <ol className="max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
                  <li>Fill out the registration form</li>
                  <li>Submit required documents</li>
                  <li>Pay registration fees</li>
                  <li>Receive confirmation</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Ready to Register your Land?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Our form provides everything you need to get your property
                secured quickly. Don't waste time on government offices - focus
                on the security.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <Link
                href="/registration"
                className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full text-xl px-12 py-6 inline-flex items-center justify-center"
              >
                Register
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

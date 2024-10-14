"use client";

import { ArrowRight, CheckCircle, FileText, Key, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <main className="overflow-hidden">
      <section className="py-20 bg-gradient-to-br from-sky-50 via-white to-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <motion.div
              className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
              initial="initial"
              animate="animate"
              variants={staggerChildren}
            >
              <motion.h1
                className="text-4xl font-bold text-gray-900 mt-10 tracking-tight sm:text-5xl md:text-6xl"
                variants={fadeIn}
              >
                Unlock Your Dream Lifestyle with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600">
                  Kiathagana
                </span>
              </motion.h1>
              <motion.p
                className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
                variants={fadeIn}
              >
                Whether it's your first piece of land or you're expanding your
                portfolio, we're here to support your journey. At Kiathagana, we
                believe in turning opportunities into achievements. Apply now,
                and take the first step toward securing the property of your
                dreams.
              </motion.p>
              <motion.div
                className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0"
                variants={fadeIn}
              >
                <Link
                  href="/login"
                  className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Explore Your Options Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src="/hero.svg"
                alt="Description of the SVG"
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-sky-100 via-white to-sky-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.h2
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-sky-900 mb-4"
              variants={fadeIn}
            >
              The Kiathagana Process
            </motion.h2>
            <motion.p
              className="text-xl text-sky-700 max-w-2xl mx-auto"
              variants={fadeIn}
            >
              Our streamlined process is designed with your dreams in mind.
              Let's turn your property aspirations into reality.
            </motion.p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {[
              {
                icon: <FileText className="h-8 w-8" />,
                title: "Start Your Journey",
                description:
                  "Tell us about your ideal property or land. We'll guide you through each step with care.",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Personalized Support",
                description:
                  "Our expert team crafts tailored options to perfectly match your unique needs and vision.",
              },
              {
                icon: <CheckCircle className="h-8 w-8" />,
                title: "Swift Approval",
                description:
                  "Experience a streamlined approval process designed for clarity and efficiency.",
              },
              {
                icon: <Key className="h-8 w-8" />,
                title: "Realize Your Dream",
                description:
                  "With approval in hand, you're just moments away from stepping into your new property.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center group"
                variants={fadeIn}
              >
                <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-semibold text-sky-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-sky-600">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="mt-16 text-center" variants={fadeIn}>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Begin Your Property Journey
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerChildren}
            >
              <motion.h2
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-700 to-sky-900 sm:text-4xl"
                variants={fadeIn}
              >
                Your Dream Property Awaits
              </motion.h2>
              <motion.p
                className="mt-3 max-w-3xl text-lg text-gray-600"
                variants={fadeIn}
              >
                Imagine waking up each day in a place that's truly yours. A
                sanctuary that reflects your dreams and aspirations. With
                Kiathagana, that vision is closer than you think. Take the first
                step towards your ideal future – it's just a click away.
              </motion.p>
            </motion.div>
            <motion.div
              className="mt-8 lg:mt-0 flex justify-center lg:justify-end"
              variants={fadeIn}
              initial="initial"
              animate="animate"
            >
              <Link
                href="/signup"
                className="bg-gradient-to-r from-sky-500 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white rounded-full text-xl px-12 py-6 inline-flex items-center justify-center transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Your Journey
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

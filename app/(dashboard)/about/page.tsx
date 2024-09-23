"use client";
import React, { useEffect } from "react";
import mailgo from "mailgo";

const AboutPage = () => {
  useEffect(() => {
    mailgo();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-sky-500 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <h1 className="mt-10 text-4xl md:text-5xl font-bold mb-4">
            About Kiathagana Financial Management LLC
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Empowering Small Businesses with Financial Solutions
          </p>
          <a
            className="bg-white text-sky-700 font-bold py-2 px-4 rounded-full hover:bg-blue-100 transition duration-300"
            href="mailto:mmwaniki2015@gmail.com?cc=mmwaniki2015@gmail.com,mmwaniki2015@gmail.com"
          >
            Get In Touch
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 mb-4">
            Kiathagana Financial Management LLC is a financial service company
            with a dual presence in Nairobi, Kenya, and Baltimore, Maryland.
            With decades of experience, we have built a solid reputation for
            providing loans to small business owners, helping them grow and
            succeed. Our rates are designed to be affordable, flexible, and
            competitive.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Our Prime Objective
          </h2>
          <p className="text-gray-600 mb-4">
            Our aim is simple: We aim to take make you succeed and grow your
            business. Our target market is small business owners because we
            identify with the hustles that come with starting a business from
            the ground up. We ensure we walk with you financially so you can
            grow your business to where you want it to be. We work with
            dedication and enthusiasm while applying innovation to improve how
            we take of you and your business. Our goal is to serve, achieve
            quality, be reliable, and provide you with a safe place to get
            financial help when you need it. We believe that when you win, we
            win. To promote a work culture of personal and professional growth,
            as well as productivity. We also work towards fostering human values
            that benefit the environment, the society, and most importantly, the
            people.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600">
              To be the premier provider of financial service solutions in Kenya
              and Maryland (U.S.).
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To deliver exceptional financial solutions in Kenya and Maryland,
              United States, operating with integrity, fostering high-quality
              relationships, and providing outstanding service to our customers.
            </p>
          </section>
        </div>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Our Values
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li className="mb-2">
              <strong>Quality and Commitment:</strong> We are dedicated to
              providing top-tier financial services, creating value,
              consistency, and customer satisfaction.
            </li>
            <li className="mb-2">
              <strong>Integrity and Transparency:</strong> We handle our
              customers' needs ethically, adhering to all relevant laws and
              regulations.
            </li>
            <li>
              <strong>Innovation:</strong> We continuously strive to enhance
              customer satisfaction through value addition and operational
              efficiency.
            </li>
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Our Process
          </h2>
          <ol className="list-decimal list-inside text-gray-600">
            <li className="mb-2">Fill out the online application form.</li>
            <li className="mb-2">
              Create a user account to complete your profile and track your
              activities.
            </li>
            <li className="mb-2">Upon approval, sign a loan contract.</li>
            <li className="mb-2">Receive a charge form for lien charges.</li>
            <li>
              After creating a lien on the property, we'll transfer funds to
              your account.
            </li>
          </ol>
          <p className="text-gray-600 mt-4">
            Throughout this process, a financial advisor will be available to
            guide you towards success.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Location and Contact
          </h2>
          <div className="text-gray-600">
            <p className="font-semibold">Baltimore Office:</p>
            <p>103 Village of Pine Court #1A</p>
            <p>Baltimore, MD 21244</p>
            <p className="mt-4">
              <strong>Email:</strong> mmwaniki2015@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> +1 443-675-8660
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-sky-500 text-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl mb-6">
            Let's discuss how we can help you achieve your financial goals.
          </p>
          <a
            className="bg-white text-sky-700 font-bold py-2 px-4 rounded-full hover:bg-blue-100 transition duration-300"
            href="mailto:mmwaniki2015@gmail.com?cc=mmwaniki2015@gmail.com,mmwaniki2015@gmail.com"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

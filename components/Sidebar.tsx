import { Home, MessageSquare, BarChart2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function Sidebar() {
  return (
    <>
      <div className="flex items-center mb-8">
        <Link href="/">
          <Image src="/k-law.png" height={50} width={50} alt="logo" />
        </Link>
        <span className="text-xl font-bold">Kiathagana</span>
      </div>
      <nav className="space-y-4 mb-auto">
        <a href="#" className="flex items-center text-blue-600">
          <Home className="mr-2 h-4 w-4" /> Dashboard
        </a>
        <a href="#" className="flex items-center text-gray-600">
          <MessageSquare className="mr-2 h-4 w-4" /> Messages
        </a>
        <a href="#" className="flex items-center text-gray-600">
          <BarChart2 className="mr-2 h-4 w-4" /> Analytics
        </a>
        <a href="#" className="flex items-center text-gray-600">
          <Settings className="mr-2 h-4 w-4" /> Settings
        </a>
      </nav>
      <div className="bg-gray-100 rounded-lg p-4 text-center mt-8">
        <Button className="w-full bg-blue-600 hover:bg-blue-700">Logout</Button>
      </div>
    </>
  );
}

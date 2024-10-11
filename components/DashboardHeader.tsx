import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "./Sidebar";

export function MobileHeader() {
  return (
    <div className="flex items-center lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="mr-2">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 sm:w-80">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <div className="flex items-center">
        <span className="text-xl font-bold">Kiathagana LLC</span>
      </div>
    </div>
  );
}

export function DashboardHeader({ user }: any) {
  return (
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1">
          Welcome Back, {user.fullName}
        </h2>
        <p className="text-gray-500">Friday, 3 March 2025</p>
      </div>
      <Tabs defaultValue="overview" className="w-full lg:w-[400px]">
        <TabsList className="w-full lg:w-auto">
          <TabsTrigger value="overview" className="flex-1 lg:flex-none">
            Overview
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex-1 lg:flex-none">
            Applications
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex-1 lg:flex-none">
            Payments
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex-1 lg:flex-none">
            Profile
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </header>
  );
}

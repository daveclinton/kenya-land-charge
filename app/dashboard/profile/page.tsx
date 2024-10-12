import LogoutButton from "./LogoutButton";
import ProfileDashboard from "./ProfileDashboard";
import { logout } from "@/lib/session";

const mockUser = {
  first_name: "John",
  last_name: "Doe",
  date_of_birth: "1990-01-01",
  phone_number: "+1234567890",
  address: "123 Main St, Anytown, USA",
  email: "john.doe@example.com",
  role: "user",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-sky-900">
              Your Profile Dashboard
            </h1>
            <LogoutButton />
          </div>
          <p className="text-sky-700 mb-8">
            Manage your personal information, update your password, and keep
            your account secure.
          </p>
          <ProfileDashboard user={mockUser} />
        </div>
      </div>
    </div>
  );
}

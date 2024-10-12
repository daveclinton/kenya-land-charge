import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-sky-50 to-sky-200">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-sky-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>
            We've sent a confirmation link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Please click the link in the email to confirm your account. If you
            don't see the email, check your spam folder.
          </p>
        </CardContent>
        <CardFooter className="text-center">
          <Button className="bg-sky-500 hover:bg-sky-600 text-white w-full">
            Resend Email
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

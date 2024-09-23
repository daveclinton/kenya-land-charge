import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type SuccessPageProps = {
  formData: any;
};

const SuccessPage: React.FC<SuccessPageProps> = ({ formData }) => {
  const router = useRouter();
  return (
    <div className="min-h-screen mt-20 flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            Registration Successful!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-6 text-gray-600">
            Your land charge registration has been successfully submitted.
            Please keep this information for your records.
          </p>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700">
                Registration Details:
              </h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <span className="font-medium">Name:</span> {formData.fullName}
                </li>
                <li>
                  <span className="font-medium">Email:</span> {formData.email}
                </li>
                <li>
                  <span className="font-medium">Title Number:</span>{" "}
                  {formData.titleNumber}
                </li>
                <li>
                  <span className="font-medium">Principal Amount:</span> KSH{" "}
                  {formData.principalAmount.toLocaleString()}
                </li>
                <li>
                  <span className="font-medium">Repayment Date:</span>{" "}
                  {formData.repaymentDate.toLocaleDateString()}
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700">Next Steps:</h3>
              <ol className="mt-2 list-decimal list-inside space-y-1 text-blue-600">
                <li>Check your email for a confirmation message</li>
                <li>Print this page for your records</li>
                <li>Await further instructions from our office</li>
              </ol>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button
              onClick={() => router.replace("/")}
              className="bg-sky-500 hover:bg-sky-700 text-white"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;

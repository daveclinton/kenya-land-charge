// Step3Form.tsx
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Step3FormProps = {
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
};

const Step3Form: React.FC<Step3FormProps> = ({
  handleFileUpload,
  isLoading,
}) => (
  <div>
    <h3 className="text-lg font-semibold">Document Uploads</h3>
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="text-lg font-bold">Important</AlertTitle>
      <AlertDescription>
        Please upload clear, legible scans or photos of the following documents:
      </AlertDescription>
    </Alert>
    <div className="space-y-2 mt-2">
      {[
        { label: "Title Deed", name: "titleDeed" },
        { label: "Charge Document", name: "chargeDocument" },
        { label: "Personal Insurance", name: "personalInsurance" },
        { label: "Power of Attorney", name: "powerOfAttorney" },
        { label: "Identification Document", name: "identificationDocument" },
      ].map((doc) => (
        <div key={doc.name}>
          <Label className="text-md font-semibold py-4" htmlFor={doc.name}>
            {doc.label}
          </Label>
          <Input
            id={doc.name}
            name={doc.name}
            type="file"
            onChange={handleFileUpload}
            accept=".pdf,.jpg,.jpeg,.png"
            required
          />
        </div>
      ))}
    </div>

    <Button
      type="submit"
      className="w-full mt-4 bg-sky-500 hover:bg-sky-700 text-white"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        "Submit"
      )}
    </Button>
  </div>
);

export default Step3Form;

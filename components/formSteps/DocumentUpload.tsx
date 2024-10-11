import React from "react";
import { Input } from "@/components/ui/input";

const DocumentUploadStep = ({ handleDocumentUpload }: any) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title Deed
        </label>
        <Input
          type="file"
          onChange={(e) => handleDocumentUpload(e, "titleDeed")}
          className="mb-4"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Charge Document
        </label>
        <Input
          type="file"
          onChange={(e) => handleDocumentUpload(e, "chargeDocument")}
          className="mb-4"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Personal Insurance
        </label>
        <Input
          type="file"
          onChange={(e) => handleDocumentUpload(e, "personalInsurance")}
          className="mb-4"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Power of Attorney
        </label>
        <Input
          type="file"
          onChange={(e) => handleDocumentUpload(e, "powerOfAttorney")}
          className="mb-4"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Identification Document
        </label>
        <Input
          type="file"
          onChange={(e) => handleDocumentUpload(e, "identificationDocument")}
          className="mb-4"
        />
      </div>
    </>
  );
};

export default DocumentUploadStep;

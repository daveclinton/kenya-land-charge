"use client";

import { createUser } from "@/lib/actions/user";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating...
        </>
      ) : (
        "Create Account"
      )}
    </Button>
  );
};

const SignUpForm = () => {
  const [state, formAction] = useFormState(createUser, {});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleSubmit = (formData: FormData) => {
    if (selectedDate) {
      formData.append("dateOfBirth", selectedDate.toISOString());
    }
    formAction(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>
            Sign up to get started with our service.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input type="text" id="fullName" name="fullName" required />
              {state.errors?.fullName && (
                <p className="text-sm text-destructive">
                  {state.errors.fullName}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" required />
              {state.errors?.email && (
                <p className="text-sm text-destructive">{state.errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" name="password" required />
              {state.errors?.password && (
                <p className="text-sm text-destructive">
                  {state.errors.password}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="123-456-7890"
              />
              {state.errors?.phoneNumber && (
                <p className="text-sm text-destructive">
                  {state.errors.phoneNumber}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {state.errors?.dateOfBirth && (
                <p className="text-sm text-destructive">
                  {state.errors.dateOfBirth}
                </p>
              )}
            </div>
            <SubmitButton />
            {state.message && (
              <p className="text-sm text-destructive mt-2">{state.message}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;

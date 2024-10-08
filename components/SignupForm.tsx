"use client";
import { createUser } from "@/lib/actions/user";
import { useFormState, useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
    >
      {pending ? "Creating ..." : "Create Account"}
    </button>
  );
};

const SignUpForm = () => {
  const [state, formAction] = useFormState(createUser, {});

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {state.errors?.fullName && (
          <p className="text-red-500 text-sm mt-1">{state.errors.fullName}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {state.errors?.email && (
          <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {state.errors?.password && (
          <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Enter your phone number:
          <br />
          <small>Format: 123-456-7890</small>
        </label>

        <input type="tel" id="phoneNumber" name="phoneNumber" />
        {state.errors?.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">
            {state.errors.phoneNumber}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="start"
          className="block text-sm font-medium text-gray-700"
        >
          Start date:
        </label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {state.errors?.dateOfBirth && (
          <p className="text-red-500 text-sm mt-1">
            {state.errors.dateOfBirth}
          </p>
        )}
      </div>

      <SubmitButton />
      {state.message && <p className="text-red-500 mt-2">{state.message}</p>}
    </form>
  );
};

export default SignUpForm;

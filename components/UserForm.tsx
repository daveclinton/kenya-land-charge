import { createUser } from "@/lib/actions/user";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

interface FormErrors {
  email?: string[];
  password?: string[];
  name?: string[];
}

interface FormState {
  message: string | null;
  errors: FormErrors;
}

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

const initialState: FormState = {
  message: null,
  errors: {},
};

const UserForm = () => {
  type ActionFunction = (formData: FormData) => Promise<{
    errors?: {
      email?: string[];
      password?: string[];
      name?: string[];
    };
    message?: string;
  }>;

  const [state, formAction] = useActionState(createUser as any, initialState);
  return (
    <form action={formAction} className="space-y-4">
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
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {state.errors?.name && (
          <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
        )}
      </div>
      <SubmitButton />
      {state.message && <p className="text-red-500 mt-2">{state.message}</p>}
    </form>
  );
};

export default UserForm;

"use client";

import { Login } from "@/lib/actions/user";
import { useFormState } from "react-dom";

const initialState = {
  message: null,
};

export function LoginForm() {
  const [state, formAction] = useFormState(Login as any, initialState);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Log In</button>
      {state.message && <p className="error">{state.message}</p>}
    </form>
  );
}

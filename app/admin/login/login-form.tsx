"use client";

import { useActionState } from "react";
import { signIn, type FormState } from "../actions";
import { keepFields } from "../keep-fields";

export function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(signIn, {});
  return (
    <form onSubmit={keepFields(action)} className="adm-form">
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="username" required autoFocus />
      </label>
      <label>
        <span>Password</span>
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {state.error && (
        <p className="adm-error" role="alert">
          {state.error}
        </p>
      )}
      <button className="adm-btn primary" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

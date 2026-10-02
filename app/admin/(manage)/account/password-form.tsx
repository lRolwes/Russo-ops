"use client";

import { useActionState } from "react";
import { changePassword, type FormState } from "../../actions";

export function PasswordForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(changePassword, {});
  return (
    <form action={action} className="adm-card adm-form adm-narrow">
      <label>
        <span>New password</span>
        <input name="password" type="password" autoComplete="new-password" minLength={8} required />
      </label>
      <label>
        <span>Type it again</span>
        <input name="confirm" type="password" autoComplete="new-password" minLength={8} required />
      </label>
      {state.error && (
        <p className="adm-error" role="alert">
          {state.error}
        </p>
      )}
      {state.ok && (
        <p className="adm-ok" role="status">
          {state.ok}
        </p>
      )}
      <div className="adm-actions">
        <button className="adm-btn primary" disabled={pending}>
          {pending ? "Saving…" : "Change password"}
        </button>
      </div>
    </form>
  );
}

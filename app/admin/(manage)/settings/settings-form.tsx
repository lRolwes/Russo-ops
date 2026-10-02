"use client";

import { useActionState } from "react";
import { saveSettings, type FormState } from "../../actions";

export function SettingsForm({ phone, email }: { phone: string; email: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveSettings, {});
  return (
    <form action={action} className="adm-card adm-form adm-narrow">
      <label>
        <span>Phone number</span>
        <input name="phone" type="tel" required defaultValue={phone} />
      </label>
      <label>
        <span>Email address</span>
        <input name="email" type="email" required defaultValue={email} />
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
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}

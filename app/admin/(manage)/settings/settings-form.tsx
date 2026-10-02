"use client";

import { useActionState } from "react";
import { saveSettings, type FormState } from "../../actions";
import { keepFields } from "../../keep-fields";

export function SettingsForm({
  phone,
  email,
  notifyEmail,
  mailOn,
}: {
  phone: string;
  email: string;
  notifyEmail: string;
  mailOn: boolean;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveSettings, {});
  return (
    <form onSubmit={keepFields(action)} className="adm-card adm-form adm-narrow">
      <label>
        <span>Phone number</span>
        <input name="phone" type="tel" required defaultValue={phone} />
      </label>
      <label>
        <span>Email address</span>
        <input name="email" type="email" required defaultValue={email} />
      </label>
      <label>
        <span>Send form alerts to</span>
        <input name="notify_email" type="email" defaultValue={notifyEmail} placeholder={email} />
        <small>
          Each new inquiry is emailed here. Leave blank to use the email address above.
          {!mailOn && " (Email alerts are not switched on yet — inquiries still appear under Inquiries.)"}
        </small>
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

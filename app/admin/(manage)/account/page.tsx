import { PasswordForm } from "./password-form";

export default function AccountPage() {
  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Change password</h1>
          <p className="adm-muted">Pick something at least 8 characters long.</p>
        </div>
      </div>
      <PasswordForm />
    </>
  );
}

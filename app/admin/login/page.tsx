import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="adm-login">
      <div className="adm-card">
        <img src="/roc-logo-light.png" alt="ROC" className="adm-login-logo" />
        <h1>Site manager</h1>
        <p className="adm-muted">Sign in to update opportunities and contact details.</p>
        <LoginForm />
      </div>
      <a className="adm-muted adm-back" href="/">
        ← Back to the website
      </a>
    </main>
  );
}

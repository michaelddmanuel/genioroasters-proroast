import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoMark } from "../components/Icon";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth">
      <div className="auth-left">
        <div className="auth-brand">
          <LogoMark size={30} color="#3B6AA7" accent="#6BB2EA" />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19, color: "var(--navy-mid)" }}>ProRoast</span>
        </div>
        <div className="auth-form-wrap">{children}</div>
        <div className="auth-foot">Genio Roasters – ProRoast Evolution</div>
      </div>
      <div className="auth-right" style={{ backgroundImage: "url(/assets/auth-photo.jpg)" }}>
        {/* "Roasted to perfection" title, subtitle and Contact Us pill are baked into the
            extracted design photo — no overlay needed for a 1:1 match */}
      </div>
    </div>
  );
}

export function SignIn() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ready = email.length > 3 && password.length > 3;
  return (
    <AuthLayout>
      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          nav("/live");
        }}
      >
        <div>
          <h1>Sign In</h1>
          <div className="lede">Welcome back! Please enter your details.</div>
        </div>
        <div className="field">
          <label>Email</label>
          <div className="control">
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Password</label>
          <div className="control">
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5 }}>
          <label style={{ display: "flex", gap: 8, alignItems: "center", color: "var(--gray-600)" }}>
            <input type="checkbox" /> Remember for 30 days
          </label>
          <Link to="/reset" style={{ fontWeight: 600, color: "var(--primary-500)" }}>Forgot password</Link>
        </div>
        <button type="submit" className={"btn " + (ready ? "btn-primary" : "btn-disabled")} disabled={!ready}>
          Sign in
        </button>
        <div className="auth-alt">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export function SignUp() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ready = name.length > 1 && email.length > 3 && password.length >= 8;
  return (
    <AuthLayout>
      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          nav("/live");
        }}
      >
        <div>
          <h1>Sign up</h1>
          <div className="lede">Start managing your roastery today.</div>
        </div>
        <div className="field">
          <label>Name*</label>
          <div className="control">
            <input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Email*</label>
          <div className="control">
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Password*</label>
          <div className="control">
            <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <span style={{ fontSize: 12.5, color: "var(--gray-500)" }}>Must be at least 8 characters.</span>
        </div>
        <button type="submit" className={"btn " + (ready ? "btn-primary" : "btn-disabled")} disabled={!ready}>
          Get started
        </button>
        <div className="auth-alt">
          Already have an account? <Link to="/signin">Log in</Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export function ResetPassword() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const ready = email.length > 3;
  return (
    <AuthLayout>
      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          nav("/signin");
        }}
      >
        <div>
          <h1>Reset password</h1>
          <div className="lede">Enter the email associated with your account.</div>
        </div>
        <div className="field">
          <label>Email</label>
          <div className="control">
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <button type="submit" className={"btn " + (ready ? "btn-primary" : "btn-disabled")} disabled={!ready}>
          Next
        </button>
        <div className="auth-alt">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </AuthLayout>
  );
}

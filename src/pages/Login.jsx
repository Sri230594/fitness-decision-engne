import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((firebaseError) => {
        setError(firebaseError.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Sign in to view or create your fitness routine.</p>

        {error && <div className="login-error">{error}</div>}

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <span>
          Need an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </main>
  );
}

export default Login;

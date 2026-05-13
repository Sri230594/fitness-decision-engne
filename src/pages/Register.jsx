import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    createUserWithEmailAndPassword(auth, email, password)
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
    <main className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <p>Create an account to save your routine and progress.</p>

        {error && <div className="register-error">{error}</div>}

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
            minLength="6"
            required
          />
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Register"}
        </button>

        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </main>
  );
}

export default Register;

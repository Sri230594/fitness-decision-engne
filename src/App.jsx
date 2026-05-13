import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Questionnaire from "./pages/Questionnaire";
import Routine from "./pages/Routine";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthChecked(true);
    });

    return unsubscribe;
  }, []);

  if (!authChecked) {
    return <Loading message="Checking login status..." />;
  }

  return (
    <>
      {currentUser && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={currentUser ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Dashboard currentUser={currentUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questionnaire"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Questionnaire currentUser={currentUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/routine"
          element={
            <ProtectedRoute currentUser={currentUser}>
              <Routine currentUser={currentUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={currentUser ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;

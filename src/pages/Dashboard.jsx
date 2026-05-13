import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "../components/Loading";
import RoutineCard from "../components/RoutineCard";
import ProgressTracker from "../components/ProgressTracker";
import "./Dashboard.css";

function Dashboard({ currentUser }) {
  const navigate = useNavigate();
  const [routineData, setRoutineData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProgress, setIsSavingProgress] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const routineRef = doc(db, "routines", currentUser.uid);

    getDoc(routineRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setRoutineData(snapshot.data());
        } else {
          setRoutineData(null);
        }
      })
      .catch((firebaseError) => {
        setError(firebaseError.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser.uid]);

  function handleToggleDay(dayNumber) {
    if (!routineData) return;

    const routineRef = doc(db, "routines", currentUser.uid);
    const updatedProgress = {
      ...routineData.progress,
      [dayNumber]: routineData.progress?.[dayNumber] !== true
    };

    setIsSavingProgress(true);
    setError("");

    updateDoc(routineRef, { progress: updatedProgress })
      .then(() => {
        setRoutineData({
          ...routineData,
          progress: updatedProgress
        });
      })
      .catch((firebaseError) => {
        setError(firebaseError.message);
      })
      .finally(() => {
        setIsSavingProgress(false);
      });
  }

  function handleDeleteRoutine() {
    const shouldDelete = window.confirm(
      "Delete this routine? You can take the questionnaire again later."
    );

    if (!shouldDelete) return;

    const routineRef = doc(db, "routines", currentUser.uid);
    setIsLoading(true);
    setError("");

    deleteDoc(routineRef)
      .then(() => {
        setRoutineData(null);
        navigate("/dashboard");
      })
      .catch((firebaseError) => {
        setError(firebaseError.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return <Loading message="Loading your dashboard..." />;
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Manage your saved routine and daily progress.</p>
        </div>
      </section>

      {error && <div className="dashboard-error">{error}</div>}

      {!routineData && (
        <section className="no-routine-panel">
          <h2>No routine yet</h2>
          <p>Answer a few questions and the app will create a simple routine.</p>
          <Link className="dashboard-primary-link" to="/questionnaire">
            Create Routine
          </Link>
        </section>
      )}

      {routineData && (
        <div className="dashboard-grid">
          <div className="dashboard-main-column">
            <RoutineCard routine={routineData.routine} />
            <button className="delete-routine-button" onClick={handleDeleteRoutine}>
              Delete Routine
            </button>
          </div>
          <ProgressTracker
            routine={routineData.routine}
            progress={routineData.progress || {}}
            isSaving={isSavingProgress}
            onToggleDay={handleToggleDay}
          />
        </div>
      )}
    </main>
  );
}

export default Dashboard;

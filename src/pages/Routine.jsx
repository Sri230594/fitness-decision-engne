import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "../components/Loading";
import RoutineCard from "../components/RoutineCard";
import "./Routine.css";

function Routine({ currentUser }) {
  const [routineData, setRoutineData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getDoc(doc(db, "routines", currentUser.uid))
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

  if (isLoading) {
    return <Loading message="Loading routine..." />;
  }

  return (
    <main className="routine-page">
      <div className="routine-page-header">
        <h1>Routine</h1>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>

      {error && <div className="routine-error">{error}</div>}

      {!routineData && (
        <section className="routine-empty">
          <h2>No routine found</h2>
          <p>Create a routine from the questionnaire first.</p>
          <Link to="/questionnaire">Create Routine</Link>
        </section>
      )}

      {routineData && <RoutineCard routine={routineData.routine} />}
    </main>
  );
}

export default Routine;

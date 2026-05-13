import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { generateRoutine } from "../utils/routineGenerator";
import "./Questionnaire.css";

function Questionnaire({ currentUser }) {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    goal: "fat_loss",
    experience: "beginner",
    daysAvailable: "3",
    equipment: "home"
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setAnswers({
      ...answers,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    const routine = generateRoutine(answers);
    const progress = {};

    routine.days.forEach((day) => {
      progress[day.dayNumber] = false;
    });

    const routineData = {
      userId: currentUser.uid,
      answers,
      routine,
      progress,
      createdAt: serverTimestamp()
    };

    setDoc(doc(db, "routines", currentUser.uid), routineData)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((firebaseError) => {
        setError(firebaseError.message);
      })
      .finally(() => {
        setIsSaving(false);
      });
  }

  return (
    <main className="questionnaire-page">
      <form className="questionnaire-form" onSubmit={handleSubmit}>
        <h1>Create Your Routine</h1>
        <p>Choose the options that best match your current situation.</p>

        {error && <div className="questionnaire-error">{error}</div>}

        <label>
          Goal
          <select name="goal" value={answers.goal} onChange={handleChange}>
            <option value="fat_loss">Fat loss</option>
            <option value="strength">Strength</option>
            <option value="general_fitness">General fitness</option>
          </select>
        </label>

        <label>
          Experience
          <select
            name="experience"
            value={answers.experience}
            onChange={handleChange}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
          </select>
        </label>

        <label>
          Days available
          <select
            name="daysAvailable"
            value={answers.daysAvailable}
            onChange={handleChange}
          >
            <option value="3">3 days</option>
            <option value="4">4 days</option>
            <option value="5">5 days</option>
          </select>
        </label>

        <label>
          Equipment
          <select name="equipment" value={answers.equipment} onChange={handleChange}>
            <option value="gym">Gym</option>
            <option value="home">Home</option>
            <option value="bodyweight">Bodyweight</option>
          </select>
        </label>

        <button type="submit" disabled={isSaving}>
          {isSaving ? "Saving routine..." : "Generate and Save Routine"}
        </button>
      </form>
    </main>
  );
}

export default Questionnaire;

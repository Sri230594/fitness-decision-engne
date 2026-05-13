import "./RoutineCard.css";

function RoutineCard({ routine }) {
  return (
    <section className="routine-card">
      <div className="routine-card-header">
        <h2>{routine.title}</h2>
        <p>{routine.description}</p>
      </div>

      <div className="routine-days">
        {routine.days.map((day) => (
          <article className="routine-day" key={day.dayNumber}>
            <h3>
              Day {day.dayNumber}: {day.name}
            </h3>
            <div className="exercise-list">
              {day.exercises.map((exercise) => (
                <div className="exercise-item" key={exercise.name}>
                  <div>
                    <strong>{exercise.name}</strong>
                    <p>{exercise.notes}</p>
                  </div>
                  <span>
                    {exercise.sets} sets x {exercise.reps}
                  </span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RoutineCard;

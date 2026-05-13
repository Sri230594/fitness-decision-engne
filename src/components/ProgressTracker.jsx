import "./ProgressTracker.css";

function ProgressTracker({ routine, progress, isSaving, onToggleDay }) {
  return (
    <section className="progress-tracker">
      <div className="progress-header">
        <h2>Daily Progress</h2>
        {isSaving && <span>Saving...</span>}
      </div>

      <div className="progress-list">
        {routine.days.map((day) => {
          const isComplete = progress[day.dayNumber] === true;

          return (
            <label className="progress-item" key={day.dayNumber}>
              <input
                type="checkbox"
                checked={isComplete}
                disabled={isSaving}
                onChange={() => onToggleDay(day.dayNumber)}
              />
              <span>
                Day {day.dayNumber}: {day.name}
              </span>
              <strong>{isComplete ? "Complete" : "Incomplete"}</strong>
            </label>
          );
        })}
      </div>
    </section>
  );
}

export default ProgressTracker;

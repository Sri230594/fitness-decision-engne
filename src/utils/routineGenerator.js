function buildDay(dayNumber, name, exercises) {
  return {
    dayNumber,
    name,
    exercises
  };
}

function exercise(name, sets, reps, notes) {
  return {
    name,
    sets,
    reps,
    notes
  };
}

export function generateRoutine(answers) {
  const { goal, experience, daysAvailable, equipment } = answers;
  const dayCount = Number(daysAvailable);

  if (
    experience === "beginner" &&
    goal === "fat_loss" &&
    dayCount === 3 &&
    equipment === "home"
  ) {
    return {
      title: "3-Day Home Fat Loss Routine",
      description:
        "A simple beginner plan focused on full-body movement, steady effort, and short conditioning finishers.",
      days: [
        buildDay(1, "Full Body Cardio Strength", [
          exercise("Bodyweight Squat", 3, "12", "Move with control."),
          exercise("Incline Push-up", 3, "8-10", "Use a table or counter."),
          exercise("Marching High Knees", 3, "30 seconds", "Keep a steady pace.")
        ]),
        buildDay(2, "Lower Body and Core", [
          exercise("Reverse Lunge", 3, "10 each leg", "Step back softly."),
          exercise("Glute Bridge", 3, "12", "Pause at the top."),
          exercise("Plank", 3, "20-30 seconds", "Keep hips level.")
        ]),
        buildDay(3, "Full Body Circuit", [
          exercise("Step-up", 3, "10 each leg", "Use a stable step."),
          exercise("Standing Shoulder Tap", 3, "12 each side", "Avoid twisting."),
          exercise("Fast Walk or Jog in Place", 3, "45 seconds", "Finish strong.")
        ])
      ]
    };
  }

  if (
    experience === "intermediate" &&
    goal === "strength" &&
    dayCount === 5 &&
    equipment === "gym"
  ) {
    return {
      title: "5-Day Gym Strength Routine",
      description:
        "An intermediate gym plan with focused strength days and enough weekly volume to progress steadily.",
      days: [
        buildDay(1, "Squat Focus", [
          exercise("Back Squat", 4, "5", "Add weight only with solid form."),
          exercise("Leg Press", 3, "8", "Control the lowering phase."),
          exercise("Calf Raise", 3, "12", "Pause at the top.")
        ]),
        buildDay(2, "Bench Focus", [
          exercise("Bench Press", 4, "5", "Keep shoulder blades tight."),
          exercise("Incline Dumbbell Press", 3, "8", "Use a smooth path."),
          exercise("Cable Triceps Pressdown", 3, "10", "Lock out each rep.")
        ]),
        buildDay(3, "Pull Strength", [
          exercise("Deadlift", 4, "4", "Brace before each pull."),
          exercise("Lat Pulldown", 3, "8-10", "Pull elbows down."),
          exercise("Seated Cable Row", 3, "10", "Do not lean back too far.")
        ]),
        buildDay(4, "Shoulders and Arms", [
          exercise("Overhead Press", 4, "5", "Keep ribs down."),
          exercise("Lateral Raise", 3, "12", "Lead with elbows."),
          exercise("Dumbbell Curl", 3, "10", "Avoid swinging.")
        ]),
        buildDay(5, "Full Body Strength", [
          exercise("Front Squat", 3, "6", "Stay upright."),
          exercise("Dumbbell Row", 3, "8 each side", "Pull toward ribs."),
          exercise("Farmer Carry", 3, "40 meters", "Walk tall.")
        ])
      ]
    };
  }

  const baseExercises =
    equipment === "gym"
      ? [
          exercise("Goblet Squat", 3, "10", "Choose a manageable weight."),
          exercise("Machine Chest Press", 3, "10", "Control each rep."),
          exercise("Lat Pulldown", 3, "10", "Pull to upper chest.")
        ]
      : [
          exercise("Squat", 3, "12", "Keep knees tracking forward."),
          exercise("Push-up", 3, "8-12", "Modify as needed."),
          exercise("Plank", 3, "30 seconds", "Brace your core.")
        ];

  return {
    title: `${dayCount}-Day General Fitness Routine`,
    description:
      "A balanced routine for building consistency with strength, movement quality, and basic conditioning.",
    days: Array.from({ length: dayCount }, (_, index) =>
      buildDay(index + 1, `Balanced Training ${index + 1}`, baseExercises)
    )
  };
}

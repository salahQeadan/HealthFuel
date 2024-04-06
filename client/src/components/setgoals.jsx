import React, { useState, useEffect } from "react";
import axios from "axios";

const Goals = () => {
  const [userEmail, setUserEmail] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [currentLength, setCurrentLength] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [muscleGain, setmuscleGain] = useState("");
  const [age, setAge] = useState(22);
  const [sex, setSex] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');

  const handleCurrentWeightChange = (event) => {
    setCurrentWeight(event.target.value);
  };

  const handleCurrentLengthChange = (event) => {
    setCurrentLength(event.target.value);
  };

  const handleGoalWeightChange = (event) => {
    setGoalWeight(event.target.value);
  };

  const handlemuscleGainChange = (event) => {
    setmuscleGain(event.target.value);
  };



  const handleRefresh = () => {
    //window.location.reload();
  };

  function calculateDailyNeeds(weight, height, age, sex, activityLevel) {
    // Calculate Basal Metabolic Rate (BMR)
    let bmr;
    if (sex === "male") {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (sex === "female") {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
      throw new Error("Invalid sex input. Expected 'male' or 'female'.");
    }

    // Calculate Total Daily Energy Expenditure (TDEE) based on activity level
    let tdee;
    switch (activityLevel) {
      case "sedentary":
        tdee = bmr * 1.2;
        break;
      case "lightly active":
        tdee = bmr * 1.375;
        break;
      case "moderately active":
        tdee = bmr * 1.55;
        break;
      case "very active":
        tdee = bmr * 1.725;
        break;
      default:
        throw new Error("Invalid activity level input. Expected 'sedentary', 'lightly active', 'moderately active', or 'very active'.");
    }

    // Calculate protein needs (in grams)
    const proteinNeeds = weight; // 1 gram per kilogram of body weight

    return {
      calories: tdee,
      protein: proteinNeeds,
    };
  };


  const calculateExerciseDays = (weight, height) => {
    const bmi = weight / ((height / 100) ** 2);
    let recommendedDays;

    if (bmi < 18.5) { // Underweight
      recommendedDays = 3;
    } else if (bmi >= 18.5 && bmi < 22.9) { // Normal weight
      recommendedDays = 4;
    } else if (bmi >= 22.9 && bmi < 29.9) { // Overweight
      recommendedDays = 5;
    } else if (bmi >= 30) { // Obesity
      recommendedDays = 6;
    } else { // Default
      recommendedDays = 3;
    }
    return recommendedDays;
  };

  useEffect(() => {
    // Retrieve user's email from local storage
    const userEmail = localStorage.getItem("email");
    setUserEmail(userEmail);
    //console.log(userEmail);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const calculatedExerciseDays = calculateExerciseDays(currentWeight, currentLength);
    const dailyNeeds = calculateDailyNeeds(currentWeight, currentLength, age, sex, activityLevel);
    console.log(userEmail, currentWeight, goalWeight, muscleGain, calculatedExerciseDays, dailyNeeds);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/setgoals",
        {
          email: userEmail,
          currentWeight: currentWeight,
          currentLength: currentLength,
          goalWeight: goalWeight,
          muscleGain: muscleGain,
          exerciseDays: calculatedExerciseDays,
          protein: dailyNeeds.protein,
          calories: dailyNeeds.calories
        }
      );

      console.log("Goals set successfully:", response.data.message);
    } catch (error) {
      console.log("Error setting goals:", error);
    }
  };

  return (
    <div>
      <h2>Set Your Goals</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Current Weight:
          <input
            type="number"
            name="currentWeight"
            value={currentWeight}
            onChange={handleCurrentWeightChange}
          />
        </label>
        <br />
        <label>
          Height:
          <input
            type="double"
            name="height"
            value={currentLength}
            onChange={handleCurrentLengthChange}
          />
        </label>
        <br />
        <label>
          Goal Weight:
          <input
            type="number"
            name="goalWeight"
            value={goalWeight}
            onChange={handleGoalWeightChange}
          />
        </label>
        <br />
        <label>
          muscle gain:
          <input
            type="number"
            name="muscleGain"
            value={muscleGain}
            onChange={handlemuscleGainChange}
          />
        </label>
        <button
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "rgb(63, 235, 177)",
            borderRadius: "20px",
            width: "120px",
            height: "40px",
            fontWeight: "bold",
            fontSize: "14px",
            cursor: "pointer",
            marginRight: "20px",
          }}
          name="submitGoals"
          type="submit"
          onClick={handleRefresh}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Goals;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/css/displaygoals.css";
import weightImage from "./images/istockphoto.jpg";
import Map from "./map";
import SetGoals from "./setgoals";

const GoalsDisplay = ({
  currentWeight,
  currentLength,
  goalWeight,
  dailyCalorieGoal,
  exerciseGoal,
}) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    setUserEmail(userEmail);
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetchGoals();
    }
  }, [userEmail]);

  useEffect(() => {
    console.log(goals);
  }, [goals]);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  async function fetchGoals() {
    try {
      console.log(userEmail);
      const params = new URLSearchParams([["email", userEmail]]);
      const response = await axios.get(
        "http://localhost:4000/api/user/getgoals",
        { params }
      );
      //console.log(response.data.goals);
      //savegoals(response.data.goals);
      setGoals(response.data.goals);
      //console.log(goals);
      //console.log(goals[1]);
      //console.log(goals[1]?.exerciseDays);
    } catch (error) {
      console.log("fetchGoals: ", error);
    }
  }

  function calculateBMI(weight, height) {
    // Calculate BMI using the formula: weight / (height * height)
    let height1 = height / 100;
    const bmi = weight / (height1 * height1);

    // Round the BMI value to two decimal places
    const roundedBMI = bmi.toFixed(2);

    return roundedBMI;
  }

  return (
    <div className="goals-display-container">
      <h2>My Goals</h2>
      <div className="goals-display">
        <div className="goal">
          <div className="goal-label">Current Weight:</div>
          <div className="goal-value" id="currentWeight">{goals.currentWeight} Kg</div>
        </div>
        <div className="goal">
          <div className="goal-label">Height:</div>
          <div className="goal-value" id="currentLength">{goals.currentLength} Cm</div>
        </div>
        <div className="goal">
          <div className="goal-label">Goal Weight:</div>
          <div className="goal-value" id="goalWeight">{goals.goalWeight} Kg</div>
        </div>
        <div className="goal">
          <div className="goal-label">Muscle Gain:</div>
          <div className="goal-value" id="muscleGain">{goals.muscleGain} Kg</div>
        </div>
        <div className="goal">
          <div className="goal-label">Training Days in a Week:</div>
          <div className="goal-value" id="exerciseDays">{goals.exerciseDays}</div>
        </div>
        <div className="goal">
          <div className="goal-label">Body Mass Index - BMI:</div>
          <div className="goal-value" id="BMI">
            {calculateBMI(goals.currentWeight, goals.currentLength)}
          </div>
        </div>
        <div className="goal">
          <div className="goal-label">Daily protin</div>
          <div className="goal-value" id="protein">{goals.protein} gr
          </div>
        </div>
        <div className="goal">
          <div className="goal-label">Daily calories</div>
          <div className="goal-value" id="calories">{goals.calories}
          </div>
        </div>
      </div>

      <div className="motivation-container">
        <img src={weightImage} alt="Weight Loss" className="motivation-image" />
        <Map />
      </div>

      <button className="setgoalsbutton" onClick={openPopup}>
        Set Goals
      </button>

      {isPopupOpen && <SetGoals closePopup={closePopup} />}
      {isPopupOpen && <div className="popup-overlay" onClick={closePopup} />}
    </div>
  );
};

export default GoalsDisplay;
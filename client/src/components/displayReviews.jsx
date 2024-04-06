import "../components/css/displaygoals.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayReviews = () => {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const response = await axios.get(
                'http://localhost:4000/api/user/getReviews');
            setFeedback(response.data);
        } catch (error) {
            console.log('fetchFeedback: ', error);
        }
    };

    return (
        <div className="goals-display-container">
            <div className="goals-display">
                {feedback.map((item) => (
                    <div className="goal" key={item._id}>
                        <div className="goal-row">
                            <div className="goal-label">User Email:</div>
                            <div className="goal-value">{item.email}</div>
                        </div>
                        <div className="goal-row">
                            <div className="goal-label">Feedback:</div>
                            <div className="goal-value">{item.feedback}</div>
                        </div>
                        <hr className="divider" />
                    </div>
                ))}
            </div>

        </div>
    );
};

export default DisplayReviews;

/*
const DisplayReviews = () => ({
    currentWeight,
    currentLength,
    goalWeight,
    dailyCalorieGoal,
    exerciseGoal,
}) => {
    const [feedback, setFeedback] = useState([]);
    const [userEmail, setUserEmail] = useState("");  

    const fetchReviews = async () => {
        try {
            console.log(userEmail);
            const params = new URLSearchParams([["email", userEmail]]);
            const response = await axios.get(
                "http://localhost:4000/api/user/getReviews",
                { params }
            );
            //console.log(response.data.goals);
            //savegoals(response.data.goals);
            setFeedback(response.data.goals);
            //console.log(goals);
            //console.log(goals[1]);
            //console.log(goals[1]?.exerciseDays);
        } catch (error) {
            console.log("fetchGoals: ", error);
        }
    };

    return (
        <div className="goals-display-container">
      <h2>Users Feedback</h2>
      <div className="goals-display">
        <div className="goal">
          <div className="goal-label">Current Weight:</div>
          <div className="goal-value" id="currentWeight"> Kg</div>
        </div>
        <div className="goal">
          <div className="goal-label">Height:</div>
          <div className="goal-value" id="currentLength"> Cm</div>
        </div>
        <div className="goal">
        </div>
      </div>
    </div>
    );
};

export default DisplayReviews;
*/
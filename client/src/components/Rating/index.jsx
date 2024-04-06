import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import "./index.css"
import axios from "axios";

const Rate = () => {
  const [users, setUsers] = useState([]);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  async function AddRating(id) {
    try {
      const response = await axios.post("http://localhost:4000/api/users/AddRating", {
        userId: id,
      });
      console.log("AddRating: ", response.data.message);
    } catch (error) {
      console.log("AddRating: ", error);
    }
  }

  return (
    <form onSubmit={AddRating}>
      <div className="rating-container">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#c4e5e9"}
                size={100}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          )
        })}
        <p>The rating is {rating}.</p>
      </div>
      <button type="submit" >
        Add
      </button>
    </form>
  )
};


export default Rate;
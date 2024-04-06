import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ReviewModal.css"; // import your css
import { useNavigate } from "react-router-dom";

const ReviewModal = ({ onClose }) => {
  const form = useRef();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    fetchUser(userEmail);
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains("review-modal")) {
      navigate("/");
    }
  };

  async function fetchUser(userEmail) {
    const urlEncodedEmail = encodeURIComponent(userEmail);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/user/email/${urlEncodedEmail}`
      );
      setName(response.data.firstName);
      setUserEmail(response.data.email);
    } catch (error) {
      console.log("fetchUser: ", error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/reviews",
        {
          email: userEmail,
          feedback: message,
        }
      );

      console.log("Feedback sent successfully:", response.data.message);
      // Optional: Close the modal after submitting
      onClose();
    } catch (error) {
      console.log("Error sending feedback:", error);
      setStatus("Error sending feedback.");
    }
  };
  return (
    <div className="review-modal" onClick={handleModalClick}>
      <div className="review-modal-content">
        <form ref={form} onSubmit={handleSubmit}>
          <h2>Give us your thoughts about the website!</h2>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Email:</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={userEmail}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Feedback:</label>
            <textarea
              name="message"
              value={message}
              onChange={handleMessageChange}
              className="contact-textarea"
            />
          </div>
          <button type="submit" className="review-modal-submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;

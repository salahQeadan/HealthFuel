import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./reuests.css";
import axios from 'axios';

// npm i @emailjs/browser
const Requests = () => {
  const form = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
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

  async function fetchUser(userEmail) {
    const urlEncodedEmail = encodeURIComponent(userEmail);
    try {
      const response = await axios.get(`http://localhost:4000/api/user/email/${urlEncodedEmail}`);
      setName(response.data.firstName);
      setUserEmail(response.data.email);
    } catch (error) {
      console.log("fetchUser: ", error);
    }
  }

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_4ik89zv",
        "template_rkgcqoo",
        form.current,
        "Ac1RL4TgJZVZgpMSY"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          alert("your message has been sent.");
          setName("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          console.log(error.text);
          setStatus("Error sending message.");
        }
      );
  };
  return (


    <form className="" ref={form} onSubmit={sendEmail}>
      <div className="profile">
      <div className="card_container">
          <div className="_card">
            <h2>Request to be a volunteer</h2>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input id="firstName" name="firstName" type="text" value={name} onChange={handleNameChange} />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Email</label>
              <input id="lastName" name="lastName" type="text" value={userEmail} onChange={handleEmailChange} />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Why do you want to be a volunteer? Talk about yourself</label>
              <textarea
                name="message"
                value={message}
                onChange={handleMessageChange}
                className="contact-textarea"
              />
            </div>
            <button
              data-testid="request-button"
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      {status && <div>{status}</div>}
    </form >
  );
};
export default Requests;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./styles.css";
import Goalsdisplay from "../goalsDisplay";
import Modal from "../Modal/Modal";
const Main = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    window.location.reload();
  };

  async function fetchAllExercises() {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/exercises/all"
      );
      setExercises(response.data);
    } catch (error) {
      console.log("fetchAllExercises: ", error);
    }
  }

  useEffect(async () => {
    await fetchAllExercises();
  }, []);

  const showModal = (data) => {
    setModalContent(data);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {user && <Navbar handleLogout={handleLogout} />}
      <Modal visible={modalVisible} onClose={closeModal} data={modalContent} />
      <div className="mainDiv">
      </div>
      <Goalsdisplay />
      <div className="exercises-container">
        {exercises.map((data) => (
          < div
            key={data.id}
            className="exercise-card"
            onClick={() => showModal(data)}
          >
            <h3>{data.exercise_name}</h3>
            <div className="video-container" data-testid="video-container">
              <video width="320" height="240" controls>
                (
                {data.videoURL.map((url, index) => (
                  <source key={index} src={url} type="video/mp4" />
                ))}
                Your browser does not support the video tag.
                )
              </video>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Main;

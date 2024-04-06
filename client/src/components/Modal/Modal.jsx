import React from "react";
import "./Modal.css";

const Modal = ({ visible, onClose, data }) => {
    if (!visible) return null;

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal">
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
                <h3>{data.exercise_name}</h3>
                <p>Category: {data.Category}</p>
                <p>Difficulty: {data.Difficulty}</p>
                <p>Force: {data.Force}</p>
                <p>Grips: {data.Grips}</p>
                <p>Primary Target: {data.target.Primary.join(", ")}</p>
                <div className="video-container">
                    <video width="320" height="240" controls>
                        (
                        {data.videoURL.map((url, index) => (
                            <source key={index} src={url} type="video/mp4" />
                        ))}
                        )
                    </video>
                </div>
                <div className="details">
                    <h4>Steps:</h4>
                    <ol>
                        {data.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                    <h4>{data.details ? "Details:" : ""}</h4>
                    <p>{data.details}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;


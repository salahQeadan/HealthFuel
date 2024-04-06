import "./Volunteers.css";
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

function Volunteers() {
    const email = localStorage.getItem("email");
    const [users, setUsers] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentEmail, setCurrentEmail] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [ratedUsers, setRatedUsers] = useState([]);

    console.log(email);

    useEffect(async () => {
        await fetchAllVolunteer()
    }, []);

    async function fetchAllVolunteer() {

        try {
            const response = await axios.get("http://localhost:4000/api/users/allVolunteer");
            console.log("fetchAllVolunteer:", response.data);
            setUsers(response.data)
        } catch (error) {
            console.log("fetchAllVolunteer: ", error);
        }
    }

    async function AddRating() {
        try {
            const response = await axios.put("http://localhost:4000/api/user/AddRating", {
                userEmail: currentEmail,
                rating,
                comment,
                raterEmail: email,
            });
            console.log("AddRating: ", response.data.message);
            setRatedUsers([...ratedUsers, currentEmail]); // Push current rated user to the list
        } catch (error) {
            console.log("AddRating: ", error);
        }
        await fetchAllVolunteer();
        setModalIsOpen(false);
    }

    const averageRating = (ratingsArray) => {
        if (ratingsArray.length === 0) return 0; // Return 0 when no ratings
        const sum = ratingsArray.reduce((a, b) => a + b, 0);
        return Number((sum / ratingsArray.length).toFixed(1));
    }

    return (
        <div className="volunteers">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="modal-content"
                overlayClassName="modal-overlay"
            >
                <h2>Rate the volunteer</h2>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    placeholder="Rate (1-5)"
                />
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Leave a comment"></textarea>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button onClick={AddRating}>Submit</button>
                    <button onClick={() => setModalIsOpen(false)}>Close</button>
                </div>
            </Modal>
            <div className="cardContainer">
                {users.map(data => (
                    <div className="Card" data-testid="Card" key={data._id}>
                        <img src="https://th.bing.com/th/id/OIP.a0fM1-y4XOYg-a_VC0wfJgHaHa?pid=ImgDet&rs=1" />
                        <h2>Name: {data.firstName}</h2>
                        <h2>Email: {data.email}</h2>
                        <div>Rate: {<StarRatings
                            rating={averageRating(data.ratings)}
                            numberOfStars={5}
                            name='rating'
                            starDimension="20px"
                            starSpacing="2px"
                        />}</div>
                        <div className="comments-container">
                            {data.comments && data.comments.map((comment, index) => (
                                <p key={index}>{comment}</p>
                            ))}
                        </div>
                        {!data.ratedBy?.includes(email) && <button className="button_rate" onClick={() => { setCurrentEmail(data.email); setModalIsOpen(true) }}>Rate</button>}
                    </div>
                ))}

            </div>

        </div >
    );
}

export default Volunteers;

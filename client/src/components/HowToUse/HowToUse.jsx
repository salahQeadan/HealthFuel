import React from 'react';
import './HowToUse.css'; // replace with your own CSS file

const HowToUse = () => {
  return (
    <div className="how-to-use-contantForm"> 
    <div className="how-to-use-container">
       <h2>How to Use Our Website</h2>
      <ol>
        <li>Create an account by clicking on the "Sign Up" button on the top right corner of the page.</li>
        <li>Log in to your account by clicking on the "Log In" button and entering your credentials.</li>
        <li>Browse the website to find the content you are interested in.</li>
        <li>Use the search bar to search for specific content.</li>
        <li>Click on the content to view more details.</li>
        <li>Add content to your favorites by clicking on the "Add to Favorites" button.</li>
        <li>View your favorites by clicking on the "Favorites" button on the top right corner of the page.</li>
        <li>Log out of your account by clicking on the "Log Out" button.</li>
      </ol>
    </div>
    </div>
  );
};

export default HowToUse;

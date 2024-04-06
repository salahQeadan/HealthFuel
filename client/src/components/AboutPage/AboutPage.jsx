import "./AboutPage.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function AboutPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main>
      <section id="about">
        <h2>About Us</h2>
        <p>
          Excess obesity and malnutrition are serious social problems that can
          have negative health impacts on individuals and society. According to
          the World Health Organization, worldwide obesity rates have tripled
          since 1975, with over 1.9 billion adults being classified as
          overweight or obese. In addition, malnutrition affects 1 in 3 people
          globally, with undernutrition and micronutrient deficiencies being
          major causes of morbidity and mortality. These problems are
          particularly prevalent in low- and middle-income countries, where
          access to healthy foods and nutrition education may be limited.
        </p>
        <p>
          To address these issues, a comprehensive solution is needed that
          empowers individuals to make informed decisions about their nutrition
          and helps them achieve their health and wellness goals. Providing
          access to a database of nutritional information through a
          user-friendly website can be a powerful tool in achieving this goal.
          By leveraging the power of APIs and open databases, individuals can
          easily access comprehensive and accurate nutritional information and
          track their own nutrition to meet their personalized goals. Such a
          website can also serve as an educational resource for individuals
          seeking to learn more about nutrition and how it impacts their health.
          By addressing the root causes of excess obesity and malnutrition, we
          can work towards creating a healthier and more equitable society.
        </p>
      </section>
    </main>
  );
}

export default AboutPage;

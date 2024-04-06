const router = require("express").Router();
const { User } = require("../models/user");
const { Goal } = require("../models/goal");
const { json } = require("express");
const { Reviews } = require("../models/reviews");

router.get("/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);
    let user = await User.findOne({ email });
    user = user.toObject();
    delete user.password;
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/id/:id", async (req, res) => {
  try {
    const { firstName, lastName, isVolunteer } = req.body;
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .send({ message: "User with given ID doesn't exist!" });
    user.firstName = firstName;
    user.lastName = lastName;
    user.isVolunteer = isVolunteer;
    await user.save();
    res.status(200).send({ message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/toggle-admin", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.isAdmin) {
      user.isAdmin = false;
    } else {
      user.isAdmin = true;
    }

    await user.save();

    if (user.isAdmin) {
      res.status(200).send({ message: "Admin added successfully" });
    } else {
      res.status(200).send({ message: "Admin removed successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/toggle-volunteer", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.isVolunteer) {
      user.isVolunteer = false;
    } else {
      user.isVolunteer = true;
    }

    await user.save();

    if (user.isVolunteer) {
      res.status(200).send({ message: "Admin added successfully" });
    } else {
      res.status(200).send({ message: "Admin removed successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Set up the /setgoals route
router.post("/setgoals", async (req, res) => {
  try {
    const {
      email,
      currentWeight,
      currentLength,
      goalWeight,
      muscleGain,
      exerciseDays,
      protein,
      calories,
    } = req.body;
    const user = await Goal.findOne({ email });

    if (!user) {
      // If goal doesn't exist for the user, create a new one
      const newGoal = new Goal({
        email,
        currentWeight,
        currentLength,
        goalWeight,
        muscleGain,
        exerciseDays,
        protein,
        calories,
      });
      await newGoal.save();
    } else {
      // If goal already exists, update the existing goal
      user.currentWeight = currentWeight;
      user.currentLength = currentLength;
      user.goalWeight = goalWeight;
      user.muscleGain = muscleGain;
      user.exerciseDays = exerciseDays;
      user.protein = protein;
      user.calories = calories;
      await user.save();
    }

    return res.status(200).send({ message: "Goals set successfully" });
  } catch (error) {
    console.error("Error setting goals:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/getgoals", async (req, res) => {
  try {
    //const { em } = req.query;
    const em = req.query.email; // Retrieve the value of the 'email' query parameter
    //const em = "salahqe@ac.sce.ac.il" ;
    //console.log(em);
    const user = await Goal.findOne({ email: em });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res
      .status(200)
      .send({ message: "Goals retrieved successfully", goals: user });
  } catch (error) {
    console.error("Error retrieving goals:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.delete("/deleteuser", async (req, res) => {
  try {
    const em = req.query.email;
    const user = await User.deleteOne({ email: em });

    // Check if the user was found and deleted
    if (user.deletedCount === 1) {
      // Send a success response
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      // User not found or not deleted
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    // Handle any errors
    console.log("deleteUser error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
});

/*
router.get("/allgoals", async (req, res) => {
  try {
    const users = await Goal.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
*/

router.put("/AddRating", async (req, res) => {
  const { userEmail, rating, comment, raterEmail } = req.body;
  console.log("req.body", req.body);

  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  if (user.ratedBy?.includes(raterEmail)) {
    return res
      .status(403)
      .send({ message: "You have already rated this volunteer" });
  }

  if (!user.ratings) user.ratings = [];
  user.ratings.push(rating);
  user.ratedBy.push(raterEmail);

  if (comment) {
    if (!user.comments) user.comments = [];
    user.comments.push(comment);
  }

  await user.save();
  res.status(200).send({ message: "User rated successfully", user });
});


router.post("/reviews", async (req, res) => {
  try {
    const {
      email,
      feedback,
    } = req.body;

    const newReviews = new Reviews({
      email,
      feedback,
    });
    
    await newReviews.save();
    return res.status(200).send({ message: "Review submitted successfully" });
  } catch (error) {
    console.error("Error submitting review:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});



router.get("/getReviews", async (req, res) => {
  try {
    const reviews = await Reviews.find();
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;

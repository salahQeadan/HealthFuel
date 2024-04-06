const router = require("express").Router();
const axios = require('axios');

router.get("/all", async (req, res) => {
  try {
    const exercises = await fetchAllExercises();
    res.json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const fetchAllExercises = async () => {
  const options = {
    method: 'GET',
    url: 'https://musclewiki.p.rapidapi.com/exercises',
    headers: {
      'X-RapidAPI-Key': '0d9d8c2976msha22bd3b1f3e7113p1b4a41jsnb20b70f27fa8',
      'X-RapidAPI-Host': 'musclewiki.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    //console.log(response.data);
    return response.data.slice(0, 20);
  } catch (error) {
    console.error(error);
  }
};

module.exports = router;

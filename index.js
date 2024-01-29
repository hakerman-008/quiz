const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const API_BASE_URL = 'https://api.api-ninjas.com/v1/trivia';
const API_KEY = '0Hr3RnpBTgQvQ9np4ibDrQ==CkYJq9yAT5yk6vIn';

app.get('/quiz', async (req, res) => {
  try {
    const category = req.query.category;

    if (!category) {
      return res.status(400).json({ error: 'Category parameter is required' });
    }

    const apiUrl = `${API_BASE_URL}?category=${category}`;
    const response = await axios.get(apiUrl, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });

    const triviaData = response.data;

    if (triviaData.length === 0) {
      return res.status(404).json({ error: 'No trivia questions found for the specified category' });
    }

    const questionData = triviaData[0];
    const question = questionData.question;
    const answer = questionData.answer;

    res.json({ category, question, answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

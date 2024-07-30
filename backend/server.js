const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/research', async (req, res) => {
  try {
    const { keyword } = req.body;
    
    // TODO: Implement Perplexity API call
    // TODO: Implement YouTube Data API call
    
    // For now, we'll return dummy data
    const dummyData = {
      topVideos: [
        { title: "How to make great YouTube videos", views: 1000000 },
        { title: "YouTube SEO tips", views: 500000 }
      ],
      suggestedTopics: [
        "10 tips for " + keyword,
        "The ultimate guide to " + keyword,
        keyword + " for beginners"
      ]
    };
    
    res.json(dummyData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
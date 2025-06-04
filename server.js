const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

// Proxy route to Hipolabs Universities API
app.get("/api/universities", async (req, res) => {
  const { name, country } = req.query;

  try {
    const baseUrl = "http://universities.hipolabs.com/search";
    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (country) params.append("country", country);

    const response = await axios.get(`${baseUrl}?${params.toString()}`);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch universities" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});

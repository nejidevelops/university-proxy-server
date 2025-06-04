const axios = require("axios");

module.exports = async (req, res) => {
  const { name, country } = req.query;

  try {
    const baseUrl = "http://universities.hipolabs.com/search";
    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (country) params.append("country", country);

    const response = await axios.get(`${baseUrl}?${params.toString()}`);
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Failed to fetch universities" });
  }
};

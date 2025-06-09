const axios = require("axios");
const usUniversities = require("../us_universities.json");

module.exports = async (req, res) => {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { name = "", country = "" } = req.query;

  try {
    // ✅ Use local JSON if country is US
    if (country.toLowerCase() === "united states" || country.toLowerCase() === "us") {
      const filtered = usUniversities.filter((uni) =>
        uni.toLowerCase().includes(name.toLowerCase())
      );
      return res.status(200).json(filtered);
    }

    // ✅ Else fallback to Hipolabs
    const baseUrl = "http://universities.hipolabs.com/search";
    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (country) params.append("country", country);

    const response = await axios.get(`${baseUrl}?${params.toString()}`);
    return res.status(200).json(response.data);
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Failed to fetch universities" });
  }
};

const express = require("express");
const cors = require("cors");
const universitiesHandler = require("./api/universities");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/universities", universitiesHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

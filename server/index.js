// server/index.js

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files from the /client folder
app.use(express.static(path.join(__dirname, "../client")));

// Serve canvas.html at the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/canvas.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Monkey Snowfight server running at http://localhost:${PORT}`);
});

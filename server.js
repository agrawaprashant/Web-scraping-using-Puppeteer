const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("API is running!");
});

//Init Middleware
app.use(express.json({ extended: false }));

//define routes
app.use("/api/search", require("./routes/api/search"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const express = require("express");
const fetchData = require("../../puppetteer");
const router = express();

//@desc Route for fetching phone data for given query
//@path /api/search/

router.get("/", async (req, res) => {
  console.log("asdsdf");
  const { minPrice, maxPrice } = req.query;

  try {
    const phoneData = await fetchData(minPrice, maxPrice);
    console.log(phoneData);
    res.status(200).send(phoneData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;

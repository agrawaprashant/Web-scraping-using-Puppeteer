const puppeteer = require("puppeteer");

const fetchData = async (minPrice, maxPrice) => {
  console.log("minPrice ", minPrice);
  console.log("maxPrice ", maxPrice);
  if (!minPrice && !maxPrice) {
    minPrice = 1000;
    maxPrice = 50000;
  }
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 926 });
  let phoneURL = `https://www.flipkart.com/search?count=40&otracker=CLP_filters&p%5B%5D=facets.price_range.from%3D${minPrice}&p%5B%5D=facets.price_range.to%3D${maxPrice}&p%5B%5D=facets.brand%255B%255D%3DSamsung&sid=tyy%2F4io&wid=4.productCard.PMU_V2_4`;
  await page.goto(phoneURL);

  let phoneData = await page.evaluate(() => {
    let phones = [];

    let phoneElems = document.querySelectorAll("div._1-2Iqu");

    phoneElems.forEach(phoneEl => {
      let phoneJson = {};
      try {
        phoneJson.name = phoneEl.querySelector("._3wU53n").innerText;
        phoneJson.price = phoneEl.querySelector("._1vC4OE").innerText.substr(1);
      } catch (exception) {}
      phones.push(phoneJson);
    });
    return phones;
  });

  // param1 => total items per page
  // param2 => total number of items
  // output will be number of pages with firt item and last item
  // ex 1, 1, 7

  return phoneData;
};

module.exports = fetchData;

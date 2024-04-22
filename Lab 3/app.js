const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const cars = require("./routes/cars");
const home = require("./routes/home");

const PORT = 3000;

const app = express();

app.use(express.static(path.join(path.dirname(process.mainModule.filename), "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cars);
app.use(home);
app.use((request, response, next) => {
    response.status = 404;
    response.send("404 Not Found");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost${PORT}`)
});
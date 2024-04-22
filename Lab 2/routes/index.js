const fs = require("fs");
const querystring = require("querystring");
const home = require("../views/home");
const add_car = require("../views/add-car");
const car = require("../views/car");

let carInfos = {
    make: "",
    model: "",
    year: "",
    color: "",
};

const handleHome = (response) => {
    response.setHeader("Content-Type", "text/html");
    response.write(home.renderPage());
    response.end();
}

const handleAddCar = (method, request, response) => {
    switch (method) {
        case "GET":
            response.setHeader("Content-Type", "text/html");
            response.write(add_car.renderPage());
            response.end();
            break;
        case "POST":
            const body = [];

            request.on("data", (chunk) => {
                body.push(chunk);
            });
            request.on("end", () => {
                let BufferArray = Buffer.concat(body).toString();
                let parsedData = querystring.parse(BufferArray);
                fs.writeFileSync("formData.json", JSON.stringify(parsedData));
                response.statusCode = 302;
                response.setHeader("Location", "/car");
                response.end();
            });
            break;
        default:
            
            response.statusCode = 405;
            response.end("Method not allowed");
            break;
    }
};

const handleCar = (response) => {
    const data = fs.readFileSync("formData.json");
    response.setHeader("Content-Type", "text/html");
    response.write(car.renderPage(data));
    response.end();
};

const handlePageNotFound = (response) => {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html");
    response.write("404 Not Found");
    response.end();
};

module.exports = {
    handleHome,
    handleAddCar,
    handleCar,
    handlePageNotFound,
}

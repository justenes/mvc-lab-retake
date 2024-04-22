const express = require("express");
const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");
const router = express.Router();

let cars = [];
let nextId = 1;

router.get("/car", (request, res, next) => {
    const car = cars[cars.length - 1];
    fs.readFile(path.join(path.dirname(process.mainModule.filename), "views", "car.html"), "utf-8",
    (err, html) => {
    if (err) {

        }

        const $ = cheerio.load(html);

    if (cars.length === 0) {
            $(".car").html("No cars has been found.");
        } else {
            $(".car").html(`
            <h2>Last added car</h2>
            <div><span class=”bold”>Make:</span> ${car.make}</div>
            <div><span class=”bold”>Model:</span> ${car.model}</div>
            <div><span class=”bold”>Year:</span> ${car.year}</div>
            <div><span class=”bold”>Color:</span> ${car.color}</div>
            `);
        }

        res.send($.html());
    }
    )
});

router.get("/car/add", (request, res, next) => {
    res.sendFile(path.join(path.dirname(process.mainModule.filename), "views", "add-car.html"));
});

router.get("/car/list", (request, res, next) => {
    fs.readFile(path.join(path.dirname(process.mainModule.filename), "views", "cars-list.html"), "utf-8",
    (err, html) => {
             if (err) {

        }

        const $ = cheerio.load(html);

        if (cars.length === 0) {
            $(".car").html("No cars has been found.");
        }      else {
            let code = `
            <h2>Cars</h2>
            <ul>
            `;
            for (let index = 0; index < cars.length; index++) {
                const car = cars[index];
                code += `
                <li>
                    <p><span class=”bold”>Make:</span> ${car.make}</p>
                    <p><span class=”bold”>Model:</span> ${car.model}</p>
                    <p><span class=”bold”>Year:</span> ${car.year}</p>
                    <p><span class=”bold”>Color:</span> ${car.color}</p>
                </li>`;
            }
            code += `</ul>`;
            $(".car").html(code);
        }

        res.send($.html());
    }
    )
});

router.post("/car/add", (request, res, next) => {
    let body = request.body;
    cars.push(body);
    cars[cars.length - 1].id = nextId;
    console.log(cars[cars.length - 1]);
    nextId++;
    res.redirect("/car");
});

module.exports = router;
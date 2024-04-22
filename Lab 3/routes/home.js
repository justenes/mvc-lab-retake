const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (request, response, next) => {
    response.sendFile(path.join(path.dirname(process.mainModule.filename), "views", "home.html"));
});

module.exports = router;
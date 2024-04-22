const http = require("http");

const CARS = require("./cars");
const HTML_GENERATOR = require("./htmlGenerator")

const PORT = 3000;

const id = 1;

const requestListener = (request, res) => {
    const cars = CARS.getCars();
    console.log(`${cars}`);
    res.setHeader("Content-Type", "text/html");
    res.write(HTML_GENERATOR.getHTMLDocumentStart());
    res.write(`<body>`);
    res.write(`<p>${CARS.getCarInformation(id)}</p>`);
    res.write(`<p>${CARS.getCarAge(id)}</p>`);
    res.write(`</body>`);
    res.write(`${HTML_GENERATOR.getHTMLDocumentEnd()}`);
    res.end();
};

const SERVER = http.createServer(requestListener);

SERVER.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
const http = require("http");

const routes = require("./routes");

const PORT = 3000;

const requestListener = (request, response) => {
    const { url, method } = request;

    if (url === "/" && method === "GET") {
        return routes.handleHome(response);
    }

    if (url === "/add-car") {
        return routes.handleAddCar(method, request, response);
    }

    if (url === "/car" && method === "GET") {
        return routes.handleCar(response);
    }

    routes.handlePageNotFound(response);
};

const SERVER = http.createServer(requestListener);

SERVER.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
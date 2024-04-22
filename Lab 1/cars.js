const cars = [
    {
        id: 1,
        make: "Mercedes",
        model: "E350",
        year: 2018,
        color: "Black"
    },
    {
        id: 2,
        make: "Volkswagen",
        model: "Passat",
        year: 2017,
        color: "White"
    },
    {
        id: 3,
        make: "Ford",
        model: "Focus",
        year: 2019,
        color: "Gray"
    },
    {
        id: 4,
        make: "Renault",
        model: "Symbol",
        year: 2016,
        color: "Red"
    },
    {
        id: 5,
        make: "Opel",
        model: "Mokka",
        year: 2020,
        color: "Midnight Purple"
    }
];

const getCars = () => {
    return cars;
};

    const getCarInformation = (id) => {
        const car = cars[id];
        if (car) {
            const { make, model, year, color } = car;
            return `Make: ${make}, Model: ${model}, Year: ${year}, Color: ${color}.`;
        }
        return 'Car doesn\'t exist';
    };


    const getCarAge = (id) => {
        const car = cars[id];
        if (car) {
            const today = new Date();
            const yearNow = today.getFullYear();
            const carAge = yearNow - car.year;
            return `Car is ${carAge} years old.`;
        }
        return `Car doesn't exist`; 
    };
    

module.exports = {
    getCars,
    getCarInformation,
    getCarAge,
}
const {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
} = require('../../lib/animals');
const {
    animals
} = require('../../data/animals');
const router = require("express").Router();

router.get("/animals", (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get("/animals:id", (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post("/animals", (req, res) => {
    // set id based on next index of [array] 
    req.body.id = animals.length.toString();

    // add animal to json  animals [array] in function
    if (!validateAnimal(req.body)) {
        res.status(400).send("The animal is not properly formatted");
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

module.exports = router;
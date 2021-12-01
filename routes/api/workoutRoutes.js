const router = require("express").Router();
const Workout = require("../../models/workout");

router.get("/", (req, res) => {
    Workout.aggregate([{
        $addFields:{
            totalDuration: { $sum: "$exercises.duration"}
        }
    }])
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/", (req, res) => {
    Workout.create(req.body)
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
    Workout.updateOne({_id: req.params.id}, { $push: { exercises: req.body }})
    .then(workout => {
        console.log(workout);
        res.json(workout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get("/range", (req, res) => {
    Workout.aggregate([{
        $addFields:{
            totalDuration: { $sum: "$exercises.duration"}
        }
    }]).sort({ day: 'desc'}).limit(7).then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;
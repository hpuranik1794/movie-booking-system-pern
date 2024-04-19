const router = require("express").Router();
const movieController = require("../controllers/movieController");

router
  .get("/", movieController.getMovies)
  .get("/:movieId", movieController.getMovieById)
  .get("/seats/:movieId", movieController.getSeats)
  .put("/:movieId", movieController.updateMovieById)

module.exports = router

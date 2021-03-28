import axios from "axios";

export const testTMDB = (req, res) => {
  try {
    console.log("TMDB ROUTE WORKS");
    res.status(200).json("Pees");
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    await axios
      .get(
        `${process.env.TMDB_API}/search/movie?api_key=${process.env.TMDB_KEY}&language=en-US&query=${query}&page=1&include_adult=false&region=us`
      )
      .then((res) => {
        console.log(res.data.results[0]);
        res.status(200).json(res.data.results);
      })
      .catch((err) => res.status(500).json(err));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

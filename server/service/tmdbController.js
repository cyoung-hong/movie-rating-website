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
  const { query, page } = req.params;
  //console.log('Controller now in searchMovie');
  try {
    await axios.get(`${process.env.TMDB_API}/search/movie?api_key=${process.env.TMDB_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false&region=us`)
      .then((searchResults) => {
        res.status(201).json(searchResults.data);
      })
      .catch((err) => res.status(500).json(err.message));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

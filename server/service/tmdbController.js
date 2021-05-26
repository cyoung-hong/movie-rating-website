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
    const searchResults = await axios.get(
      `${process.env.TMDB_API}search/movie?api_key=${process.env.TMDB_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false&region=us`
    );

    if (searchResults) {
      return res.status(201).json(searchResults.data);
    } else {
      res.status(500).json({ message: "Nothing found." });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const getMoviePoster = async (req, res) => {
//   const {path} = req.params;

//   try {
//     await axios.get(`${process.env.TMDB_IMAGE_API}original/${path}`)
//     .then((moviePoster) => {
//       res.status(201).json(moviePoster)
//     })
//   }
// }

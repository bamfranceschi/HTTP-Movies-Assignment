import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  id: null,
  title: "",
  director: "",
  metascore: "",
  stars: ["", "", ""]
};

const UpdateForm = props => {
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    const movieToEdit = props.movies.find(
      element => `${element.id}` === props.match.params.id
    );
    console.log(props.movies, movieToEdit);
    if (movieToEdit) {
      setMovie(movieToEdit);
    }
  }, [props.movies, props.match.params.id]);

  //need a changeHandler

  const changeHandler = e => {
    e.persist();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  //need a handleSubmit with PUT request
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        props.updateMovie(res.data);
        setMovie(initialMovie);
        props.history.push(`/`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={movie.title}
          onChange={changeHandler}
        ></input>
        <input
          type="text"
          placeholder="director"
          name="director"
          value={movie.director}
          onChange={changeHandler}
        ></input>
        <input
          type="number"
          placeholder="metascore"
          name="metascore"
          value={movie.metascore}
          onChange={changeHandler}
        ></input>
        <input
          type="text"
          placeholder="stars"
          name="stars"
          value={movie.stars}
          onChange={changeHandler}
        ></input>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;

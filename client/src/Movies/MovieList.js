import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateForm from "./UpdateForm";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  setNewState(newState) {
    this.setState({ movies: newState });
  }

  render() {
    return (
      <>
        <div className="movie-list">
          {this.state.movies.map(movie => (
            <MovieDetails key={movie.id} movie={movie} />
          ))}
        </div>

        <Route
          path="/update-movie/:id"
          render={props => (
            <UpdateForm
              {...props}
              movies={this.state.movies}
              setNewState={this.setNewState}
            />
          )}
        />
      </>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}

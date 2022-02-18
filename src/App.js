import React, { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeadings';
import SearchBox from './components/SearchBox';
import AddToFavourites from './components/AddToFavourites';



function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=72e471e9`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
  } 

  const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
	};


  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);
  
    
  return (
		<div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
			<div className='row'>
				<MovieList movies={movies} 
        favouriteComponent={AddToFavourites} 
        handleFavouritesClick={addFavouriteMovie}
        />
			</div>
		</div>
	);
};

export default App;

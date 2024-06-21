import axios from "axios";
import { apiKey } from "../constants";

const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMovieEndpoint = `${apiBaseUrl}/trending/movie/day?language=en-US&api_key=${apiKey}`;
const upcomingMovieEndpoint = `${apiBaseUrl}/movie/upcoming?language=en-US&api_key=${apiKey}`;
const topRatedMovieEndpoint = `${apiBaseUrl}/movie/top_rated?language=en-US&api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?language=en-US&api_key=${apiKey}`


const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?language=en-US&api_key=${apiKey}`
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?language=en-US&api_key=${apiKey}`
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?language=en-US&api_key=${apiKey}`




const personDetailsEndpoint = id => `${apiBaseUrl}/person/${id}?language=en-US&api_key=${apiKey}`
const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?language=en-US&api_key=${apiKey}`






export const image500 = path => path? `https://image.tmdb.org/t/p/w500/${path}`: null;
export const image342 = path => path? `https://image.tmdb.org/t/p/w342/${path}`: null;
export const image185 = path => path? `https://image.tmdb.org/t/p/w185/${path}`: null;

export const fallbackMoviePoster = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffilm.jessicaerin.co%2F&psig=AOvVaw0UKDYR2YF8AqryX9glvue6&ust=1718867816849000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOjKjuGP54YDFQAAAAAdAAAAABAE'
export const fallbackPersonImage = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffilm.jessicaerin.co%2F&psig=AOvVaw0UKDYR2YF8AqryX9glvue6&ust=1718867816849000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOjKjuGP54YDFQAAAAAdAAAAABAE'


const apiCall = async (endpoint, params)=>{
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params: {}
    }
    
    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.error('error',error);
        return {}
    }
}

export const fetchTrendingMovies = ()=>{
    return apiCall(trendingMovieEndpoint)
}
export const fetchUpcomingMovies = ()=>{
    return apiCall(upcomingMovieEndpoint)
}
export const fetchTopRatedMovies = ()=>{
    return apiCall(topRatedMovieEndpoint)
}

export const fetchMovieDetails = id=>{
    return apiCall(movieDetailsEndpoint(id))
}

export const fetchMovieCredits = id=>{
    return apiCall(movieCreditsEndpoint(id))
}

export const fetchSimilarMovies = id=>{
    return apiCall(similarMoviesEndpoint(id))
}

export const fetchPersonDetails = id=>{
    return apiCall(personDetailsEndpoint(id))
}

export const fetchPersonMovies = id=>{
    return apiCall(personMoviesEndpoint(id))
}

export const searchMovies = params=>{
    return apiCall(searchMoviesEndpoint, params)
}
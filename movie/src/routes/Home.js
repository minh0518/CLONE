import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Movie from '../components/Movie'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])

  const getMovies = async () => {
    const response = await axios(
      'https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year',
    )
    const json = await response.data

    //const json = await(await axios('https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year')).data
    // 이렇게 해도 됨. 그렇지만 반드시 await를 생략할 수는 없음 axios에도 쓰고
    // .data에도 써야함

    setMovies(json.data.movies)
    //data라는 부분이 또 있는거임
    setLoading(false)
  }

  useEffect(() => {
    getMovies()
  }, [])

  console.log(movies)
  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        movies.map((movie) => (
          <Movie
            coverImg={movie.medium_cover_image}
            title={movie.title}
            summary={movie.summary}
            genres={movie.genres}
            key={movie.id}
            id={movie.id}
          />
        ))
      )}
      {/* 각 movie별로 div라는 박스에 담아서 출력 */}
    </div>
  )
}

export default Home
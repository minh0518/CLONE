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
    // �̷��� �ص� ��. �׷����� �ݵ�� await�� ������ ���� ���� axios���� ����
    // .data���� �����

    setMovies(json.data.movies)
    //data��� �κ��� �� �ִ°���
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
      {/* �� movie���� div��� �ڽ��� ��Ƽ� ��� */}
    </div>
  )
}

export default Home
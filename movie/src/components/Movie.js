import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Movie = ({id,coverImg, title, summary, genres }) => {
  return (
    <div>
      <img src={coverImg} alt={title} />
      <h2><Link to={`/movie/${id}`}>{title}</Link></h2>
      <p>{summary.length>235? `${summary.slice(0,253)}...`:summary }</p>
      {/* 글자수가 253을 넘어가면 ...처리 */}
      <ul>
        {genres.map((genre, index) => {
          return <li key={index}>{genre}</li>
          // key는 map을 사용할때 넣어줘야 하며 고윳값이면 되므로
          // 장르가 겹칠일은 없으니까 그냥 똑같이 genre를 넣어줘도 된다
        })}
      </ul>
    </div>
  )
}

Movie.propTypes={
  id:PropTypes.number.isRequired,
  coverImg:PropTypes.string.isRequired,
  title:PropTypes.string.isRequired,
  summary:PropTypes.string.isRequired,
  genres:PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie
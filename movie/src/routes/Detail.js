import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import YouTube from 'react-youtube'

const Detail = () => {
  const { id } = useParams()
  // url���� ������ ���ϴ� ���� ������
  // movie/:id ���� :id�κ��� �ǹ�
    //console.log(id)

  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState({})
  const [isOver, setIsOver] = useState(true)
  const [basic,setBasic]=useState(false)

  const getMovie = async () => {
    const json = await (
      await axios(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).data

    setDetails(json.data.movie)
    setLoading(false)
    if(json.data.movie.description_full.length>200){
      setIsOver(true)  
    }
    else{
      setIsOver(false)  
      setBasic(true)
    }
  }

  useEffect(() => {
    console.log('a')
    getMovie()
  }, [])

    console.log('render')
  
  useEffect(() => {
    console.log('b')
    
  }, [])

  return (
    <>
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <header>
              <h1>{details.title}</h1>
              <img src={details.medium_cover_image} alt={details.title}></img>
              <ul>
                <li>{details.year}</li>
                <li>{details.genres.join('/')}</li>
                <li>IMDb{details.rating}</li>
                <li>runtime:{details.runtime}min</li>
              </ul>
            </header>

            <section>
              {/* <video width="200" height="100" controls>
                <source src="/match.mp4" type="video/mp4" />
              </video> */}
              <YouTube
                videoId={details.yt_trailer_code}
                onEnd={(e) => {
                  e.target.stopVideo(0)
                }}
                opts={{
                  width: '500',
                  height: '255',
                  playerVars: {
                    autoplay: 1, //�ڵ������ ���� �������� 0
                    rel: 0, //���� ������ ǥ������ ���� (�ٵ� ���� ���� ���µ�..)
                    modestbranding: 1, // ��Ʈ�� �ٿ� youtube �ΰ� ǥ������ ����
                  },
                }}
              />
            </section>

            <section>
              <h3>Plot summary</h3>

              <p>
                {isOver
                  ? `${details.description_full.slice(0, 200)}...`
                  : `${details.description_full}`}
              </p>
              {isOver ? (
                <button onClick={() => setIsOver((flag) => !flag)}>full</button>
              ) :( basic ? "":(
                <button onClick={() => setIsOver((flag) => !flag)}>short</button>
              )
              )}
            </section>
          </div>
        )}
      </div>
    </>
  )
}

export default Detail

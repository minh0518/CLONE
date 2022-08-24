import axios from 'axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import NewsItem from './NewsItem'

const NewsItemBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top:2rem;
    @media screen and (max-width: 768px){
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`


const NewsList = ({category}) => { //App.js에서 넘겨준 porps 사용

    const [articles,setArticles]=useState(null)
    const [loading,setLoadging]=useState(false)

    useEffect(()=>{

        //내부에 async함수 따로 생성
        const fetchData= async ()=>{
            setLoadging(true)
            try{

                //넘겨받은 카테고리가 all이면 공백,
                //아니라면 이 값으로 쿼리스트링을 이용
                const query= category==='all'? ``:`&category=${category}`

                const response=await axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=a8dab6844dca4de7b2800aa0312b9d54`)
                //카테고리에 따른 API를 불러옴

                setArticles(response.data.articles)
            }
            catch(e){
                console.log(e)
            }
            setLoadging(false)
        }
        fetchData() //실행

    },[category])
    //category가 변할 때마다 뉴스를 새로 불러와야 하기 때문에 의존성 배열 사용

    //대기 중일 때
    if(loading){
        return <NewsItemBlock>대기 중...</NewsItemBlock>
    }
    //아직 articles 값이 설정되지 않았을 때
    if(!articles){
        return null
    }
    
    return(
        <NewsItemBlock>
            {articles.map((article)=>(
                <NewsItem article={article} key={article.url}/>
            ))}
        </NewsItemBlock>

    )
}
export default NewsList

import React, { useState, useEffect } from 'react'
import Pagination from '@material-ui/lab/Pagination';

const articleImgStyle = {
  width: 50,
  height: 50,
  borderRadius: '50%'
}

const articleStyle = {
  width: 230,
  height: 300,
  border: '1px solid gray',
  overflow: 'auto',
  fontFamily: 'monospace'
}

const useFetch = (url, initialState = []) => {
  const [ data , setData ] = useState(initialState)
  const [ isFetching, setFetching ] = useState(true)

  useEffect(() => {
    setFetching(true)
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setFetching(false)
      })
  }, [ url ])

  return [
    data,
    isFetching
  ]

}

const App = () => {
  const [ page, SetPage ] = useState(1)
  const [ pageSize, SetPageSize ] = useState(10)
  const [ response, isLoading ] = useFetch('http://articulosmercadolibre/api/v2/articles?pageSize=' + pageSize + '&page=' + page)
  const articles = response.articles

  const handleChangePage = (event, value) => {
    SetPage(value)
  }

  return(
    <div>
      { isLoading && <h1>Cargando...</h1> }
      {articles && articles.map(article => (
        <div key={article.id} style={articleStyle}>
          <p>Titulo: { article.title }</p>
          <p><a href={article.url}>{article.url}</a></p>
          <p><img src={article.imageUrl} alt='Article' style={articleImgStyle} /></p>
        </div>
      ))}
      <Pagination count={response.totalPages} onChange={handleChangePage}/>
    </div>
  )
}



export default App;

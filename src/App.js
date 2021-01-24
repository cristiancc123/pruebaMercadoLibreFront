import React, { useState, useEffect, useContext } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import 'antd/dist/antd.css';
import { Image, Card , Col, Row } from 'antd';

// { Provider, Customer } 
const MyContext = React.createContext()
const { Meta } = Card;

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

const CargarImagen = (imageUrl) => {
  return(
    <Image src={imageUrl} height={250} />
  )
}

const CargarCard = (article) => {
  return(
    <Card
      hoverable
      style={{ width: 400 }}
      cover={CargarImagen(article.imageUrl)}>
        <Meta title={ article.title } />
        <br/>
        <a href={article.url}>{article.url}</a>
    </Card>
  )
}

const MostrarArticulos = () => {

  const context = useContext(MyContext)
  const articles = context.articles
  return(
    <Row gutter={5}>
      {articles && articles.map(article => (
        <div key={article.id}>
          <Col span={8}>
          {CargarCard(article)}
          </Col>
        </div>
      ))}
    </Row>
  )
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
    <MyContext.Provider value={{articles}}>
      <div className="site-card-wrapper">
        { isLoading ? <h1>Cargando...</h1> : <MostrarArticulos/> }
        <Pagination count={response.totalPages} onChange={handleChangePage}/>
      </div>
    </MyContext.Provider>
  )
}



export default App;

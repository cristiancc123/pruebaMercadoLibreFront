import React, { useState, useEffect, useContext } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import 'antd/dist/antd.css';
import { Image, Card , Col, Row, Layout, Tooltip } from 'antd';
import styled from 'styled-components'

// { Provider, Customer } 
const MyContext = React.createContext()
const { Meta } = Card;
const { Header, Footer, Content } = Layout;

/** Funcion que permite realizar peticiones al servidor */
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

/** Funcion que permite cargar una imagen */
const CargarImagen = (imageUrl) => {
  return(
    <Image src={imageUrl} height={180} />
  )
}

/** Funcion que permite cargar un elemento Card */
const CargarCard = (article) => {
  return(
    <Card
      hoverable
      style={{ width: 300, margin: '5px'}}
      cover={CargarImagen(article.imageUrl)}>
        <Tooltip placement="topLeft" title={article.title}>
          <Meta title={ article.title } />
        </Tooltip>
        <br/>
        <Meta title={ <a href={article.url}>{article.url}</a> } />
    </Card>
  )
}

/** Funcion que permite mostrar el listado de articulos */
const MostrarArticulos = () => {
  const context = useContext(MyContext)
  const articles = context.articles
  return(
    <div className="site-card-wrapper" style={{marginTop: '30px'}}>
      <Row gutter={5}>
        {articles && articles.map(article => (
          <div key={article.id}>
            <Col span={20}>
            {CargarCard(article)}
            </Col>
          </div>
        ))}
      </Row>
    </div>
  )
}

/** Componente principal */
const App = () => {
  const [ page, SetPage ] = useState(1)
  const [ pageSize, SetPageSize ] = useState(10)
  const [ response, isLoading ] = useFetch('http://articulosmercadolibre/api/v2/articles?pageSize=' + pageSize + '&page=' + page)
  const articles = response.articles
  const urlHeader = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSRn8E4ug7hy5BKIBQ5l3_9MmiHVN3BFCNUA&usqp=CAU'

  const handleChangePage = (event, value) => {
    SetPage(value)
  }

  return(
    <Layout>
      <Header className="header" style={{ height: '130px' }}>
        <img  src={urlHeader} alt='imgMercadoLibre'
          style={{width: '99px', borderRadius: '50%', display: 'flex', marginTop: '15px', float: 'left'}}
        />  
        <h1 style={{color: 'white', textAlign: 'center', fontSize: '40px', marginTop: '25px' }}>Listado de Árticulos</h1>
      </Header>
      <Content style={{ padding: '0 50px', paddingTop: '30px' }}>
        <MyContext.Provider value={{articles}}>
          { isLoading ? <h1>Cargando...</h1> : <MostrarArticulos/> }
          <Pagination count={response.totalPages} onChange={handleChangePage} style={{ paddingTop: '25px'}}/>
        </MyContext.Provider>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
          Prueba Técnica Mercado Libre - Cristian Cano (2021)
      </Footer>
    </Layout>
  )
}


export default App;

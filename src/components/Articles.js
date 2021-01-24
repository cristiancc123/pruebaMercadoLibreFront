import React, { useState, useEffect, useContext } from 'react'
import useFetch from '../actions/FetchAction.js'
import CargarCard from '../actions/LoadCard.js'
import Pagination from '@material-ui/lab/Pagination';
import 'antd/dist/antd.css';
import { Card , Col, Row, Layout } from 'antd';


// { Provider, Customer } 
const MyContext = React.createContext()
const { Header, Footer, Content } = Layout;


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

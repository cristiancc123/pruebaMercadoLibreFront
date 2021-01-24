import React, { useState, useEffect, useContext } from 'react'
import useFetch from '../actions/fetch-action.js'
import CargarCard from '../actions/load-card.js'
import Pagination from '@material-ui/lab/Pagination';
import Header from "./header.js";
import Footer from "./footer.js";
import 'antd/dist/antd.css';
import { Col, Row, Layout } from 'antd';


// { Provider, Customer } 
const MyContext = React.createContext()
const { Content } = Layout;


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
 
  const handleChangePage = (event, value) => {
    SetPage(value)
  }

  return(
    <Layout>
      <Header />
      <Content style={{ padding: '0 50px', paddingTop: '30px' }}>
        <MyContext.Provider value={{articles}}>
          { isLoading ? <h1>Cargando...</h1> : <MostrarArticulos/> }
          <Pagination count={response.totalPages} onChange={handleChangePage} style={{ paddingTop: '25px'}}/>
        </MyContext.Provider>
      </Content>
      <Footer />
    </Layout>
  )
}


export default App;

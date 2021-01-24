import CargarImagen from './load-image.js'
import 'antd/dist/antd.css';
import { Card , Tooltip } from 'antd';

const { Meta } = Card;

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

export default CargarCard;
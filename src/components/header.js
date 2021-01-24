import { Layout } from 'antd';

const { Header } = Layout;
const urlHeader = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSRn8E4ug7hy5BKIBQ5l3_9MmiHVN3BFCNUA&usqp=CAU'

const HeaderComponent = () => {
    return(
        <Header className="header" style={{ height: '130px' }}>
            <img  src={urlHeader} alt='imgMercadoLibre'
            style={{width: '99px', borderRadius: '50%', display: 'flex', marginTop: '15px', float: 'left'}}
            />  
            <h1 style={{color: 'white', textAlign: 'center', fontSize: '40px', marginTop: '25px' }}>Listado de Árticulos</h1>
        </Header>
    )
}

export default HeaderComponent;
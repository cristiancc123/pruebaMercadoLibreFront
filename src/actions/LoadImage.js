import { Image } from 'antd';

/** Funcion que permite cargar una imagen */
const CargarImagen = (imageUrl) => {
    return(
      <Image src={imageUrl} height={180} />
    )
  }

export default CargarImagen;  
import React from 'react';
import { useState } from 'react';
import { saveAs } from 'file-saver';

const Card = ({ item }) => {
  const [imageUrl, setImageUrl] = useState(item.urls.small); // URL de la imagen a guardar

  const handleSaveImage = async () => {
    try {
      const response = await fetch(imageUrl); // Descarga la imagen desde su URL
      const blob = await response.blob(); // Convierte la respuesta en un Blob
      saveAs(blob, 'image.jpg'); // Guarda el Blob como un archivo con el nombre 'image.jpg'
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
    }
  };

  return (
    <div className="item">
      <div className="image">
        <img src={item.urls.small} alt={item.description} />
        {/* Agrega el controlador de eventos onClick para el botón "Guardar" */}
        <button className="btn-save" onClick={handleSaveImage}>Guardar</button>
        <a className="icon-upload" href=""><img src="/uploadicon.png" alt="upload" /></a>
        <a className="icon-dots" href=""><img src="/dotsicon.png" alt="options" /></a>
      </div>
      <p>{item.description}</p>
      <div>
        <img className='user' src={item.user.profile_image.small} alt={item.user.name} />
        <span>{item.user.name}</span>
      </div>
    </div>
  );
}

export default Card;

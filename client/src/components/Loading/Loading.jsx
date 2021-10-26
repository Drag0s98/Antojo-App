import React, { useContext } from "react";
import loader from '../../styles/assets/img/svg/emoji-happy.svg'
import wave1 from '../../styles/assets/img/svg/wave.1svg.svg'
import wave3 from '../../styles/assets/img/svg/wave3.svg.svg'
import { DataContext } from "../../context/context";


const Loading = () => {
  const { setHeader } = useContext(DataContext);
  setHeader(false);
  return (
    <section className='loading_container'>
      <img src={wave1} alt="" className='top_wave' />
      <article className='image_box'>
        <img src={loader} alt="emoji-happy" />
      </article>
      <article className='welcome_text_box'>
        <p>¡Bienvenido a Yamy!</p>
        <p> Su inicio de sesión ha sido un éxito.</p>
        <p> Empieza a pedir tu plato favorito</p>
      </article>
      <img src={wave3} alt="" className='bot_wave' />
    </section>
  );
};

export default Loading;

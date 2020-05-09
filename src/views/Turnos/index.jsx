import React, { useState, useEffect } from 'react';
import './styles.css';
import img1 from './woman-3.jpg'
import img2 from './woman-4.jpg'
import imgi from './itsaW.png'
import Typing from 'react-typing-animation';
import FadeIn from 'react-fade-in';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap'; 
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'
axios.defaults.timeout = 20000 //tiempo permitido de respuesta
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'DELETE, POST, GET, OPTIONS'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Accept'
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
const BASE_URL= 'https://iturn20.herokuapp.com/api';

function Turnos(props){
  const { addToast } = useToasts()
  const [next, setNext] = useState(false)
  const [show, setShow] = useState(false)
  const [person, setPerson] = useState('--')
  const [turno, setTurno] = useState('--')
  const [cate, setCate] = useState('--')

useEffect( ()=>{
  setPerson(localStorage.getItem('person'));
  setTurno(localStorage.getItem('turno'));
  
  const categ = localStorage.getItem('category')
  switch (categ){
    case '1':
      setCate('Admisiones');
      break
    case '11':
      setCate('General ');
      break
    case '21':
      setCate('Facultad');
      break
    case '31':
      setCate('Idiomas');
      break
      default: 
      setCate('General');
      break
      
  }
},[])

  const handleExit = ()=> {
    //handle clear local storege
    window.localStorage.clear()
    return props.history.push('/')
  }

  const AnimatedTypingComponent = (
    <Typing cursorClassName="text-light" onFinishedTyping={ () => {
      setShow(true)
    }} speed={60} className=" text-light text-left txtbt pr-5 mt-5" >
      <span>Usted esta en la seccion de turnos, espere su llamado</span>
    </Typing>
  ) 
    const TurComponent = (
      
    <Row>
      <Col className="boxtTurn d-none d-md-block  " xl={8} lg={7} md={6} sm={6} xs={6}>

      {AnimatedTypingComponent}
        {
          
          show ? (
            <FadeIn>
              <img
                className="d-block  itsat"
                src={imgi}
                alt="First slide"
              />
            </FadeIn>
          ): null
        }

      </Col>

        
      <Col className="boxtTurn2" xl={4} lg={5} md={6} sm={12} xs={12}>
      <FadeIn>
      <Row className="top mt-4">
          <Col xl={6} lg={6} md={6} sm={6} xs={6}><p className="txt1 text-light mb-0 ">TRAMITE </p> </Col> 
          <Col xl={6} lg={6} md={6} sm={6} xs={6}><p className="txt2 text-light mb-0 ">iTurn  </p></Col> 

         <Col xl={6} lg={6} md={6} sm={6} xs={6}> <p className="subTop1">Admisiones</p></Col>
         <Col xl={6} lg={6} md={6} sm={6} xs={6}><p className="subTop2">Turno digital</p></Col> 
      </Row>
       
              
      <div className="main" >
      <Row className="top">
          <Col xl={6} lg={6} md={6} sm={6} xs={6}><p className="txt3 pt-3 mb-0"> 12:50 </p> </Col> 
          <Col xl={6} lg={6} md={6} sm={6} xs={6}><p className="txt4 pt-3 mb-0">13:20  </p></Col> 

         <Col xl={6} lg={6} md={6} sm={6} xs={6}> <p className="subTop3">Tiempo</p></Col>
         <Col xl={6} lg={6} md={6} sm={6} xs={6}><p className="subTop4">Estimado</p></Col> 
      </Row>
<Carousel>
  <Carousel.Item>
      <img
        className="d-block w-100"
        src={img1}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>Turno digital</h3>
       
      </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src={img2}
      alt="Third slide"
    />

      <Carousel.Caption>
        <h3>Optimiza tu tiempo</h3>
        
      </Carousel.Caption>
    </Carousel.Item>
</Carousel>
</div>
      <div className="barrat" >
      <Row className="topbarr">
              
      <Col xl={4} lg={4} md={6} sm={4} xs={4}><p className="txt3d text-light pt-2 mb-0"> {turno} </p> </Col>

          <Col xl={4} lg={4} md={6} sm={4} xs={4}><p className="txt4d text-light pt-2 mb-0">{cate}  </p></Col> 
          <Col xl={4} lg={4} md={6} sm={4} xs={4}><p className="txt4d text-light pt-2 mb-0">A1</p></Col> 

         <Col xl={4} lg={4} md={6} sm={4} xs={4}> <p className="subTop3 text-light ">Turno</p></Col>
         <Col xl={4} lg={4} md={6} sm={4} xs={4}><p className="subTop4 text-light">Categoria</p></Col>
         <Col xl={4} lg={4} md={6} sm={4} xs={4}><p className="subTop4 text-light">Modulo</p></Col>
          
          
      </Row>
      </div>
      <Row className="topc barratf ">
          <Button xl={12} lg={12} md={12} sm={12} xs={12} className="btnCancelar" onClick = {()=>{props.history.goBack()}}  variant="secondary mb-3 pt-2 pb-2 ">Cancelar</Button>{' '}
                   
                </Row>
      </FadeIn>
      </Col>
  </Row>
    )

    return(
      <div className="grandf">
        <div className="father">
        <Container className="fill" >
        <Row>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <p className="txtsalir text-right text-light pt-3 pb-3pr-4">Bienvenid@, {person} - <b style={{cursor:'pointer'}} onClick={ handleExit }> Salir</b></p> 
                  </Col>
        </Row>
                 {TurComponent}
                  
        </Container>
        </div>
        </div>
      );
}

export default Turnos
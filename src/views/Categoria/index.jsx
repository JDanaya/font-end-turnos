import React, { useState, useEffect } from 'react';
import './styles.css';
import imgc from './itsaW.png'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; 
import Typing from 'react-typing-animation';
import FadeIn from 'react-fade-in';
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'
axios.defaults.timeout = 20000 //tiempo permitido de respuesta
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'DELETE, POST, GET, OPTIONS'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Accept'
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
const BASE_URL= 'https://iturn20.herokuapp.com/api';

function Categoria (props){

  const { addToast } = useToasts()
  const [next, setNext] = useState(false)
  const [show, setShow] = useState(false)
  const [person, setPerson] = useState('--')
  const [personAD, setPersonAD] = useState({
    first_name: '--',
    last_name: '',
    email: '--',
    phone: '--',
})


const showNotify = (data, type)=>{
  return addToast(data, {
      appearance: type,
      autoDismiss: true,
    })
}

useEffect( ()=>{  
  setPerson(localStorage.getItem('person'));
  handelLogin()
},[next])

const handelLogin = ()=> {
  var dataUser = localStorage.getItem('iturnUser');
  var dataPassword = localStorage.getItem('iturnPassword');
  axios.post(BASE_URL+'/login', {
      user: dataUser,
      password: dataPassword,
    })
    .then(function (response) {
      console.log(response.data);
         setPersonAD(response.data.data[0])


      return

    })
}

  const handleExit = ()=> {
    //handle clear local storege
    window.localStorage.clear()
    return props.history.push('/')
  }
  const handleSubmitTurn = (categ) => {

    var dataUser = localStorage.getItem('iturnUser');
    var dataPassword = localStorage.getItem('iturnPassword');
    axios.post(BASE_URL+'/turn', {
      category: categ,
      user: dataUser,
      password: dataPassword
    })
    .then(function (response) {
      console.log(response.data);
      if(response.data.status === 200){

              localStorage.setItem('turno', response.data.data.turno)
              localStorage.setItem('category', categ)
              return props.history.push('/Turnos')
          }
     
      return showNotify(response.data.data, 'warning')
  
    })
    .catch(function (error) {
        console.log(error)
      return showNotify('algo salio mal', 'warning')
    });
  
  
  };

    return (
        <div className="grandf">
        <div className="padre">
        <Container>
        <Row>
                  <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                      <p className="txtsalir text-right text-light pt-3 pb-3 mb-2 pr-4">Bienvenid@, {person} - <b style={{cursor:'pointer'}} onClick={ handleExit }> Salir</b></p> 
                  </Col>
        </Row>
            <Row>
              
                <Col className="box1c" xl={7} lg={7} md={6} sm={5} xs={12}>
                <span > <p className="text-light text-left txtbl pt-5 pr-5">Usted esta en la sesion de Categorias de iTurn</p> </span>
        {
         (
            <FadeIn>
              <img
                className="d-block  itsac"
                src={imgc}
                alt="First slide"
              />
            </FadeIn>
          )
        }
                </Col>
                
                <Col className="box2c " xl={5} lg={5} md={6} sm={7} xs={12}>
                <FadeIn>
                

                <div className="mainc" >
                <Row className="top">
                    <Col xl={8} lg={6} md={6} sm={6} xs={6}><p className="txt3c text-left">Optimiza tu tiempo</p> </Col> 
                    
                </Row>
                 
                </div>

                <div className="maint pb-5 pt-2" >
                
                <Row className="topct">
                     <Col xl={12} lg={12} md={12} sm={12} xs={12}><p className="txtcad text-left  pl-4">Informacion personal </p> </Col> 
                     <hr/>
                    <Col xl={4} lg={5} md={4} sm={4} xs={4}><p className="txtcadtbt text-left pt-3 pl-5">Nombre: </p> </Col> 
                    <Col xl={8} lg={7} md={8} sm={8} xs={8}><p className="txtcadtb text-left pt-3 ">{`${personAD.first_name} ${personAD.last_name}`}</p></Col> 

                    <Col xl={4} lg={5} md={4} sm={4} xs={4}><p className="txtcadtbt text-left pl-5">Celular: </p> </Col> 
                    <Col xl={8} lg={7} md={8} sm={8} xs={8}><p className="txtcadtb text-left">{personAD.phone}</p></Col> 

                    <Col xl={4} lg={5} md={4} sm={4} xs={4}><p className="txtcadtbt text-left pl-5">Correo: </p> </Col> 
                    <Col xl={8} lg={7} md={8} sm={8} xs={8}><p className="txtcadtb text-left ">{personAD.email}</p></Col> 
                </Row>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}><p className="txtcad text-left pl-3">Selecciona una categoria </p> </Col> 
                <hr/>
                <Row className="topc" >
                <Col xl={6} lg={6} md={6} sm={6} xs={6}><Button className="txtca text-left mb-4" variant="outline-light" onClick={()=> handleSubmitTurn(1) }>Admision</Button>{' '}</Col> 
                    <Col xl={6} lg={6} md={6} sm={6} xs={6}><Button className="txtca text-left mb-4 " variant="outline-light" onClick={()=> handleSubmitTurn(11) }>Facultad</Button>{' '}</Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={6}><Button className="txtca text-left " variant="outline-light" onClick={()=> handleSubmitTurn(21) }>General</Button>{' '} </Col> 
                    <Col xl={6} lg={6} md={6} sm={6} xs={6}><Button className="txtca text-left" variant="outline-light" onClick={()=> handleSubmitTurn(31) }>Idiomas</Button>{' '}</Col> 
                </Row>
                </div>
             </FadeIn>
                </Col>
               


            </Row>
        </Container>
        </div>
        </div>
    )

}

export default Categoria
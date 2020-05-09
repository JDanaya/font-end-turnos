import React, { useState, useEffect } from 'react';
import './styles.css';
import imgi from './itsaW.png'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'; 
import Typing from 'react-typing-animation';
import FadeIn from 'react-fade-in';
import { tel} from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'
axios.defaults.timeout = 20000 //tiempo permitido de respuesta
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'DELETE, POST, GET, OPTIONS'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Accept'
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
const BASE_URL= 'https://iturn20.herokuapp.com/api';

function Login(props){

  const { addToast } = useToasts()
  const [next, setNext] = useState(false)
  const [show, setShow] = useState(false)
  const [person, setPerson] = useState('--')

  useEffect( ()=>{
    handleLogin()
},[])

useEffect( ()=>{
  setPerson(localStorage.getItem('person'));
},[next])


const handleLogin = ()=> {
  // Get data
  var dataUser = localStorage.getItem('iturnUser');
  var dataPassword = localStorage.getItem('iturnPassword');

  if(dataUser && dataPassword){
      //handle next app
      return props.history.push('/categoria')
  }
}

const showNotify = (data, type)=>{
  return addToast(data, {
      appearance: type,
      autoDismiss: true,
    })
}

const handleSubmit = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const userg = event.target.formBasicEmail.value;
  const passwordg = event.target.formBasicPassword.value;

  axios.post(BASE_URL+'/login', {
    user: userg,
    password: passwordg
  })
  .then(function (response) {
    console.log(response.data);

    if(response.data.data[0]){
        console.log(response.data.data[0].id_user)
        if(response.data.data[0].id_user){
            localStorage.setItem('iturnUser', userg);
            localStorage.setItem('iturnPassword', passwordg);

            const auxPerson = `${response.data.data[0].first_name} ${response.data.data[0].last_name}`
            localStorage.setItem('person', auxPerson)
            return props.history.push('/categoria')
        }
    }
   
    return showNotify(response.data.data, 'warning')

  })
  .catch(function (error) {
      console.log(error)
    return showNotify('algo salio mal', 'warning')
  });


};

const handleSubmitRegister = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const username = event.target.formBasicName.value;
  const lastName = event.target.formBasicLast.value;
  const numDoc = event.target.formBasicDoc.value;
  const numPhone = event.target.formBasicTel.value;
  const userEmail = event.target.formBasicEmail.value;

  axios.post(BASE_URL+'/register', {
    first_name: username,
    last_name: lastName,
    document: numDoc,
    phone: numPhone,
    email: userEmail,
  
  })
  .then(function (response) {
    console.log(response.data);

    if(response.data.status === 200){
       
            return setNext(false)
        }
   
    return showNotify(response.data.data, 'warning')

  })
  .catch(function (error) {
      console.log(error)
    return showNotify('algo salio mal', 'warning')
  });


};

  const AnimatedTypingComponent = (
    <Typing cursorClassName="text-light" onFinishedTyping={ () => {
      setShow(true)
    }} speed={80} className=" text-light text-left txtbl pr-5 mt-5" >
      <span>Enturnate de manera facil & en muy pocos pasos</span>
    </Typing>
  ) 

  const LoginComponent = (<Row>
        
      <Col className="box1" xl={7} lg={6} md={5} sm={6} xs={12}>
        {AnimatedTypingComponent}
        {
          
          show ? (
            <FadeIn>
              <img
                className="d-block  itsa"
                src={imgi}
                alt="First slide"
              />
            </FadeIn>
          ): null
        }
        
                
      </Col>

      <Col className="box2" xl={5} lg={6} md={7} sm={6} xs={12}>
        
        <p className="textTop text-left ">
          <b>iTurn</b> 
        </p>

        <p className="textDown text-left text-light">
          A continuacion podras ingresar tu correo e id creada con anterioridad 
        </p>
        
        <Form className="frm" onSubmit={handleSubmit}>
        <FadeIn>
          <Form.Group className="left" controlId="formBasicEmail">
            <Form.Label className="text-light txtEmail"> Correo electronico </Form.Label>
            <Form.Control className="btnEmail" type="email" placeholder="Ingresa tu correo" />
          </Form.Group>

          <Form.Group className="left" controlId="formBasicPassword">
            <Form.Label className="text-light txtPassword"> Numero documento</Form.Label>
            <Form.Control className="btnPassword" type="password" placeholder="Ingresa tu ID" />
          </Form.Group>

          <Button className="leftButtonl"  variant="light" size="sm" type="submit">
            <b>Ingresar</b> 
          </Button>
        </FadeIn>
       
      </Form>

        <p className="textDownAcc text-left text-light">
          No tienes una cuenta? <a className="text-primary" onClick={ ()=>{
            setNext(true)
          } }> Crear aqui</a>
        </p>

      </Col>

    </Row>
  ) 


  const RegisterComponent = (<Row>
        
      <Col className="box1" xl={7} lg={6} md={5} sm={12} xs={12}>

      <span > <p className="text-light text-left txtbl mt-5 pt-5 pr-5">Bienvenido a la sesion de registro de iTurn</p> </span>
        {
           (
            <FadeIn>
              <img
                className="d-block  itsa"
                src={imgi}
                alt="First slide"
              />
            </FadeIn>
          )
        }
      
      </Col>

      <Col className="box2r" xl={5} lg={6} md={7} sm={12} xs={12}>
        
        <p className="textTopreg text-left ">
        <div className="arrow" onClick={ ()=>{
          setNext(false)
        } }>←<b className="title">Registrate</b></div>  
        </p>        
        
        <Form className="frmr" onSubmit={handleSubmitRegister}>
        <FadeIn>
        <Form.Group className="left" controlId="formBasicName">
          <Form.Label className="text-light">Primer Nombre</Form.Label>
          <Form.Control   placeholder="Ingresa tu nombre " />
        </Form.Group>

        <Form.Group className="left" controlId="formBasicLast">
          <Form.Label className="text-light">Primer apellido</Form.Label>
          <Form.Control   placeholder="Ingresa tu apellido " />
        </Form.Group>

        <Form.Group className="left" controlId="formBasicDoc">
          <Form.Label className="text-light">Numero documento</Form.Label>
          <Form.Control   placeholder="Ingresa documento " />
        </Form.Group>

        <Form.Group className="left" controlId="formBasicTel">
          <Form.Label className="text-light txtTel"> Celular </Form.Label>
          <Form.Control className="btnTel" type="tel" placeholder="Ingresa tu celular" />
        </Form.Group>

        <Form.Group className="left" controlId="formBasicEmail">
          <Form.Label className="text-light txtEmail"> Correo electronico </Form.Label>
          <Form.Control className="btnEmail" type="email" placeholder="Ingresa tu correo" />
        </Form.Group>

        <Button  className="leftButtonR" onClick={ ()=>{
            setNext(true)
          } }  variant="light" size="sm" type="submit" >
          Registrar 
        </Button>
        </FadeIn>
      </Form>
      </Col>

    </Row>) 
    
  return(
    <div className="grandf">
    <div className="father">
    <Container className="fill">
    {
      next ? RegisterComponent : LoginComponent 
    }
    </Container>
    </div>
    </div>
  );
}

export default Login
import React, { useState } from 'react';
import appFirebase from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(appFirebase);

const functAutenticacion = async (e, registrando) => {
  e.preventDefault();
  const correo = e.target.email.value;
  const password = e.target.password.value;
  if (registrando) {
    try {
      await createUserWithEmailAndPassword(auth, correo, password);
    } catch (error) {
      alert("Asegurese que la contraseña tenga mas de 8 caracteres");
    }
  } else {
    try {
      await signInWithEmailAndPassword(auth, correo, password);
    } catch (error) {
      alert("El usuario y contraseña son incorrectos")
    }
  }
}

const Login = () => {
  const [registrando, setRegistrando] = useState(false);

  const handleSubmit = (e) => {
    functAutenticacion(e, registrando);
  };

  return (
    <div className="container login-form">
      <h2 className="text-center mb-4">Inicio de Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="Introduce tu email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Introduce tu contraseña" required />
        </div>
        <button type="submit" className="btn btn-primary btn-block">{registrando ? "Registrarse" : "Iniciar Sesión"}</button>
        <h4>{registrando ? "Si ya tienes cuenta" : "No tienes cuenta"}<button onClick={() => setRegistrando(!registrando)}> {registrando ? "Iniciar Sesión" : "Registrarse"} </button></h4>
      </form>
    </div>
  )
}

export default Login;

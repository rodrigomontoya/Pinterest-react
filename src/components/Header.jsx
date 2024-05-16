import Logo from "./icons/Logo";
import { useState } from "react";
import { useBookStore } from "../store/bookStore";
import { getAuth,signOut } from "firebase/auth";
import appFirebase from "../firebase";

const auth =getAuth(appFirebase);

const Header = ({correoUsuario})=>{

    const [value,setValue]=useState('cat');

    const updateValue =useBookStore(state=> state.updateValue);


    const handleKey = (e) => {
       if(e.key==="Enter"){
       //console.log("Press enter",value);
        updateValue(value);

        

       }
    }
     
   
return(
<header>
    <ul className="menu">
        <li className="logo"><a href=""><Logo/> </a></li>
        <li><a href="">Inicio </a></li>
        <li><a href="">Hoy </a></li>
        <li><a href="">{correoUsuario}</a></li>
        <li><input 
         type="search"
         placeholder="Search"
         onChange={e=> setValue(e.target.value)}
         onKeyDown={handleKey}
         />
         </li>
         <li>
    <a onClick={() => signOut(auth)} className="logout">Logout</a>
</li>

    </ul>
</header>


);

};


export default Header;
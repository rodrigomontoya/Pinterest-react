import Logo from "./icons/Logo";
import { useState } from "react";
import { useBookStore } from "../store/bookStore";
const Header = ()=>{

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
        <li><a href="">Crear </a></li>
        <li><input 
         type="search"
         placeholder="Search"
         onChange={e=> setValue(e.target.value)}
         onKeyDown={handleKey}
         />
         </li>
        <li><a href="">User </a></li>
    </ul>
</header>


);

};


export default Header;
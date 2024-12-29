import './Header.css'
import phoneIcon from '../icons/telefon.png';
import mail from '../icons/mail.png';
import box from '../icons/box.png';
import heart from '../icons/heart.png';
import gigatron from '../icons/gigatron.png';
import user from '../icons/user.png';
import cart from '../icons/cart.png';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { useState, useEffect } from 'react';

const Header = (cartUpdate) => {

    const [numberOfProductInC,setNumberOfProductInC] = useState(0);


    useEffect( () => {

        const getCart = async () => {
    
            try{
    
                const response = await axios.get('http://localhost:4000/api/products/get_products_from_cart', {
                    withCredentials: true, 
                });
                setNumberOfProductInC(response.data.length);
                
    
            }catch(err){
    
                console.log('Greska pri preuzimanju podataka iz korpe', err);
            }
    
        };
    
        getCart();


    }, [cartUpdate]);

    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    return(

        <div>
            <header className="header">
            <div className="my-container"> 
                <div className="row header-row">
                    <div className="col-2 d-flex  flex-gap">
                        <img src = {phoneIcon} alt="Phone" className="img-size"></img>
                        <p className="mb-0 p-header">Pozovite nas</p> 
                    </div>
                    <div className="col-2 d-flex flex-gap">
                        <img src = {mail} alt="Mail" className="img-size"></img>
                        <p className="mb-0 p-header">prodaja@gigatron.shop.com</p>
                    </div>
                    <div className="col-4">
                        
                    </div>
                    <div className="col-2 d-flex flex-gap">
                        <img src = {box} alt="Box" className="img-size"></img>
                        <p className="mb-0 p-header">Status porudzbine</p>
                    </div>
                    <div className="col-2 d-flex flex-gap">
                        <img src = {heart} alt="Heart" className="img-size"></img>
                        <p className="mb-0 p-header">Lista zelja</p>
                    </div>

                </div>
                <div className="row align-items-center justify-content-center">
                    <div className="col-2" onClick={() => {navigate(`/`);}}>
                        <img src = {gigatron} alt="Gigatron" className="gigatron-img"></img>
                    </div>

                    <div className="col-6 align-items-center justify-content-center" style={{paddingBottom: "15px"}}>
                        <form onSubmit={ (e) => e.preventDefault()}>
                            <input className="search-input" type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Unesite pojam za pretragu">

                            </input>


                        </form>
                    </div>
                    <div className="col-2 d-flex flex-gap" onClick={() => {navigate(`/profile`);}}>
                        <img src = {user} alt="User" className="img-size"></img>
                        <p className="mb-0 p-header">Prijava</p> 
                    </div>
                    <div className="col-2 d-flex flex-gap" onClick={() => {navigate(`/cart`);}}>
                        <div style={{position: "relative"}}>
                            <img src = {cart} alt="Cart" className="img-size"></img>
                            {numberOfProductInC !== 0 && <div style={{position: "absolute", top: -3, left: -3,background: "yellow", color: "black", borderRadius: 7, width: 17, height: 17, display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p style={{marginBottom: 0}}>{numberOfProductInC}</p>
                            </div>}
                        </div>
                        <p className="mb-0 p-header">Korpa</p>
                    </div>              

                </div>
                
            </div>

            </header>
        </div>
    );

};

export default Header;
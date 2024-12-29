import './Footer.css'
import gigatron from '../icons/gigatron.png';
import facebook from '../icons/facebook.png';
import linkedin from '../icons/linkedin.png';
import youtube from '../icons/youtube.png';
import instagram from '../icons/instagram.png';

const Footer = () => {

    return(

        <div className="footer">
            <div className="my-container">
                <div className="footer-row">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-2">
                            <img src = {gigatron} alt="Gigatron" className="gigatron-img"></img>
                        </div>

                        <div className="col-2 d-flex align-items-center justify-content-center">

                            <p className="mb-0 p-footer">ISPORUKA</p> 
                        </div>
                        <div className="col-2 d-flex flex-gap">
                            <p className="mb-0 p-footer">GIGATRON KARTICA</p> 
                        </div>           
                        <div className="col-2 d-flex flex-gap">
                            <p className="mb-0 p-footer">SOK CENE I PROMOCIJE</p> 
                        </div>   
                        <div className="col-2">
                        
                        </div>
                        <div className="col-2 d-flex flex-gap">
                            <img src = {facebook} alt="Facebook" className="img"></img>
                            <img src = {linkedin} alt="LinkedIn" className="img"></img>
                            <img src = {youtube} alt="Youtube" className="img"></img>
                            <img src = {instagram} alt="Instagram" className="img"></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-container">
                <div style={{width: "100%" ,height: "1px", background: "white"}}></div>
            </div>
            <div className="my-container">
                <div className="footer-row">
                    <div className="row align-items-center justify-content-center">
    

                        <div className="col-2 footer-div">

                            <p className="mb-0 p-footer">KORISNICKI NALOG</p>
                            <p className="mb-0 p-footer2">Vec ste registrovani?<br></br>Ulogujte se sada</p>
                            <p className="mb-0 p-footer2">Zaboravljena lozinka</p>
                            <p className="mb-0 p-footer2">Registracija</p>
                        </div>
                        <div className="col-2 footer-div">
                            <p className="mb-0 p-footer">PRODAJA</p>
                            <p className="mb-0 p-footer2">Akcije</p>
                            <p className="mb-0 p-footer2">Novosti</p>
                            <p className="mb-0 p-footer2">Gaming korner</p>
                        </div>           
                        <div className="col-2 footer-div">
                            <p className="mb-0 p-footer">KOMPANIJA GIGATRON</p> 
                            <p className="mb-0 p-footer2">O Kompaniji Gigatron</p>
                            <p className="mb-0 p-footer2">Drustveno odgovorno <br></br> poslovanje</p>
                            <p className="mb-0 p-footer2">Posao u Gigatronu</p>
                            <p className="mb-0 p-footer2">Zakupljujemo lokale</p>
                            <p className="mb-0 p-footer2">Company profile</p>
                        </div>   
                        <div className="col-2 footer-div">
                            <p className="mb-0 p-footer">KUPOVINA</p> 
                            <p className="mb-0 p-footer2">Gigatron loyality kartica</p> 
                            <p className="mb-0 p-footer2">Uslovi koriscenja</p>
                            <p className="mb-0 p-footer2">Politika privatnosti</p>
                            <p className="mb-0 p-footer2">Detalji ugovora o <br></br>prodaji</p>
                            <p className="mb-0 p-footer2">Prava i obaveze<br></br>potrosaca</p>
                            <p className="mb-0 p-footer2">Reklamacije</p>
                            <p className="mb-0 p-footer2">Prodavnice</p>
                            <p className="mb-0 p-footer2">Osiguranje uredjaja</p>
                        </div> 
                        <div className="col-2 footer-div">
                            <p className="mb-0 p-footer">POTREBNA VAM JE <br></br>POMOC</p>
                            <p className="mb-0 p-footer2">Kontakt</p> 
                            <p className="mb-0 p-footer2">Kako kupovati na<br></br> giagtron.rs</p>
                            <p className="mb-0 p-footer2">Cesta pitanja</p>
                            <p className="mb-0 p-footer2">Sta su gigatron bodovi</p>
                        </div> <div className="col-2 footer-div">
                            <p className="mb-0 p-footer">PLACANJE I ISPORUKA</p> 
                            <p className="mb-0 p-footer2">Nacin placanja</p>
                            <p className="mb-0 p-footer2">Isporuka</p>
                            <p className="mb-0 p-footer2">TAX FREE i Ambasade</p>
                        </div> 
                    </div>
                </div>
            </div>
        
        </div>
    );
};

export default Footer;
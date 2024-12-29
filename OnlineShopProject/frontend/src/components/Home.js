import './Home.css';
import tag from '../icons/tag.png';
import popusti from '../icons/popusti.png';
import paper from '../icons/paper.png';
import isporuka from '../icons/isporuka.png';

import televizor from '../icons/televizori.webp';
import telefoni from '../icons/telefoni.webp';
import laptopovi from '../icons/laptopovi.webp';
import racunari from '../icons/racunari.webp';
import vesmasina from '../icons/vesmasina.webp';
import klima from '../icons/klima.png';

import popust1 from '../icons/popust1.png';
import popust2 from '../icons/popust2.png';
import popust31 from '../icons/popust3.1.png';
import popust32 from '../icons/popust3.2.png';


const Home = () => {

    return(
        <div style={{background: "#F2F2F2", paddingTop: "50px"}}>
            <div className="cont-info">
                <div className="row" style={{ paddingTop: "20px", paddingBottom: "20px"}}>
                    <div className="col-3 d-flex align-items-center justify-content-center" style={{ gap: "20px" }}>
                        <img src={tag} alt="Akcije" className="icons" />

                        <div>
                            <p style={{ fontSize: "15px", marginBottom: "0px" }}>Najnovije akcije</p>
                            <a href="" style={{ fontSize: "12px",  marginBottom: "0px", color: "#928f8f"   }}>Saznajte više</a>
                        </div>
                    </div>
                    <div className="col-3 d-flex align-items-center justify-content-center" style={{ gap: "20px" }}>
                        <img src={popusti} alt="Popusti" className="icons" />

                        <div>
                            <p style={{ fontSize: "15px", marginBottom: "0px" }}>Osvojite popuste</p>
                            <a href="" style={{ fontSize: "12px",  marginBottom: "0px", color: "#928f8f"   }}>Saznajte više</a>
                        </div>
                    </div>
                    <div className="col-3 d-flex align-items-center justify-content-center" style={{ gap: "20px" }}>
                        <img src={paper} alt="Kupovina na rate" className="icons" />

                        <div>
                            <p style={{ fontSize: "15px", marginBottom: "0px" }}>Kupovina na rate</p>
                            <a href="" style={{ fontSize: "12px",  marginBottom: "0px", color: "#928f8f"   }}>Saznajte više</a>
                        </div>
                    </div>
                    <div className="col-3 d-flex align-items-center justify-content-center" style={{ gap: "20px" }}>
                        <img src={isporuka} alt="Isporuka" className="icons" />

                        <div>
                            <p style={{ fontSize: "15px", marginBottom: "0px" }}>Najnovije akcije</p>
                            <a href="" style={{ fontSize: "12px",  marginBottom: "0px", color: "#928f8f"   }}>Saznajte više</a>
                        </div>
                    </div>
   
                </div>
            </div>
            <div className="my-container" style={{marginTop: "20px"}}>
                <h4>Najtrazenije kategorije</h4>
            </div>

            <div className="cont-info">
                <div className="row">
                    <div className="col-2 naj-kategorije">
                        <div className="div-img-kat">
                            <img className="kat-img" src={televizor} alt="Najprodavaniji televizori" />
                        </div>
                        <p className="text-kat">
                            Najprodavaniji<br>
                            </br>
                            televizori
                        </p>

                    </div>

                    <div className="col-2 naj-kategorije">
                        <div className="div-img-kat">
                            <img className="kat-img" src={telefoni} alt="Najprodavaniji telefoni" />
                        </div>
                        <p className="text-kat">
                            Najprodavaniji mobilni<br>
                            </br>
                            telefoni
                        </p>

                    </div>
                    <div className="col-2 naj-kategorije">
                        <div className="div-img-kat">
                            <img className="kat-img" src={laptopovi} alt="Najprodavaniji laptopovi" />
                        </div>
                        <p className="text-kat">
                            Najprodavaniji<br>
                            </br>
                            laptopovi
                        </p>

                    </div>
                    <div className="col-2 naj-kategorije">
                        <div className="div-img-kat">
                            <img className="kat-img" src={racunari} alt="Najprodavaniji racunari" />
                        </div>
                        <p className="text-kat">
                            Najprodavaniji<br>
                            </br>
                            racunari
                        </p>

                    </div>
                    <div className="col-2 naj-kategorije">
                        <div className="div-img-kat">
                            <img className="kat-img" src={vesmasina} alt="Najprodavanije ves masine" />
                        </div>
                        <p className="text-kat">
                            Najprodavanije<br>
                            </br>
                            ves masine
                        </p>

                    </div>
                    <div className="col-2 naj-kategorije">
                        <div className="div-img-kat">
                            <img className="kat-img" src={klima} alt="Najprodavaniji klima uredjaji" />
                        </div>
                        <p className="text-kat">
                            Najprodavaniji<br>
                            </br>
                            klima uredjaji
                        </p>

                    </div>
                </div>
            </div>
            <div className="my-container" style={{marginTop: "20px"}}>
                <h4>Specijalni popusti i akcije</h4>
            </div>

            <div className="my-container popusti-div">


                <div className="col-4 d-flex align-items-center justify-content-center">
                    <img className="akcije-img" src={popust1} alt="Candy bela tehnika" />
                </div>
                <div className="popusti-div2">
                    <img className="akcije-img2" src={popust31} alt="Motorola"/>
                    <img className="akcije-img2" src={popust32} alt="Candy bela tehnika" />
                </div>
                <div className="col-4 d-flex align-items-center justify-content-center">
                    <img className="akcije-img" src={popust2} alt="Nordex"/>
                </div>

            </div>
        </div>
    );

};

export default Home;
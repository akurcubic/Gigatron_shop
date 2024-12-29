import './ProductView.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import truck from '../icons/truck.png';
import check from '../icons/check.png';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";

Modal.setAppElement('#root');


const ProductView = ({setCartUpdate, cartUpdate}) => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [mainPicture, setMainPicture] = useState(''); 
    const [counterForCart, setCounterForCart] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [textForAddB, setTextForAddB] = useState("Dodaj u korpu");

    const navigate = useNavigate();


    useEffect(() => {
        const fetchProductInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/products/single_product/${productId}`);
                setProduct(response.data);
                setMainPicture(response.data.images.find(image => image.isPrimary)?.url || "");
                console.log("Product brandIdpopulate",product.brandId);
            } catch (err) {
                console.log('Greška pri dohvatanju posebnog proizvoda', err);
            }
        };

        fetchProductInfo();

        const getCart = async () => {
    
            try{
    
                const response = await axios.get('http://localhost:4000/api/products/get_products_from_cart', {
                    withCredentials: true, 
                });

                console.log("Ovo je rezultat korpe:", response.data);
                
                response.data.forEach(p => {
                    if(p.product._id === productId){
                        setTextForAddB("U korpi");
                    }
                })
    
            }catch(err){
    
                console.log('Greska pri preuzimanju podataka iz korpe', err);
            }
    
        };
    
        getCart();
    }, []); 

    const calculatePriceOnTwoYears = (price) => {

        return parseFloat(((price * 1000 / 24) / 1000).toFixed(3));

    };

    const handleAddInCartClick = async () => {

        try{
            const response = await axios.post(`http://localhost:4000/api/products/add_in_cart/${productId}/${counterForCart}`,
                null,
                {
                    withCredentials: true // Ovo omogućava slanje kolačića sa sesijom
                }
            );
            console.log("Dodavnje proizvoda u korpu: ",response.data);
            setIsModalOpen(true);
            setTextForAddB("U korpi");
            setCartUpdate(cartUpdate + 1);

        }
        catch(err){
            console.log("Greska pri dodavanju proizvoda u korpu", err);
        }

    };


    return (
        <div className="my-container main-container">
            <div style={{display: "flex", flexDirection: "column", gap: 20}}>
                <div className="picture-container">
                    <div className="gallery" style={{display: "flex", flexDirection: "column",}}>
                        {product.images && product.images.length > 0 ? (
                            product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    alt={`Image ${index + 1} of ${product.name || "Product"}`}
                                    style={{width:120, height: 120}}
                                    onClick={() => {setMainPicture(image.url)}}
                                />
                            ))
                        ) : (
                            <p>Slike nisu dostupne.</p>
                        )}
                    </div>
                    {product && product.images && product.images.length > 0 ? (
                        <img
                            className="main-img"
                            src={mainPicture}
                            alt={product.name || "Product"}
                        />
                    ) : (
                        <p>Slike nisu dostupne.</p>
                    )}
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr", 
                    gap: "10px", 
                    border: "1px solid #aaa3a3",
                    padding: "10px",
                    marginBottom: "10px"
                }}>
                    {product && product.attributes ? (
                        
                        product.attributes.map(attribut => (
                            <div style={{display: "flex", gap: 10}}> 
                                <p style={{fontSize : 12, fontWeight: 500}} >{attribut.name}</p>
                                <p style={{fontSize: 12}}>{attribut.value}</p>
                            </div>

                        ))
                    ): <p>Nema specifikaciju</p>}
                </div>

            </div>
            <div style={{display: "flex", flexDirection: "column", gap: 20, alignItems: "left"}}>
                {product ? (
                    <h2>{product.name}</h2>
                ):(<p>nije dostupno</p>)
                }
                {product ? (
                    <div style={{display: "flex", gap: 10}}>
                        <p>{product.description}</p>

                    </div>
                ):(<p>nije dostupno</p>)
                }
                {product ? (
                    <div style={{display: "flex", gap: 30, alignItems:'center'}}>
                        <p style={{fontSize: 30, fontWeight: 600, marginTop: 0}}>{product.price}<span style={{fontSize: 15, fontWeight: 400}}>RSD</span></p>
                        <p>ili</p>
                        <p style={{fontSize: 20, fontWeight: 500, marginTop: 0}}>{calculatePriceOnTwoYears(product.price)}<span style={{fontSize: 15, fontWeight: 400}}>RSD/mesecno<br></br>Na rate bez kamate<br></br><a style={{color: "#aaa3a3"}} href = "">Saznaj vise</a></span></p>

                    </div>
                ):(<p>nije dostupno</p>)
                }
                <div style={{
                    display: "flex", 
                    alignItems: "center", 
                    gap: "30px", 
                    border: "1px solid #aaa3a3", 
                    borderRadius: "20px", 
                    padding: "5px",
                    width: "fit-content"
                }}>
                    <button style={{background: "white", height: "25px", border: "none"}} onClick={() => {(counterForCart !== 0) ? setCounterForCart(counterForCart - 1) : setCounterForCart(0)}} >-</button>
                    <p style={{margin: 0}}>{counterForCart}</p>
                    <button style={{background: "white", height: "25px", border: "none"}} onClick={() => {setCounterForCart(counterForCart + 1)}}>+</button>
                </div>

                <button style={{paddingTop: 10, paddingBottom: 10, background: "rgb(241, 241, 80)", borderRadius: 20, border: "none"}} 
                onClick={
                    () => {
                        if(textForAddB === "Dodaj u korpu"){
                            handleAddInCartClick()
                        }
                        else{
                            navigate(`/cart`);
                        }
                    }
                }
                >{textForAddB}</button>
                
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    contentLabel="Proizvod dodat u korpu"
                    style={{
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: "50vw",/* Polovina širine ekrana */
                            height: "50vh" /* Polovina visine ekrana */,
                            borderRadius: 10
                        },
                    }}
                >
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column", gap: 20}}>
                        <div style={{display: "flex", alignItems: "center", gap: 20}}>
                            <img src = {check} alt="Check" style={{width: 40, height: 40}}></img>
                            <p style={{fontSize: 20, marginBottom: 0}}>Proizvod je dodat u korpu</p>
                        </div>
                       
                        <div style={{width: "100%" ,height: "1px", background: "#aaa3a3"}}></div>
                        

                        <div style={{display: "flex", gap: 10, width: "100%", alignItems: "center"}}>
                            <div style={{display: "flex", alignItems: "center", gap: 40}}>
                                <img src = {product.images && product.images[0].url} alt="Picture" style={{width: 100, height: 100}}></img>
                            
                            
                                <div style={{display: "flex", flexDirection: "column", gap: 10}}>
                                    <p style={{ fontSize: 15, marginBottom: 0}}>
                                            {product.name && product.name}
                                    </p>
                                    <p style={{ fontSize: 15, marginBottom: 0}}>
                                            Cena: {product.price && product.price}
                                    </p>
                                    <div style={{display: "flex", alignItems: "center", gap: 10}}>
                                        <button style={{background: "rgb(136, 201, 75)", color: "black", padding: 8, border: "none", borderRadius: 10, fontWeight: 400}} onClick={() => {setIsModalOpen(false); navigate(`/cart`)}}>Idi u korpu</button>
                                        <button style={{background: "rgb(59, 59, 110)", color: "white", padding: 8, border: "none", borderRadius: 10, fontWeight: 400}} onClick={() => {setIsModalOpen(false)}} >Nastavite kupovinu</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </Modal>

                <div style={{display: "flex", alignContent: "center",justifyContent: "center", gap: 20, border: "1px solid #aaa3a3", paddingBottom: 10, paddingTop: 10}}>
                    <img src = {truck} alt="Truck" style={{width: 20, height: 20}}></img>
                    Proverite vreme isporuke 011 44 14 000 ili <br></br> sa mobilnog telefona 0666 67 67 67
                </div>
            </div>
        </div>
    );
};

export default ProductView;

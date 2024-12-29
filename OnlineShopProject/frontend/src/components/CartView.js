import './CartView.css';
import axios from "axios";
import { useEffect, useState } from "react";
import x from '../icons/x.png';
import payment1 from '../icons/payment1.png';
import payment2 from '../icons/payment2.png';
import payment3 from '../icons/payment3.png';
import payment4 from '../icons/payment4.png';
import check from '../icons/check.png';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";

Modal.setAppElement('#root');



const CartView = ({setCartUpdate, cartUpdate}) => {

    const [cart, setCart] = useState([]);
    const [price, setPrice] = useState(0);
    const [counter, setCounter] = useState(0);
    const [selectedOption, setSelectedOption] = useState("Na kucnu adresu");
    const [selectedOption2, setSelectedOption2] = useState("Fizicko lice");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [nameAndNickName, setNameAndNickName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAdress] = useState("");
    const [city, setCity] = useState("");
    const [posNum, setPosNum] = useState("");
    const [counterForDelete, setCounterForDelete] = useState(0);
    const [shops, setShops] = useState([]);
    const [shopForOrder, setShopForOrder] = useState("");
    const [showShops, setShowShops] = useState(false);
    const [showOrderDialog, setShowOrderDialog] = useState(false);

    const navigate = useNavigate();


    const handleDeleteButton = async (productId) => {

        try{

            const response = await axios.delete(`http://localhost:4000/api/products/delete_in_cart/${productId}`,{
                withCredentials: true, 
            });
            console.log(response.data);
            setCounterForDelete(counterForDelete + 1);
            setCartUpdate(cartUpdate + 1);

        }catch(err){

            console.log("greska prilikom brisanja:", err);
        }
    }

    useEffect( () => {

        const getCart = async () => {
    
            try{
    
                const response = await axios.get('http://localhost:4000/api/products/get_products_from_cart', {
                    withCredentials: true, 
                });
                
                setCart(response.data);
    
            }catch(err){
    
                console.log('Greska pri preuzimanju podataka iz korpe', err);
            }
    
        };
    
        getCart();

    
    },[counterForDelete]);

    const priceForProduct = (price, counter) => {

        return price * counter;
    };

    const handleAdd = (id) => {
        setCart((prevState) =>
            prevState.map((item) =>
                item.product._id === id
                    ? { ...item, counter: Number(item.counter) + 1 }
                    : item
            )
        );
        console.log("Novi cart nakon dodavanja:", cart);
    };

    const handleSubtract = (id) => {
        setCart((prevState) =>
            prevState.map((item) =>
                item.product._id === id
                    ? { ...item, counter: Number(item.counter) - 1 }
                    : item
            )
        );
        console.log("Novi cart nakon dodavanja:", cart);
    };
    

    const getPrice = () => {

        let sum = 0;
        cart.forEach(product => (

             sum += (product.product.price * 1000) * product.counter
        ))
        setPrice(sum);
    }

    const make_order = async () => {

        const p = cart.map(item => (
            {
                product : item.product,
                quantity : item.counter
            
            }
        ));


        let deliveryAddress = [];
        if(selectedOption === "Na kucnu adresu"){

            deliveryAddress = [
                {
                name: "Ime i prezime",
                value: nameAndNickName
                },
                {
                name: "Telefon",
                value: phone
                },
                {
                name: "E-mail",
                value: email
                },
                {
                name: "Grad",
                value: city
                },
                {
                name: "zipCode",
                value: posNum
                },
                {
                name: "Adresa",
                value: address
                }
            ]
        }
        else{

            deliveryAddress = [
                {
                name: "Ime i prezime",
                value: nameAndNickName
                },
                {
                name: "Telefon",
                value: phone
                },
                {
                name: "E-mail",
                value: email
                },
                {
                name: "Prodavnica",
                value: shopForOrder
                }
            ]
        }
        

        try{

            const response = await axios.post(`http://localhost:4000/api/products/make_order`, {
                             
                    products: p,
                    price: price,
                    deliveryMethod: selectedOption,
                    deliveryAddress: deliveryAddress,
                    paymentMethod: paymentMethod
                },
                {
                    withCredentials: true
                }
            );
            console.log(response);
            setCartUpdate(cartUpdate + 1);
            setShowOrderDialog(true);

        }catch(err){

            console.log("Greska prilikom narucivanja proizvoda!", err);
        }
    };

    const canSubmit = () => {

        if(cart.length === 0){
            return false;
        }


        if(counter === 0 || (counter === 1 && nameAndNickName !== "" && email !=="" && phone !== "" && address !== "" && city !== "" && posNum !== "" && selectedOption === "Na kucnu adresu") || (counter === 1 && nameAndNickName !== "" && 
            email !== "" && phone !== "" && selectedOption === "Preuzimanje u Gigatron prodavnici") || (counter === 2 && (selectedOption2 === "Fizicko lice" || selectedOption2 === "Pravno lice") && paymentMethod !== "") || counter === 3
        ){
            return true;
        }
        return false;

    };

    

    useEffect(() => {

        getPrice();

    },[cart]);

    useEffect(() => {

        const getShops = async() => {

            try{

                const response = await axios.get(`http://localhost:4000/api/users/get_all_shops`);
                console.log(response);
                setShops(response.data);
                setShopForOrder(response.data[0].name);


            }catch(err){

                console.log("Greska prilikom dohvatanja proizvoda!", err);
            }
        }

        getShops();

    },[])

    return(
        <div style={{background: "#F2F2F2"}}>
            <div className="my-container">
                <div style={{display: "flex", alignItems: "top", justifyContent: "center", gap: 20}}>
                    {counter === 0 && <div style={{display: "flex", flexDirection: "column", gap: 10, background: "white", border: "none", width: "60%", marginTop: 20, padding: 30, marginBottom: 20}}>
                        <h3>Vaša korpa</h3>
                        
                            {cart.map( (product) => (
                                <div key={product.product._id} style={{display: "flex", flexDirection: "column", gap: 10}}>
                                    <div style={{display: "flex", gap: 10}}>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <img src = {product.product.images[0].url} alt="Picture" style={{width: 100, height: 100}}></img>
                                        </div>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                        <p style={{ fontSize: 15 }}>
                                                {product.product.name.length > 20 ? 
                                                <span>{product.product.name.substring(0, 20)}<br />{product.product.name.substring(20)}</span> :
                                                product.product.name
                                            }
                                        </p>


                                        </div>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <div style={{
                                                display: "flex", 
                                                alignItems: "center", 
                                                gap: "30px", 
                                                border: "1px solid #aaa3a3", 
                                                borderRadius: "20px", 
                                                padding: "5px",
                                                width: "fit-content",
                                                height: "fit-content"
                                            }}>
                                                <button style={{background: "white", height: "30px", border: "none"}} onClick={() => {handleSubtract(product.product._id)}} >-</button>
                                                <p style={{margin: 0}}>{product.counter}</p>
                                                <button style={{background: "white", height: "30px", border: "none"}} onClick={() => {handleAdd(product.product._id)}} >+</button>
                                            </div>
                                        </div>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <p style={{marginBottom: 0, fontWeight: 500}}>{product.product.price}<span> RSD</span></p>
                                        </div>
                                        <div style={{display: "flex", alignItems: "center"}} onClick={() => {handleDeleteButton(product.product._id)}}>
                                            <img src = {x} style={{width: 20, height: 20}}></img>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{width: "100%" ,height: "2px", background: "#F2F2F2"}}></div>
                                    </div>
                                </div>
                            
                            ))}
                        
                    </div>}
                    {counter === 1 &&
                    
                        <div style={{display: "flex", flexDirection: "column", gap : 20, padding: 10, background: "white", border: "none", width: "60%", marginTop: 20, padding: 30, marginBottom: 20,}}>
                            <div style={{display: "flex", flexDirection: "column", gap: 5}}>
                                <p>Odaberite način isporuke</p>
                                <div style={{display: "flex", gap: 10}}>
                                    <div style={{padding: 10, border: "1px solid black", width: "50%", borderRadius: 5}}> 
                                        <label style={{display: "flex", alignItems: "center", gap: "5px"}}>
                                        <input
                                            type="radio"
                                            name="options"
                                            value="Na kucnu adresu"
                                            checked={selectedOption === "Na kucnu adresu"}
                                            onChange={() => setSelectedOption("Na kucnu adresu")}
                                            style={{
                                                width: 20,
                                                height: 20
                                            }}
                                        />
                                        Na kucnu adresu
                                        </label>
                                    </div>
                                    <div style={{padding: 10, border: "1px solid black", width: "50%", borderRadius: 5}}> 
                                        <label style={{display: "flex", alignItems: "center", gap: "5px"}}>
                                        <input
                                            type="radio"
                                            name="options"
                                            value="Preuzimanje u Gigatron prodavnici"
                                            checked={selectedOption === "Preuzimanje u Gigatron prodavnici"}
                                            onChange={() => setSelectedOption("Preuzimanje u Gigatron prodavnici")}
                                            style={{
                                                width: 20,
                                                height: 20
                                            }}
                                        />
                                        Preuzimanje u Gigatron prodavnici
                                        </label>
                                    </div>
                                </div>

                            </div> 

                            {selectedOption === "Na kucnu adresu" && 
                                    <div style={{display: "flex", flexDirection: "column", gap: 5}}>
                                    <p>Adresa isporuke</p>
                                    <p style={{marginBottom: 0, fontSize: 10, color: "#aaa3a3"}}>Dostava ce biti izvrsena na ovu adresu</p>
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr", 
                                        gap: "20px", 
                                        border: "1px solid #aaa3a3",
                                        padding: "10px",
                                        marginBottom: "10px"
                                    }}>
                                        <div>
                                            <p style={{marginBottom: 0, fontSize: 15}}>Ime i prezime</p>
                                            <input style={{width: "100%"}} type="text" value={nameAndNickName} onChange={(e) => {setNameAndNickName(e.target.value)}}></input>
                                        </div>
                                        <div>
                                            <p style={{marginBottom: 0, fontSize: 15}}>E-mail</p>
                                            <input style={{width: "100%"}} type="text" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
                                        </div>
                                        <div>
                                            <p style={{marginBottom: 0, fontSize: 15}}>Telefon</p>
                                            <input style={{width: "100%"}} type="text" value={phone} onChange={(e) => {setPhone(e.target.value)}}></input>
                                        </div>
                                        <div>
                                            <p style={{marginBottom: 0, fontSize: 15}}>Adresa dostave</p>
                                            <input style={{width: "100%"}} type="text" value={address} onChange={(e) => {setAdress(e.target.value)}}></input>
                                        </div>
                                        <div>
                                            <p style={{marginBottom: 0, fontSize: 15}}>Grad</p>
                                            <input style={{width: "100%"}} type="text" value={city} onChange={(e) => {setCity(e.target.value)}}></input>
                                        </div>
                                        <div>
                                            <p style={{marginBottom: 0, fontSize: 15}}>Postanski broj</p>
                                            <input style={{width: "100%"}} type="text" value={posNum} onChange={(e) => {setPosNum(e.target.value)}}></input>
                                        </div>
                                    </div>
    
                                </div>}

                                
                            {selectedOption === "Preuzimanje u Gigatron prodavnici" && 
                                    <div style={{display: "flex", flexDirection: "column", gap: 20}}>
                                    <p style={{marginBottom: 0}}>Izaberite mesto preuzimanja</p>
                                    <div style={{display: "flex", padding: 10, borderRadius: 5, border: "1px solid", position: "relative"}} onClick={() => {setShowShops(!showShops)}}>
                                    {showShops && <div style={{position: "absolute"}}>
                                            <div
                                            
                                            style={{
                                                position: "absolute",
                                                width: "500px",
                                                top: "100%",
                                                left: "0%",
                                                background: "white",
                                                color: "black",
                                                zIndex: "100",
                                                padding: 0,
                                                border: "1px solid"
                                            }}
                                        >
                                            <ul style={{ margin: 0, paddingLeft: 31, paddingRight: 31, listStyle: "none" }} className="dropdown-lis">
                                                {shops.map((shop) => (
                                                    <li
                                                        key={shop.name}
                                                        style={{ paddingTop: 15, color: "#807676" }}
                                                        onClick={() => {setShopForOrder(shop.name)}}
                                                    >
                                                        {shop.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>}
                                    
                                    {shopForOrder}
                                    </div>
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr", 
                                        gap: "20px", 
                                        border: "1px solid #aaa3a3",
                                        padding: "10px",
                                        marginBottom: "10px"
                                    }}>
                                        <div>
                                            <p style={{marginBottom: 0, fontSize: 15}}>Ime i prezime</p>
                                            <input style={{width: "100%"}} type="text" value={nameAndNickName} onChange={(e) => {setNameAndNickName(e.target.value)}}></input>
                                        </div>
                                        <div>
                                            <p style={{marginBottom: 0, fontSize: 15}}>E-mail</p>
                                            <input style={{width: "100%"}} type="text" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
                                        </div>
                                        <div>
                                            <p style={{marginBottom: 0, fontSize: 15}}>Telefon</p>
                                            <input style={{width: "100%"}} type="text" value={phone} onChange={(e) => {setPhone(e.target.value)}}></input>
                                        </div>
                                    </div>
    
                                </div>}
                        </div>
                    }

                    {counter === 2 &&
                    
                    <div style={{display: "flex", flexDirection: "column", gap : 20, padding: 10, background: "white", border: "none", width: "60%", marginTop: 20, padding: 30, marginBottom: 20,}}>
                        <div style={{display: "flex", flexDirection: "column", gap: 5}}>
                            <p>Porucujete kao:</p>
                            <div style={{display: "flex", gap: 10}}>
                                <div style={{padding: 10, border: "1px solid black", width: "50%", borderRadius: 5}}> 
                                    <label style={{display: "flex", alignItems: "center", gap: "5px"}}>
                                    <input
                                        type="radio"
                                        name="options2"
                                        value="Fizicko lice"
                                        checked={selectedOption2 === "Fizicko lice"}
                                        onChange={() => setSelectedOption2("Fizicko lice")}
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                    Fizicko lice
                                    </label>
                                </div>
                                <div style={{padding: 10, border: "1px solid black", width: "50%", borderRadius: 5}}> 
                                    <label style={{display: "flex", alignItems: "center", gap: "5px"}}>
                                    <input
                                        type="radio"
                                        name="options2"
                                        value="Pravno lice"
                                        checked={selectedOption2 === "Pravno lice"}
                                        onChange={() => setSelectedOption2("Pravno lice")}
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                    Pravno lice
                                    </label>
                                </div>
                            </div>

                        </div> 

                        <div style={{display: "flex", flexDirection: "column", gap: 20}}>
                            <p>Odaberite nacin placanja:</p>
                            <div style={{padding: 10, border: "1px solid black", width: "50%", borderRadius: 5, width: "100%"}}> 
                                    <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
                                    <input
                                        type="radio"
                                        name="options3"
                                        value={paymentMethod}
                                        checked={paymentMethod === "Placanje prilikom preuzimanja"}
                                        onChange={() => setPaymentMethod("Placanje prilikom preuzimanja")}
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <p style={{marginBottom: 0}}>Placanje prilikom preuzimanja</p>
                                        <p style={{marginBottom: 0, fontSize: 10, color: "rgb(129, 117, 117)"}}>Porudzbine mozete platiti u gotovini ili karticom</p>
                                    </div>
                                    <div style={{marginLeft: "auto"}}>
                                        <img src = {payment1} style={{width: 40, height: 40}}></img>
                                    </div>
                                </div>
                            </div>

                            <div style={{padding: 10, border: "1px solid black", width: "50%", borderRadius: 5, width: "100%"}}> 
                                <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
                                    <input
                                        type="radio"
                                        name="options3"
                                        value={paymentMethod}
                                        checked={paymentMethod === "Placanje platnom karticom"}
                                        onChange={() => setPaymentMethod("Placanje platnom karticom")}
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <p style={{marginBottom: 0}}>Placanje platnom karticom</p>
                                        <p style={{marginBottom: 0, fontSize: 10, color: "rgb(129, 117, 117)"}}>Kompletan proces placanja karticom se odvija kroz online servis banke.Sigurnost podataka je garantovana</p>
                                    </div>
                                    <div style={{marginLeft: "auto"}}>
                                        <img src = {payment2} style={{width: 40, height: 40}}></img>
                                    </div>
                                </div>
                            </div>

                            
                            <div style={{padding: 10, border: "1px solid black", width: "50%", borderRadius: 5, width: "100%"}}> 
                                <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
                                    <input
                                        type="radio"
                                        name="options3"
                                        value={paymentMethod}
                                        checked={paymentMethod === "Instant placanje - IPS skeniraj"}
                                        onChange={() => setPaymentMethod("Instant placanje - IPS skeniraj")}
                                        style={{
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                    <div style={{display: "flex", flexDirection: "column"}}>
                                        <p style={{marginBottom: 0}}>Instant placanje - IPS skeniraj</p>
                                        <p style={{marginBottom: 0, fontSize: 10, color: "rgb(129, 117, 117)"}}>Brzo i sigurno placanje skeniranjem IPS QR koda mBanking aplikacijom vase banke</p>
                                    </div>
                                    <div style={{marginLeft: "auto"}}>
                                        <img src = {payment3} style={{width: 40, height: 40}}></img>
                                    </div>
                                </div>
                            </div>

                            <div style={{padding: 10, border: "1px solid black", width: "50%", borderRadius: 5, width: "100%"}}> 
                                    <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
                                        <input
                                            type="radio"
                                            name="options3"
                                            value={paymentMethod}
                                            checked={paymentMethod === "Uplata na tekuci racun"}
                                            onChange={() => setPaymentMethod("Uplata na tekuci racun")}
                                            style={{
                                                width: 20,
                                                height: 20
                                            }}
                                        />
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            <p style={{marginBottom: 0}}>Uplata na tekuci racun</p>
                                            <p style={{marginBottom: 0, fontSize: 10, color: "rgb(129, 117, 117)"}}>Nakon procesa narucivanja, na vas e-mail ce stici uplatnica sa unapred unetim podacima za uplatu</p>
                                        </div>
                                        <div style={{marginLeft: "auto"}}>
                                            <img src = {payment4} style={{width: 40, height: 40}}></img>
                                        </div>
                                    </div>
                                
                            </div>
                            

                        </div>
                    </div>
                }

                {counter === 3 &&

                    <div style={{display: "flex", flexDirection: "column", gap: 10, padding: 10, background: "white", border: "none", width: "60%", marginTop: 20, padding: 30}}>
                        
                        <p style={{fontSize: 20}}>Informacije o isporuci</p>
                        <div>
                            <div style={{width: "100%" ,height: "2px", background: "#F2F2F2"}}></div>
                        </div>

                        <div style={{display: "flex", gap: 5, flexDirection: "column"}}>
                            <p style={{marginBottom: 0}}>Nacin placanja</p>
                            <p style={{color: "rgb(129, 117, 117)"}}>{paymentMethod}</p>
                        </div>

                        <div style={{display: "flex", gap: 5, flexDirection: "column"}}>
                            <p style={{marginBottom: 0}}>Nacin isporuke</p>
                            <p style={{color: "rgb(129, 117, 117)"}}>{selectedOption}</p>
                        </div>

                        <div style={{display: "flex", gap: 5, flexDirection: "column"}}>
                            <p style={{marginBottom: 0}}>Adresa isporuke</p>
                            <p style={{color: "rgb(129, 117, 117)", marginBottom: 0}}>{nameAndNickName}</p>
                            <p style={{color: "rgb(129, 117, 117)", marginBottom: 0}}>{email}</p>
                            <p style={{color: "rgb(129, 117, 117)", marginBottom: 0}}>{phone}</p>
                            <p style={{color: "rgb(129, 117, 117)", marginBottom: 0}}>{address}</p>
                            <p style={{color: "rgb(129, 117, 117)", marginBottom: 0}}>{city}</p>
                            <p style={{color: "rgb(129, 117, 117)", marginBottom: 0}}>{posNum}</p>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", gap: 10, background: "white", border: "none", width: "60%",marginBottom: 20, marginTop: 20, width: "100%"}}>

                            <p style={{marginBottom: 0}}>Sadrzaj korpe</p>
                            <div>
                                <div style={{width: "100%" ,height: "2px", background: "#F2F2F2"}}></div>
                            </div>
                            {cart.map( (product) => (
                                <div key={product.product._id} style={{display: "flex", flexDirection: "column", gap: 10, alignItems: "center"}}>
                                    <div style={{display: "flex", gap: 10, width: "100%", alignItems: "center"}}>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <img src = {product.product.images[0].url} alt="Picture" style={{width: 100, height: 100}}></img>
                                        </div>
                                        
                                        <div style={{display: "flex", flexDirection: "column", gap: 5}}>
                                            <p style={{ fontSize: 15, marginBottom: 0}}>
                                                    {product.product.name}
                                            </p>
                                            <p style={{ fontSize: 15, marginBottom: 0}}>
                                                    Kolicina: {product.counter}
                                            </p>
                                            <p style={{ fontSize: 15, marginBottom: 0}}>
                                                    Cena: {product.product.price}
                                            </p>

                                        </div>
                                        <div style={{display: "flex", alignItems: "center", marginLeft: "auto"}}>
                                        <p style={{ fontSize: 15, marginBottom: 0, marginLeft: "auto"}}>
                                                {priceForProduct(product.product.price,product.counter)} RSD
                                        </p>
                                        </div>
                                    </div>

                                </div>
                            
                            ))}
                        
                        </div>

                    </div>
                
                } 

                <div style={{display: "flex", flexDirection: "column", gap: 20, background: "white", border: "none", marginTop: 20, marginBottom: 20, padding: 30, width: "40%"}}>
                    <p style={{fontSize: 20}}>Pregled narudzbine</p>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <p>Cena za online placanje: </p>
                        <p style={{ marginLeft: 'auto' }}>{price}<span> RSD</span></p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <p>Popust: </p>
                        <p style={{ marginLeft: 'auto' }}>0.00 RSD</p>
                    </div>
                    <div>
                        <div style={{width: "100%" ,height: "2px", background: "#F2F2F2"}}></div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <p>Iznos kupovine: </p>
                        <div style={{display: "flex", flexDirection: "column", marginLeft: "auto", gap: 10}}>
                            <p style={{ fontSize: 22, fontWeight: 600 , marginLeft: "auto" }}>{price}<span> RSD</span></p>
                            <a href="" style={{ color: "rgb(129, 117, 117)"}}>Kreirajte link korpe</a>
                        </div>
                    </div>
                    <div style={{padding: 20, border: "1px solid rgb(129, 117, 117)"}}>
                        <a style={{color: " rgb(129, 117, 117)", fontSize: 15}} href="">Napravite novi nalog ili se ulogujte</a>
                        <p style={{margin: 0, fontSize: 15}}>na postojeci radi jednostavnije kupovine.</p>
                    </div>
                    <button style={{paddingTop: 10, paddingBottom: 10, background: "rgb(241, 241, 80)", borderRadius: 20, border: "none", fontWeight: 600}} 
                    onClick={() => {
                        if(counter < 3)
                            setCounter(counter + 1)
                        else
                            make_order();

                    }} 
                    disabled={!canSubmit()}
                    >
                        {counter === 3 ? "Zavrsite kupovinu" : "Nastavite"}
                    </button>

                    <Modal
                    isOpen={showOrderDialog}
                    onRequestClose={() => setShowOrderDialog(false)}
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
                            borderRadius: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        },
                    }}
                >
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column", gap: 20, justifyContent: "center"}}>
                        <div style={{display: "flex", alignItems: "center", gap: 20}}>
                            <img src = {check} alt="Check" style={{width: 40, height: 40}}></img>
                            <p style={{fontSize: 20, marginBottom: 0}}>Vasa porudzbina je uspesno obradjena</p>
                        </div>
                        <button style={{background: "rgb(136, 201, 75)", color: "black", padding: 8, border: "none", borderRadius: 10, fontWeight: 400}} onClick={() => {setShowOrderDialog(false); navigate(`/`)}}>OK</button>

                    </div>
                </Modal>

                    
                </div>
            </div>

            </div>
        </div>
    );


};

export default CartView;
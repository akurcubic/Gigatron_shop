import './Navigation.css';
import menu from '../icons/menu.png';
import pogosnosti from '../icons/pogodnosti.png';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Navigation = () => {
    const [showProductsMenu, setShowProductsMenu] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [products, setProducts] = useState([]);
    const productsFetched = useRef(false);
    const [submenuProducts, setSubmenuProducts] = useState({});
    const navigate = useNavigate();

    

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target) && 
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setShowProductsMenu(false); 
                setShowSubMenu(false);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/categories');
                setProducts(response.data);
                console.log('Odgovor sa servera:', response.data);
            } catch (err) {
                console.log('Došlo je do greške pri učitavanju proizvoda');
            }
        };

        if (!productsFetched.current) {
            fetchProducts();
            productsFetched.current = true; 
        }

        document.addEventListener("mousedown", handleClickOutside); 

        return () => {
            document.removeEventListener("mousedown", handleClickOutside); 
        };
    }, []); 

    useEffect(() => {
        const fetchSubmenuBrands = async () => {
            if (products.length === 0) return; 

            const updatedSubmenuBrands = await Promise.all(products.map(async (brand) => {
                try {
                    const response = await axios.get(`http://localhost:4000/api/categories/brands/${brand._id}`);
                    const brands = response.data;
                    console.log('Odgovor sa servera za brendove:', brands);
                    return { [brand.name]: brands }; 
                } catch (err) {
                    console.log('Došlo je do greške pri učitavanju brendova');
                    return { [brand.name]: [] };
                }
            }));

            const submenuObj = updatedSubmenuBrands.reduce((acc, curr) => {
                return { ...acc, ...curr };
            }, {});

            setSubmenuProducts(submenuObj); 
        };

        fetchSubmenuBrands(); 
    }, [products]);

    const handleSubmenuClick = (brandId, categoryId) => {
        navigate(`/brands/categories/${brandId}/${categoryId}`);
    };

    return (
        <div className="my-container" style={{ paddingTop: "175px" }}>
            <div className="row">
                <div
                    className="col-2 d-flex align-items-center"
                    style={{ gap: "10px", paddingTop: "10px", position: "relative" }}
                    ref={buttonRef} 
                    onClick={() => setShowProductsMenu(prevState => !prevState)} 
                >
                    <img src={menu} alt="Menu" className="icons-size" />
                    <p className="mb-0 p-levo">Proizvodi</p>
                    {showProductsMenu && (
                        <div
                            ref={menuRef} 
                            style={{
                                position: "absolute",
                                width: "500px",
                                top: "100%",
                                background: "white",
                                color: "black",
                                zIndex: "100",
                                
                            }}
                        >
                            <ul style={{ margin: 0, paddingLeft: 31, paddingRight: 31, listStyle: "none" }} className="dropdown-list">
                                {products.map((item) => (
                                    <li
                                        key={item._id}
                                        style={{ paddingTop: 15, color: "#807676" }}
                                        onMouseEnter={() => {setHoveredItem(item); setShowSubMenu(true)}}
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                            {showSubMenu && hoveredItem && submenuProducts[hoveredItem.name] && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: "100%",
                                        backgroundColor: "white",
                                        width: "300px",
                                    }}
                                >
                                    <ul
                                        style={{
                                            margin: 0,
                                            paddingLeft: 31, paddingRight: 31, paddingBottom: 15,
                                            listStyle: "none",
                                        }}
                                    >
                                        <li  onClick={() => handleSubmenuClick(0,hoveredItem._id)} style={{fontSize: 15, fontWeight: 600}}>{hoveredItem.name.toUpperCase()}</li>
                                        {submenuProducts[hoveredItem.name].map((subItem) => (
                                            <li key={subItem._id} style={{ paddingTop: 15, color: "#807676" }} onClick={() => handleSubmenuClick(subItem._id,hoveredItem._id)} >
                                                {subItem.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="col-2 d-flex align-items-center" style={{ gap: "10px", paddingTop: "10px" }}>
                    <img src={pogosnosti} alt="Pogodnosti" className="icons-size" />
                    <p className="mb-0 p-levo">Pogodnosti</p>
                </div>
                <div className="col-2"></div>
                <div className="col-6 d-flex align-items-center" style={{ paddingTop: "20px", gap: "20px" }}>
                    <p className="nav-text">Akcije</p>
                    <p className="nav-text">Prodavnice</p>
                    <p className="nav-text">Poslovanje</p>
                    <p className="nav-text">Gaming</p>
                    <p className="nav-text">Pravna lica</p>
                    <p className="nav-text">Kontakt</p>
                    <p className="nav-text">Karijera</p>
                </div>
            </div>
        </div>
    );
};

export default Navigation;

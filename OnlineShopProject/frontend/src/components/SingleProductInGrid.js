import './SingleProductInGrid.css';
import heart from '../icons/black-heart.png';
import cart from '../icons/black-cart.png';
import { useNavigate } from "react-router-dom";


const SingleProductInGrid = ({ product }) => {

    const navigate = useNavigate();


    //console.log(product.images[0]);
    return (
      <div className="product-card" onClick={() => {navigate(`/products/${product._id}`)}}>
        <div style={{position: "absolute", top:20, right: 20}}>
          <img src = {heart} alt="Heart" className="img-size"></img>
        </div>
        <img className="product-card-img" src={product.images[0].url} alt={product.name} />
        <h6>{product.name}</h6>
        <p>{product.price} RSD</p>
        <div style={{position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", bottom:40, right: 40, borderRadius: 25, background: "orange", width: 50, height: 50}}>
          <img style={{ width: 30, height: 30}} src = {cart} alt="Cart" className="img-size"></img>
        </div>
      </div>
    );
  };


export default SingleProductInGrid;
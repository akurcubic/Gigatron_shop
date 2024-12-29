import './Products.css';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SingleProductInGrid from "./SingleProductInGrid";
import MenuInProducts from './MenuInProducts';
import PriceSlider from './PriceSlider';
import SpecificationMenu from './SpecificationMenu';

const Products = () => {

    const[products, setProducts] = useState();
    const { brandId, categoryId } = useParams();
    const [categoryName, setCategoryName] = useState('');

    const[brandsForCheckBox, setBrandsForCheckBox] = useState([]);
    const[groupedAttributes, setGroupedAttributes] = useState([]);
    const[allSpecifications, setAllSpecifications] = useState();
    const [values, setValues] = useState([0, 500000]);
    const attributesInitialized = useRef(false);

    useEffect(() => {
        const fetchProductsForSelectedBrands = async () => {

            try {
                
                let selectedIds = null;
                console.log("selekovani brendovi pre slanja na backend:",brandsForCheckBox);

                const allUnchecked = brandsForCheckBox.every(brand => !brand.checked);

                let selectedSpec = null;

                const allUncheckedSpec = allSpecifications.every(value => !value.selected);
        
                if (!allUnchecked){


                    const selectedBrandIds = brandsForCheckBox
                        .filter(brand => brand.checked)
                        .map(brand => brand._id);
                    console.log("Odabrani brand ID-jevi:", selectedBrandIds);
                    selectedIds = selectedBrandIds.join(',');
                }
                else{
                    selectedIds = brandsForCheckBox.map(brand => brand._id).join(',');
                }


                if(!allUncheckedSpec){

                    const selectedAtt = allSpecifications.filter(att => att.selected).map(att => att.name);
                    console.log("Odabrani atributi:", selectedAtt);
                    selectedSpec = selectedAtt.join(',');

                }
                else{
                    selectedSpec = "none";
                }

                console.log("Spojeni brand ID-jevi:", selectedIds);
                console.log("KategorijaId", categoryId);

                const response = await axios.get(`http://localhost:4000/api/brands/get_products_for_selected_spec`, {
                    params: {              
                        brandIds: selectedIds,
                        categoryId: categoryId,
                        minPrice: values[0],
                        maxPrice: values[1],
                        spec: selectedSpec
                    }
                });

                setProducts(response.data);
                
                
            } catch (err) {
                console.log('Greška pri dohvatanju proizvoda za selektovane brendove', err);
            }
        };

        fetchProductsForSelectedBrands();
    }, [brandsForCheckBox, values, allSpecifications]);

    useEffect(() => {

        const fetchProducts = async () => {

            //http://localhost:4000/api/brands/category/:brandId/:categoryId/products
            try{

                const brand = Number(brandId);
                let response = null;
                if(brand === 0){
                    response = await axios.get(`http://localhost:4000/api/categories/${categoryId}`);
                    console.log("usao1");
                }
                else{

                    response = await axios.get(`http://localhost:4000/api/brands/category/${brandId}/${categoryId}/products`);
                    console.log("usao2");
                    console.log("Za usao2 proizvodi:", response.data);
                }
                setProducts(response.data);
            } catch (err) {
                console.log('Došlo je do greške pri učitavanju proizvoda');
            }
            
        }

        fetchProducts();
        

        const fetchCategoryName = async () => {

            try{
                
                const response = await axios.get(`http://localhost:4000/api/categories/get_category/${categoryId}`);
                setCategoryName(response.data.name);
            }
            catch (err) {
                console.log('Došlo je do greške pri učitavanju podataka za kategoriju');
            }

        }

        fetchCategoryName();


    },[brandId, categoryId]);
    

    useEffect( () => {

        if (!attributesInitialized.current && products && products.length > 0) {
            const p = products[0];
        
            const attributesForProduct = p.attributes.map(att => att.name);
            console.log("Atributi", attributesForProduct);
        
            const groupedData = attributesForProduct.map(att => {
                const dataForAtt = [];
        
                products.forEach(prod => {
                    if (prod.attributes) { // Provera da proizvod ima atribute
                        prod.attributes.forEach(at => {
                            if (at.name === att && !dataForAtt.includes(at.value)) {
                                dataForAtt.push(at.value);
                            }
                        });
                    }
                });
        
                return {
                    name: att,
                    data: dataForAtt
                };
            });
        
            setGroupedAttributes(groupedData);

            const allSpec = [];

            groupedData.forEach(at => {

                at.data.forEach(value => {
                    allSpec.push(
                        {
                            name : value,
                            selected : false
                        }
                    )
                })
            })

            setAllSpecifications(allSpec);

            attributesInitialized.current = true;
        }


    },[products])

    

    return(
        <div style={{background: "#F2F2F2"}}>
            <div className="my-container">
                <p style={{fontSize: 20, paddingTop: 20, fontWeight: 600 }}>{categoryName}</p>
            </div>
            <div className="my-container">
                <div style={{width: "100%" ,height: "1px", background: "#aaa3a3"}}></div>
            </div>
            <div className="my-container" style={{display: "flex", paddingTop: 20,paddingBottom: 20, gap: 40}}>
                <div style={{display: "flex", flexDirection: "column", gap: 20,flexBasis: "20%"}}>
                    <MenuInProducts categoryId = {categoryId} setProducts = {setProducts} products = {products} brandsForCheckBox={brandsForCheckBox} setBrandsForCheckBox={setBrandsForCheckBox} />
                    <div style={{width: "100%" ,height: "1px", background: "#aaa3a3"}}></div>
                    <PriceSlider products={products} values={values} setValues={setValues} />
                    <SpecificationMenu groupedAttributes = {groupedAttributes} setAllSpecifications = {setAllSpecifications}/>
                    

                </div>
                
                <div className="product-container">
                    {products && products.map((product) => (
                        <SingleProductInGrid key={product.id} product={product} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Products;
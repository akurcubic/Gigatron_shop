import { useEffect, useState, useRef } from "react";
import axios from "axios";
import './MenuInProducts.css';

const MenuInProducts = ({categoryId, setProducts, brandsForCheckBox, setBrandsForCheckBox }) => {

    const[brands, setBrands] = useState([]);
    //const[brandsForCheckBox, setBrandsForCheckBox] = useState([]);
    


    const handleCheckBoxClick = (brand_id) => {

        setBrandsForCheckBox(prevState =>
            prevState.map(brand =>
                brand._id === brand_id
                    ? { ...brand, checked: !brand.checked } 
                    : brand
            )
        );
    };

    /*useEffect(() => {
        const fetchProductsForSelectedBrands = async () => {

            try {
                
                let selectedIds = null;
                console.log("selekovani brendovi pre slanja na backend:",brandsForCheckBox);

                const allUnchecked = brandsForCheckBox.every(brand => !brand.checked);
        

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
                console.log("Spojeni brand ID-jevi:", selectedIds);
                console.log("KategorijaId", categoryId);

                const response = await axios.get(`http://localhost:4000/api/brands/get_products_for_selected_brands`, {
                    params: {              
                        brandIds: selectedIds,
                        categoryId: categoryId
                    }
                });

                setProducts(response.data);
                
                
            } catch (err) {
                console.log('Greška pri dohvatanju proizvoda za selektovane brendove', err);
            }
        };

        fetchProductsForSelectedBrands();
    }, [brandsForCheckBox]);*/
    
    useEffect( () => {

        const fetchBrandsForCategory = async () => {

            const response = await axios.get(`http://localhost:4000/api/categories/brands/${categoryId}`);
            setBrands(response.data);
            setBrandsForCheckBox(response.data.map(brand => ({
                _id: brand._id,
                checked: false
            })));
        
        }

        fetchBrandsForCategory();

        console.log(`Jedinstveni brendovi za kategoriju: ${brands}`);


    }, [categoryId]);

    /*useEffect( () => {

        setBrandsForCheckBox(brands.map(brand => (
            {
                _id: brand._id,
                checked : false
            }
        )))

    }, [brands]);*/

    return(
        
        <div>
            <h5 style={{marginBottom: 20}}>Proizvodjac</h5>
            {brands.map((brand) => (
            <div key={brand._id} className="checkbox-container">
                <input type="checkbox" id={brand._id} onChange={() => handleCheckBoxClick(brand._id)} />
                <label htmlFor={brand.id}>{brand.name}</label>
            </div>
        ))}

        </div>
    );
}

export default MenuInProducts;
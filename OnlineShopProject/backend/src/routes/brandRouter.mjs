import express from 'express';
import Brand from '../schemas/brand.mjs';
import Product from '../schemas/product.mjs';
import mongoose from 'mongoose';


const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ message: 'Greška prilikom dohvatanja brendova.', error });
    }
});


router.post('/', async (req, res) => {
    const { name } = req.body;

    try {
        const newBrand = new Brand({
            name,
        });

        const savedBrand = await newBrand.save();
        res.status(201).json(savedBrand);
    } catch (error) {
        res.status(500).json({ message: 'Greška prilikom dodavanja brenda.', error });
    }
});


router.get('/get_products_for_selected_spec', async (req, res) => {
    try {
        const { brandIds, categoryId, minPrice, maxPrice, spec } = req.query;

        
        const brandIdArray = brandIds
            ? brandIds.split(',').map(id => id.trim()).filter(id => mongoose.Types.ObjectId.isValid(id))
            : [];
        const specArr = spec ? spec.split(',') : [];

        console.log("Spec arr je: ", specArr);
        console.log("Selektovani brendovi:", brandIdArray );

        
        const query = {
            brandId: { $in: brandIdArray },
            categoryId: categoryId,
        };

        
        const products = await Product.find(query);

        
        if (specArr.length === 1 && specArr[0] === "none") {
            
            const filteredProducts = products.filter(product =>
                product.price * 1000 >= minPrice && product.price * 1000 <= maxPrice
            );

            return res.status(200).json(filteredProducts);
        }

        
        const filteredProducts = products.filter(product => {
            const isPriceInRange = product.price * 1000 >= minPrice && product.price * 1000 <= maxPrice;

            
            const matchesAllSpecs = specArr.every(specValue =>
                product.attributes.some(attr => attr.value === specValue)
            );

            return isPriceInRange && matchesAllSpecs;
        });

        res.status(200).json(filteredProducts);
    } catch (error) {
        console.error('Greška prilikom pretrage proizvoda:', error);
        res.status(500).json({ message: 'Došlo je do greške prilikom učitavanja proizvoda.', error });
    }
});



router.get('/category/:brandId/:categoryId/products', async (req, res) => {

    const { brandId, categoryId } = req.params;
    console.log(brandId);
    console.log(categoryId);

    try{
        
        const productsForBrandAndCat = await Product.find({brandId, categoryId});
        res.status(200).json(productsForBrandAndCat);

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Greška prilikom dobijanja proizvoda za brend i kategoriju.' });
    }
});



/*
{
  "name": "Lenovo",
}
*/

export default router;

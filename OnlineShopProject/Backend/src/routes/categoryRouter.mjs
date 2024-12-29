import express from 'express';
import Category from '../schemas/category.mjs';
import Product from '../schemas/product.mjs';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const categories = await Category.find(); 
        console.log("Sesija i njen id iz rute za kategorije");
        console.log(req.session);
        console.log(req.sessionID);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Greška prilikom dohvatanja kategorija.', error });
    }
});

router.get('/:categoryId', async(req, res) => {

    const { categoryId } = req.params;

    try{
        const products = await Product.find({categoryId});
        res.status(200).json(products);


    }catch(error){

        res.status(500).json({ message: 'Greška prilikom dodavanja proizvoda za kategorije.', error });
    }

});

router.get('/get_category/:categoryId', async(req, res) => {

    const { categoryId } = req.params;

    try{
        const products = await Category.findById(categoryId);
        res.status(200).json(products);


    }catch(error){

        res.status(500).json({ message: 'Greška prilikom dodavanja kategorije.', error });
    }

});


router.post('/', async (req, res) => {
    const { name } = req.body;

    try {
        const newCategory = new Category({
            name,
        });

        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Greška prilikom dodavanja kategorije.', error });
    }
});

router.get('/brands/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Pronađi sve proizvode koji pripadaju datoj kategoriji
        const products = await Product.find({ categoryId: categoryId }).populate('brandId');

        const uniqueBrands = [];

        products.forEach((product) => {
            // Proveri da li već postoji brend sa istim imenom
            const exists = uniqueBrands.some((brand) => brand.name === product.brandId.name);

            if (!exists) {
                uniqueBrands.push(product.brandId);
            }
        });

        res.status(200).json(uniqueBrands);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Greška prilikom dobijanja brendova za kategoriju.' });
    }
});



/*
{
  "name": "Laptops",
}
*/

export default router;

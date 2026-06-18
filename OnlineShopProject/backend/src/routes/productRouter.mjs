import express, { response } from 'express';
import Product from '../schemas/product.mjs';
import Order from '../schemas/order.mjs';

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Greška prilikom dohvatanja proizvoda.', error });
    }
});

router.get('/single_product/:id', async (req, res) => {

    try{
        const productId = req.params.id;
        const prod = await Product.findOne({_id : productId}).populate('brandId') ;
        if (!prod) {
            return res.status(404).json({ message: 'Proizvod nije pronađen.' });
        }
        res.status(200).json(prod);

    }catch(error){

        res.status(500).json({ message: 'Greška prilikom dohvatanja proizvoda.', error });
    }
});

router.post('/add_in_cart/:id/:counter', async (req, res) => {
    try {
        const productId = req.params.id;
        const counter = req.params.counter;
        console.log(counter);

        req.session.cart = req.session.cart || [];

        const productExists = await Product.exists({ _id: productId });
        if (!productExists) {
            return res.status(404).json({ message: 'Proizvod sa datim ID-om nije pronađen.' });
        }

        // (Opcionalno) Proveri da li je proizvod već u korpi
        if (!req.session.cart.includes(productId)) {
            req.session.cart.push(
              {
                id: productId,
                counter: counter
              }
            );
        }

        console.log("Sesija nakon dodavanja u korpu");
        console.log(req.session);
        console.log(req.session.id);

        res.status(201).json({ message: "Proizvod je uspešno dodat u korpu." });

    } catch (error) {
        console.error("Greška prilikom dodavanja proizvoda u korpu:", error);
        res.status(500).json({ message: 'Greška prilikom dodavanja proizvoda u korpu.', error });
    }
});

router.delete('/delete_in_cart/:productId/', async (req, res) => {
  try {
      const productId = req.params.productId;
      console.log("Id prroizvoda koji se brise: ",productId);
      console.log("Korpa za brisanje: ", req.session.cart);

      req.session.cart = req.session.cart.filter(item => item.id !== productId);

      console.log("Sesija nakon brisanja u korpu");
      console.log(req.session);
      console.log(req.session.id);

      res.status(201).json({ message: "Proizvod je uspešno izbrisan iz korpu." });

  } catch (error) {
      console.error("Greška prilikom brisanja proizvoda u korpu:", error);
      res.status(500).json({ message: 'Greška prilikom brisanja proizvoda u korpu.', error });
  }
});


router.get('/get_products_from_cart', async (req, res) => {
  try {
      const cart = req.session.cart || [];

      console.log("Korpa u sesiji",req.session.id);

      if (cart.length === 0) {
          return res.status(200).json([]); 
      }

      const products = await Promise.all(
          cart.map(async (product) => {
              const prod = await Product.findById(product.id);
              return {
                  product: prod,
                  counter: product.counter 
              };
          })
      );

      res.status(200).json(products);
  } catch (err) {
      console.error("Greška pri preuzimanju proizvoda iz korpe", err);
      res.status(500).json({ message: "Greška pri preuzimanju proizvoda iz korpe", error: err });
  }
});


router.post('/make_order', async (req, res) => {

    const { products, price, deliveryMethod, deliveryAddress, paymentMethod} = req.body;
    
    console.log("Pre brisanja korpa:",req.session.cart );

    req.session.cart = [];

    console.log("Posle brisanja korpa:",req.session.cart );

    try{

        const newOrder = new Order({
            products,
            price,
            deliveryMethod,
            deliveryAddress,
            paymentMethod
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    }
    catch(error){

        res.status(500).json({ message: 'Greška prilikom kreiranja porudzbine.', error });

    }
});

/*
{
  "products": [
    {
      "productId": "64a1f6e4b3c1f4a2b78d2c9f", 
      "quantity": 2
    },
    {
      "productId": "64a1f6e4b3c1f4a2b78d2ca0",
      "quantity": 1
    }
  ],
  "price": 4500,
  "deliveryMethod": "home",
  "deliveryAddress": [
    {
      "name": "fullName",
      "value": "Petar Petrović"
    },
    {
      "name": "street",
      "value": "Ulica Svetog Save 10"
    },
    {
      "name": "city",
      "value": "Beograd"
    },
    {
      "name": "zipCode",
      "value": "11000"
    },
    {
      "name": "country",
      "value": "Srbija"
    }
  ],
  "paymentMethod": "card",
  "createdAt": "2024-12-03T12:00:00Z",
  "updatedAt": "2024-12-03T12:00:00Z"
}
*/

router.delete('/delete_in_cart/:id', (req, res) => {

    const productId = req.params.id;
    req.session.cart = req.session.cart.filter(id => id !== productId);
    console.log("Sesija posle brisanja");
    console.log(req.session);
    res.status(200).json({ message: 'Proizvod je uspešno uklonjen iz korpe.', cart: req.session.cart });

});



router.post('/', async (req, res) => {
    const { name, description, price, brandId, categoryId, attributes, images } = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            brandId,
            categoryId,
            attributes,
            images
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Greška prilikom dodavanja proizvoda.', error });
    }
});
/*
{
    "name": "Lenovo IdeaPad 5",
    "description": "Snažan laptop sa AMD Ryzen 5 procesorom.",
    "price": 599.99,
    "brandId": "64d12f5674e8b94b2c34b9b1",
    "categoryId": "64d12f5674e8b94b2c34b9c2",
    "attributes": [
      { "name": "color", "value": "Silver" },
      { "name": "processor", "value": "AMD Ryzen 5" }
    ],
    "images": [
      { "url": "https://example.com/laptop1.jpg", "isPrimary": true }
    ]
  }
*/

export default router;



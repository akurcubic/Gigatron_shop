import express from 'express';
import User from '../schemas/user.mjs';
import Store from '../schemas/store.mjs';
import {hashPaswword} from '../helpers/helpers.mjs';
import {body, validationResult} from 'express-validator';
import '../strategies/local-strategy.mjs';
import passport from 'passport';

const router = express.Router();

router.get('/', async (req, res) => {

    try{
        
        const allUser = await User.find();
        console.log("Ipis zahteva da bi videli da li se u zahtevu sada nalazi user");
        console.log(req.user);
        console.log("Ispisivanje sesije i njenog id");
        console.log(req.session);
        console.log(req.sessionID);
        console.log("Ispisivanje sessionStora");
        console.log(req.sessionStore.sessions);

        res.status(200).json(allUser);

    }catch(error){
        res.status(500).json({ message: 'Greška prilikom dohvatanja korisnika.', error });
    }

});

router.post('/login', (req, res, next) => {
    const previousCart = req.session.cart || []; // Sačuvaj trenutnu korpu iz sesije

    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Greška prilikom prijave.', error: err });
        }
        if (!user) {
            // Ovo će se desiti ako korisnik ne postoji ili je šifra pogrešna
            return res.status(401).json({ message: info.message });
        }

        // Regeneracija sesije nakon logovanja
        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).json({ message: 'Greška prilikom regeneracije sesije.', error: err });
            }

            // Sačuvaj korisnika i vrati staru korpu u novu sesiju
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Greška prilikom prijave korisnika.', error: err });
                }

                req.session.cart = previousCart;

                console.log("Nova sesija nakon logovanja:");
                console.log(req.session);
                console.log("SesijaId:");
                console.log(req.session.id);

                res.status(200).json({ message: 'Uspešno prijavljen.', user });
            });
        });
    })(req, res, next); // Važno: pozivanje Passport middleware-a
});



router.post('/register',
    body('email').notEmpty().withMessage('E-mail je obavezan.').isEmail().withMessage('E-mail nije validan.'),
    body('password').notEmpty().withMessage('Lozinka je obavezna.').isLength({ min: 5 }).withMessage('Lozinka mora imati najmanje 5 karaktera.'),
    async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { email,password } = req.body;

    let newUser = await User.findOne({ email });

    if(newUser){

        return res.status(500).json({ message: 'Korisnik sa ovom e-mail adresom vec postoji.'});
    }

    const hashedPassword = hashPaswword(password);

    try{

        newUser = new User({

            email,
            password : hashedPassword,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    }catch(error){

        res.status(500).json({ message: 'Greška prilikom kreiranja korisnika.', error });

    }
});

///prodavnica treba da ima svoj ruter ali posto je samo dve metode stavljam je ovde
router.post('/add_store', async (req, res) => {
    const { name } = req.body;

    try {
        const newStore = new Store({
            name,
        });

        const savedStore = await newStore.save();
        res.status(201).json(savedStore);
    } catch (error) {
        res.status(500).json({ message: 'Greška prilikom dodavanja prodavnice.', error });
    }
});

router.get('/get_all_shops', async (req, res) => {

    try{
        
        const allShops = await Store.find();
        res.status(200).json(allShops);

    }catch(error){
        res.status(500).json({ message: 'Greška prilikom dohvatanja prodavnica.', error });
    }

});


export default router;
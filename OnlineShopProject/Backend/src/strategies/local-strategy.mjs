import passport  from "passport";
import { Strategy } from "passport-local";
import User from '../schemas/user.mjs';
import {hashPaswword, comparePassword} from '../helpers/helpers.mjs';

passport.serializeUser((user, done) => {

    console.log("Serijalizujem u sesiju id korisnika");
    done(null, user.id);

});

passport.deserializeUser( async (id, done) => {

    console.log("Deserijalizujem u zahtev korisnika");

    try{

        const findUser = await User.findById(id);
        if(!findUser){
            throw new Error("User not found");
        }
        done(null, findUser);

    }catch(error){

        done(err, null)
    }
});

/*export default passport.use(
      new Strategy({usernameField: "email"}, async (email, password, done) => {

    
        try{

            console.log("mudja");
            const findUser = await User.findOne( {email} );
            if(!findUser){
                throw new Error("User not found");
            }
            if(!comparePassword(password, findUser.password)){
                throw new Error("Bad password");
            }
            done(null, findUser);

        }catch(error){

            done(error, null)
        }

    })
)*/

export default passport.use(
    new Strategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            console.log("mudja");

            const findUser = await User.findOne({ email });
            if (!findUser) {
                // Signaliziraj grešku sa done(null, false, info)
                return done(null, false, { message: "User not found" });
            }
            if (!comparePassword(password, findUser.password)) {
                return done(null, false, { message: "Bad password" });
            }
            return done(null, findUser); // Uspešna autentifikacija
        } catch (error) {
            return done(error); // Signaliziraj grešku
        }
    })
);


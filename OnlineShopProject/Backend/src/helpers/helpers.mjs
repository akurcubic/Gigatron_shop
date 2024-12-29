import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPaswword = (password) => {

    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

export const comparePassword = (plain, hashed) => {

    return bcrypt.compareSync(plain, hashed);
}
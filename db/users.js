const client = require("./client")
const bcrypt = require('bcrypt')

// CREATING THE USER
const createUser = async ({ username, password, email }) => {

    const SALT_COUNT = 10;
    const hashedPassword = bcrypt.hashSync(password, SALT_COUNT);

    try {
        const { rows: [user] } = await client.query(`
            INSERT INTO users(username, password, email)
            VALUES($1, $2, $3)
            ON CONFLICT (username) DO NOTHING
            RETURNING id, username, email;
        `, [username, hashedPassword, email]);

        return user
    } catch (error) {
        throw error
    }
}

// GETTING THE USER WITH EMAIL AND PASSWORD
const getUser = async ({email, password}) => {
    try {
        const user = await getUserByEmail(email);
        console.log(user)
        const hashedPassword = user.password;
        const passwordsMatch = bcrypt.compareSync(password, hashedPassword);
        if (passwordsMatch) {
        // return the user object (without the password)
            delete user.password
            return user
        } else {
            console.log("Passwords do not match");
        }
    } catch (error) {
        throw error
    }
}

// GETTING THE USER BY ID
// do NOT return the password
const getUserById = async (id) => {
    try {
        const { rows: [user] } = await client.query(`
            SELECT id, username, email
            FROM users
            WHERE id=$1;
        `, [id])

        if (!user) {
            return null
        }

        return user

    } catch (error) {
        throw error
    }
}

// select a user using the user's username. Return the user object.
const getUserByEmail = async (email) => {
    try {
        const { rows: [user] } = await client.query(`
            SELECT *
            FROM users
            WHERE email=$1;
        `, [email])

        if (!user) {
            return null
        }

        return user

    } catch (error) {
        throw error
    }
}

module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByEmail
}
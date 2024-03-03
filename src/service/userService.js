import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';


const salt = bcrypt.genSaltSync(10);


const hashUserPassword = (userPassword)=> {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password);
    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',[email, hashPass, username],
        function (err, results, fields) {
            if(err){
                console.log(err)
            }        
        }
    );
}

const getUserList = async ()=> {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
      });
    let users = [];
    try{
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    }catch(error) {
        console.log(">>>check error", error)
    }

    // return connection.query(
    //     'SELECT * FROM users',
    //     function (err, results, fields) {
    //         if(err){
    //             console.log(err);
    //             return users;
    //         }
    //         users = results;
    //         return users;
    //     }
    // );
}


module.exports = {
    createNewUser, getUserList
}
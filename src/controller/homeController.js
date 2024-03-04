// Get the client
import { render } from 'ejs';
import userService from '../service/userService';

const handleHelloword = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    let userList = await userService.getUserList();
    //điều hướng đến service để xử lí việc lấy danh sách từ dtb

    return res.render("user.ejs", {userList});
    //Trả về giao diện cho người dùng
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createNewUser(email, password, username);

    return res.redirect('/user');
}

const handleDeleteUser = async (req, res) => {
    // console.log(">>>check id", req.params.id) check xem có lấy đc id ko
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
}

const getUpdateUserPage = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id)
    let userData = {};
    if (user && user.length>0){
        userData = user[0];
    }
    return res.render("update-user.ejs",{ userData })
}

const handleUpdateUser = async (req, res) => {
    let email = req.body.email; //name cua input
    let username = req.body.username;
    let id =req.body.id;
    await userService.updateUserInfo(email, username, id);
    return res.redirect("/user");
}

module.exports = {
    handleHelloword, handleUserPage, handleCreateNewUser, handleDeleteUser, getUpdateUserPage, handleUpdateUser
} //Lenh xuat file ra man hinh
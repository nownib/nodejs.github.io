// Get the client
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

module.exports = {
    handleHelloword, handleUserPage, handleCreateNewUser, handleDeleteUser
} //Lenh xuat file ra man hinh
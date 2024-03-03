// Get the client
import userService from '../service/userService';

const handleHelloword = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = (req, res) => {
    let userList = userService.getUserList();
    //điều hướng đến service để xử lí việc lấy danh sách từ dtb
    
    // console.log(">>>check user list: ", userList)
    return res.render("user.ejs");
    //Trả về giao diện cho người dùng
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;


    // userService.createNewUser(email, password, username)

      
    return res.send("handleCreateNewUser");
}


module.exports = {
    handleHelloword, handleUserPage, handleCreateNewUser
} //Lenh xuat file ra man hinh
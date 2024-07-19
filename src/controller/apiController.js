import loginRegisterService from "../service/loginRegisterService";

// const testApi = (req, res) => {
//   return res.status(200).json({
//     message: "ok",
//     data: "test api",
//   });
// };

const handleRegister = async (req, res) => {
  try {
    //email,phone,username,password,
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: "Missing required parameters", //message
        EC: "1", //code
        DT: "", //data
      });
    }

    if (req.body.password && req.body.password.length < 4) {
      return res.status(200).json({
        EM: "Your password must have more than 3 letters",
        EC: "1", //code
        DT: "", //data
      });
    }

    let data = await loginRegisterService.registerNewUser(req.body); //tới đâyyyyy
    return res.status(200).json({
      EM: data.EM, //message
      EC: data.EC, //code
      DT: "", //data
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server", //message
      EC: "-1", //code
      DT: "", //data
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await loginRegisterService.handleUserLogin(req.body);
    if (data && data.DT && data.DT.access_token) {
      //set cookie
      res.cookie("jwt", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }
    return res.status(200).json({
      EM: data.EM, //message
      EC: data.EC, //code
      DT: data.DT, //data
    });
  } catch (error) {
    console.log("Check err", error);
    return res.status(500).json({
      EM: "error from server", //message
      EC: "-2", //code
      DT: "", //data
    });
  }
};

const handleLogout = async (req, res) => {
  try {
    await res.clearCookie("jwt");
    return res.status(200).json({
      EM: "Clear cookie done", //message
      EC: 0, //code
      DT: "", //data
    });
  } catch (error) {
    console.log("Check err", error);
    return res.status(500).json({
      EM: "error from server", //message
      EC: "-2", //code
      DT: "", //data
    });
  }
};
module.exports = { handleRegister, handleLogin, handleLogout };

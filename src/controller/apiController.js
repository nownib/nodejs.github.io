import loginRegisterService from "../service/loginRegisterService";

const testApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test api",
  });
};

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

    return res.status(200).json({
        EM: data.EM, //message
        EC: data.EC, //code
        DT: data.DT, //data
    });
  } catch (error) {}

  return res.status(500).json({
    EM: "error from server", //message
    EC: "-1", //code
    DT: "", //data
  });
};
module.exports = { testApi, handleRegister, handleLogin };

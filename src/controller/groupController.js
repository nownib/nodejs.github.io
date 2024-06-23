import groupService from "../service/groupService";

const readFunc = async (req, res) => {
  try {
    let data = await groupService.getGroups()
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch {
    return {
      EM: "Error from server",
      EC: 1,
      DT: [],
    };
  }
};
module.exports = { readFunc };

import db from "../models/index";

const getGroupWithRoles = async (user) => {
  //scope
  try {
    let roles = await db.Role.findAll({
      attributes: ["id", "url", "description"],
      include: {
        model: db.Group,
        attributes: ["id", "name", "description"],
        through: { attributes: [] },
        where: { id: user.groupId },
      },
      raw: true, // Trả về kết quả là mảng các đối tượng không được liên kết
    });

    return roles ? roles : {};
  } catch (error) {
    console.error("Error retrieving Group with Roles:", error);
    return {};
  }
};

module.exports = {
  getGroupWithRoles,
};

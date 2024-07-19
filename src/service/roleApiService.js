import { where } from "sequelize/dist/index.js";
import db from "../models/index";
import { raw } from "body-parser";

const createNewRole = async (roles) => {
  try {
    let currentRoles = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });
    console.log(currentRoles);
    const persists = roles.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
    );

    if (persists.length === 0) {
      return {
        EM: "Nothing to create",
        EC: "0",
        DT: "",
      };
    }

    await db.Role.bulkCreate(persists);
    return {
      EM: `Create roles succeeds ${persists.length} roles`,
      EC: "0",
      DT: "",
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "some thing wrongs with services",
      EC: 1,
      DT: [],
    };
  }
};

const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll();

    return {
      EM: `Get all roles succeeds`,
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "some thing wrongs with services",
      EC: 1,
      DT: [],
    };
  }
};

const deleteRole = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: { id: id },
      raw: false,
      nest: false,
    });

    if (role) {
      await role.destroy();
      return {
        EM: "Delete role succeeds",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "Delete role not succeed",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Some thing wrongs with services",
      EC: 1,
      DT: [],
    };
  }
};

const getRoleByGroup = async (id) => {
  try {
    console.log(id);
    if (!id) {
      return {
        EM: `Not found any role`,
        EC: 0,
        DT: [],
      };
    }

    let roles = await db.Role.findAll({
      attributes: ["id", "url", "description"],
      include: {
        model: db.Group,
        attributes: ["id", "name", "description"],
        through: { attributes: [] },
        where: { id: id },
      },
      raw: true, // Trả về kết quả là mảng các đối tượng không được liên kết
    });
    console.log(roles);
    return {
      EM: `Get roles by group succeeds`,
      EC: 0,
      DT: roles,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "some thing wrongs with services",
      EC: 1,
      DT: [],
    };
  }
};

const assignRoleToGroup = async (data) => {
  try {
    //data cần là 1 id group + các role muốn thêm hoặc muốn xóa
    await db.Group_Role.destroy({
      where: { groupId: data.groupId },
      raw: false,
      nest: false,
    });
    await db.Group_Role.bulkCreate(data.groupRoles);
    return {
      EM: `Assign to group success`,
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Some thing wrongs with services",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  createNewRole,
  getAllRoles,
  deleteRole,
  getRoleByGroup,
  assignRoleToGroup,
};

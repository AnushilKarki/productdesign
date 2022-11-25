"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.findUserById = exports.findUserByEmail = exports.loginService = exports.updateUser = exports.deleteUser = exports.getUser = exports.createUser = exports.findProspectUserByEmail = exports.createProspectUser = void 0;
const bcrypt = require("bcryptjs");
const createProspectUser = async (prisma, input) => {
    const u = await prisma.prospectUsers.findUnique({
        where: {
            email: input === null || input === void 0 ? void 0 : input.email,
        },
    });
    if (u)
        return u;
    const user = await prisma.prospectUsers.create({
        data: {
            email: input === null || input === void 0 ? void 0 : input.email,
        },
    });
    return user;
};
exports.createProspectUser = createProspectUser;
const findProspectUserByEmail = async (prisma, input) => {
    const user = await prisma.prospectUsers.findUnique({
        where: {
            email: input,
        },
    });
    return user;
};
exports.findProspectUserByEmail = findProspectUserByEmail;
const createUser = async (prisma, input) => {
    const { password, ...rest } = input;
    const hashed = await bcrypt.hash(password, 10);
    const user = prisma.users.create({
        data: {
            ...rest,
            password: hashed,
        },
    });
    return user;
};
exports.createUser = createUser;
const getUser = async (prisma, id) => {
    const user = await prisma.users.findUnique({
        where: {
            id,
        },
    });
    return user;
};
exports.getUser = getUser;
const deleteUser = async (prisma, id) => {
    const user = await prisma.users.delete({
        where: {
            id,
        },
    });
    return user;
};
exports.deleteUser = deleteUser;
const updateUser = async (prisma, id, data) => {
    const user = await prisma.users.update({
        where: {
            id,
        },
        data: data,
    });
    return user;
};
exports.updateUser = updateUser;
const loginService = async (prisma, input) => {
    const user = await prisma.users.findUnique({
        where: {
            email: input,
        },
    });
    return user;
};
exports.loginService = loginService;
const findUserByEmail = async (prisma, input) => {
    const user = await prisma.users.findUnique({
        where: {
            email: input,
        },
    });
    return user;
};
exports.findUserByEmail = findUserByEmail;
const findUserById = async (prisma, id) => {
    const user = await prisma.users.findUnique({
        where: {
            id,
        },
    });
    return user;
};
exports.findUserById = findUserById;
const updatePassword = async (prisma, id, password) => {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.users.update({
        where: {
            id,
        },
        data: {
            password: hashed,
        },
    });
    return user;
};
exports.updatePassword = updatePassword;
//# sourceMappingURL=auth.service.js.map
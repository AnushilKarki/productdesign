"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.verifyAdmin = exports.verifySuperAdmin = void 0;
const verifySuperAdmin = async (request) => {
    var _a, _b;
    const token = ((_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
    const decoded = request.jwt.decode(token);
    console.log("in catch", decoded === null || decoded === void 0 ? void 0 : decoded.roles);
    try {
        if (!((_b = decoded === null || decoded === void 0 ? void 0 : decoded.roles) === null || _b === void 0 ? void 0 : _b.includes("super_admin"))) {
            throw new Error("Resources not allowed");
        }
    }
    catch (error) {
        throw new Error("Resources not allowed");
    }
};
exports.verifySuperAdmin = verifySuperAdmin;
const verifyAdmin = async () => {
    try {
        const roles = false;
        if (!roles) {
            throw new Error("Resources not allowed");
        }
        return;
    }
    catch (error) {
        throw new Error("Resources not allowed");
    }
};
exports.verifyAdmin = verifyAdmin;
const verifyUser = async () => {
    try {
        const roles = false;
        if (!roles) {
            throw new Error("Resources not allowed");
        }
        return;
    }
    catch (error) {
        throw new Error("Resources not allowed");
    }
};
exports.verifyUser = verifyUser;
//# sourceMappingURL=authorize.js.map
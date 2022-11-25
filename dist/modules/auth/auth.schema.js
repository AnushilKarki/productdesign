"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpResponse = exports.SignupInput = exports.LoginInputResponse = exports.LoginInput = exports.ProspectInputResponse = exports.ProspectInput = void 0;
const typebox_1 = require("@sinclair/typebox");
const coreData = {
    email: typebox_1.Type.String({
        format: 'email',
    }),
    name: typebox_1.Type.String({
        minLength: 2,
    }),
    roles: typebox_1.Type.String({
        minLength: 2,
    }),
    phone: typebox_1.Type.String(),
};
exports.ProspectInput = typebox_1.Type.Object({
    email: typebox_1.Type.String({
        format: 'email',
    }),
});
exports.ProspectInputResponse = typebox_1.Type.Object({
    success: typebox_1.Type.String(),
    message: typebox_1.Type.String(),
});
exports.LoginInput = typebox_1.Type.Object({
    email: typebox_1.Type.String({
        minLength: 2,
    }),
    password: typebox_1.Type.String({
        minLength: 4,
    }),
});
exports.LoginInputResponse = typebox_1.Type.Object({
    success: typebox_1.Type.Boolean(),
    results: typebox_1.Type.Object({
        ...coreData,
        userId: typebox_1.Type.Optional(typebox_1.Type.Any()),
    }),
});
exports.SignupInput = typebox_1.Type.Object({
    ...coreData,
    password: typebox_1.Type.String({
        minLength: 4,
    }),
    userId: typebox_1.Type.Optional(typebox_1.Type.Any()),
});
exports.SignUpResponse = Object({
    success: typebox_1.Type.Boolean(),
    results: typebox_1.Type.Object({
        ...coreData,
    }),
});
//# sourceMappingURL=auth.schema.js.map
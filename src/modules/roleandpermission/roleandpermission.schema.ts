// import { Static, Type } from '@sinclair/typebox';

// const coreData = {
//     role: Type.String({
//         minLength: 4,
//     }),
//     updated_by: Type.String({}),
//     is_deleted: Type.Boolean(),
//     created_by: Type.String(),
// };
// const userRole = {
//     assigned_at: Type.String(),
//     assigned_by: Type.String(),
//     usersId: Type.Integer(),
//     rolesId: Type.Integer(),
// };
// const moduleRole = {
//     assigned_at: Type.String(),
//     assigned_by: Type.String(),
//     rolesId: Type.Integer(),
//     modulesId: Type.Integer(),
// };
// const modulePermission = {
//     assigned_at: Type.String(),
//     assigned_by: Type.String(),
//     permissionsId: Type.Integer(),
//     modulesId: Type.Integer(),
// };
// const rolePermission = {
//     assigned_at: Type.String(),
//     assigned_by: Type.String(),
//     permissionsId: Type.Integer(),
//     rolesId: Type.Integer(),
// };
// export const RoleInput = Type.Object({
//     ...coreData,
// });
// export const RoleResponse = Object({
//     success: Type.Boolean(),
//     results: Type.Object({
//         ...coreData,
//     }),
// });
// export const ModuleInput = Type.Object({
//     ...coreData,
// });
// export const ModuleResponse = Object({
//     success: Type.Boolean(),
//     results: Type.Object({
//         ...coreData,
//     }),
// });
// export const PermissionInput = Type.Object({
//     ...coreData,
// });
// export const PermissionResponse = Object({
//     success: Type.Boolean(),
//     results: Type.Object({
//         ...coreData,
//     }),
// });
// export const UserRoleInput = Type.Object({
//     ...userRole,
// });
// export const UserRoleResponse = Object({
//     success: Type.Boolean(),
//     results: Type.Object({
//         ...userRole,
//     }),
// });
// export const ModuleRoleInput = Type.Object({
//     ...moduleRole,
// });
// export const ModuleRoleResponse = Object({
//     success: Type.Boolean(),
//     results: Type.Object({
//         ...moduleRole,
//     }),
// });
// export const ModulePermissionInput = Type.Object({
//     ...modulePermission,
// });
// export const ModulePermissionResponse = Object({
//     success: Type.Boolean(),
//     results: Type.Object({
//         ...modulePermission,
//     }),
// });
// export const RolePermissionInput = Type.Object({
//     ...rolePermission,
// });
// export const RolePermissionResponse = Object({
//     success: Type.Boolean(),
//     results: Type.Object({
//         ...rolePermission,
//     }),
// });
// export type RoleInputType = Static<typeof RoleInput>;
// export type RoleInputResponseType = Static<typeof RoleResponse>;
// export type ModuleInputType = Static<typeof ModuleInput>;
// export type ModuleInputResponseType = Static<typeof ModuleResponse>;
// export type PermissionInputType = Static<typeof PermissionInput>;
// export type PermissionInputResponseType = Static<typeof PermissionResponse>;
// export type UserRoleInputType = Static<typeof UserRoleInput>;
// export type UserRoleInputResponseType = Static<typeof UserRoleResponse>;
// export type ModuleRoleInputType = Static<typeof ModuleRoleInput>;
// export type ModuleRoleInputResponseType = Static<typeof ModuleRoleResponse>;
// export type ModulePermissionInputType = Static<typeof ModulePermissionInput>;
// export type ModulePermissionInputResponseType = Static<
//     typeof ModulePermissionResponse
// >;
// export type RolePermissionInputType = Static<typeof RolePermissionInput>;
// export type RolePermissionInputResponseType = Static<
//     typeof RolePermissionResponse
// >;

// import {
//     RoleInputType,
//     ModuleInputType,
//     PermissionInputType,
//     ModuleRoleInputType,
//     // ModulePermissionInputType,
//     // RolePermissionInputType,
//     // UserRoleInputType,
// } from '../roleandpermission/roleandpermission.schema';
// import { PrismaClient } from '@prisma/client';
// // import Module = require('module');

// //role

// export const createRole = async (
//     prisma: PrismaClient,
//     input: RoleInputType,
//     data: any,
// ) => {
//     const role = prisma.roles.create({
//         data: {
//             ...data,
//             // ...input,
//         },
//     });

//     return role;
// };

// export const getRole = async (prisma: PrismaClient, id: number) => {
//     const role = await prisma.roles.findUnique({
//         where: {
//             id,
//         },
//     });

//     return role;
// };

// export const deleteRole = async (prisma: PrismaClient, id: number) => {
//     const role = await prisma.roles.delete({
//         where: {
//             id,
//         },
//     });

//     return role;
// };

// export const updateRole = async (
//     prisma: PrismaClient,
//     id: number,
//     // data: any,
//     input: RoleInputType,
// ) => {
//     const role = await prisma.roles.update({
//         where: {
//             id,
//         },
//         // data: data,
//         data: input,
//     });

//     return role;
// };

// //modules

// export const createModule = async (
//     prisma: PrismaClient,
//      data: any,
//     input: ModuleInputType,
// ) => {
//     const module = prisma.modules.create({
//         data: {
//             ...data,
//             // ...input,
//         },
//     });

//     return module;
// };

// export const getModule = async (prisma: PrismaClient, id: number) => {
//     const module = await prisma.modules.findUnique({
//         where: {
//             id,
//         },
//     });

//     return module;
// };

// export const deleteModule = async (prisma: PrismaClient, id: number) => {
//     const module = await prisma.modules.delete({
//         where: {
//             id,
//         },
//     });

//     return module;
// };

// export const updateModule = async (
//     prisma: PrismaClient,
//     id: number,
//     // data: any,
//     input: ModuleInputType,
// ) => {
//     const module = await prisma.modules.update({
//         where: {
//             id,
//         },
//         // data: data,
//         data: input,
//     });

//     return module;
// };

// //permission

// export const createPermission = async (
//     prisma: PrismaClient,
//      data: any
//     // input: PermissionInputType,
// ) => {
//     const permission = prisma.permissions.create({
//         data: {
//             ...data,
//             // ...input,
//         },
//     });

//     return permission;
// };

// export const getPermission = async (prisma: PrismaClient, id: number) => {
//     const permission = await prisma.permissions.findUnique({
//         where: {
//             id,
//         },
//     });

//     return permission;
// };

// export const deletePermission = async (prisma: PrismaClient, id: number) => {
//     const permission = await prisma.permissions.delete({
//         where: {
//             id,
//         },
//     });

//     return permission;
// };

// export const updatePermission = async (
//     prisma: PrismaClient,
//     id: number,
//     data: any,
//     input: PermissionInputType,
// ) => {
//     const permission = await prisma.permissions.update({
//         where: {
//             id,
//         },
//         data: data,
//         // data: input,
//     });

//     return permission;
// };

// //modules role

// export const createModuleRole = async (
//     prisma: PrismaClient,
//     input: ModuleRoleInputType,
//     // data: any,
// ) => {
//     const moduleroles = prisma.moduleRoles.create({
//         data: {
//             // ...data,
//             ...input,
//         },
//     });

//     return moduleroles;
// };

// // export const getModuleRole = async (prisma: PrismaClient, id: number) => {
// //     const moduleroles = await prisma.moduleRoles.findUnique({
// //         where: {
// //             id,
// //         },
// //     });

// //     return moduleroles;
// // };

// // export const deleteModuleRole = async (prisma: PrismaClient, id: number) => {
// //     const moduleroles = await prisma.moduleRoles.delete({
// //         where: {
// //             id,
// //         },
// //     });

// //     return moduleroles;
// // };

// // export const updateModuleRole = async (
// //     prisma: PrismaClient,
// //     id: number,
// //     data: any,
// // ) => {
// //     const moduleroles = await prisma.moduleRoles.update({
// //         where: {
// //             id,
// //         },
// //         data: data,
// //     });

// //     return moduleroles;
// // };

// //modules permission

// export const createModulePermission = async (
//     prisma: PrismaClient,
//     // input: ModulePermissionInputType,
//     data: any,
// ) => {
//     const modulepermissions = prisma.modulePermissions.create({
//         data: {
//             ...data,
//             // ...input,
//         },
//     });

//     return modulepermissions;
// };

// // export const getModuleRole = async (prisma: PrismaClient, id: number) => {
// //     const moduleroles = await prisma.moduleRoles.findUnique({
// //         where: {
// //             id,
// //         },
// //     });

// //     return moduleroles;
// // };

// // export const deleteModuleRole = async (prisma: PrismaClient, id: number) => {
// //     const moduleroles = await prisma.moduleRoles.delete({
// //         where: {
// //             id,
// //         },
// //     });

// //     return moduleroles;
// // };

// // export const updateModuleRole = async (
// //     prisma: PrismaClient,
// //     id: number,
// //     data: any,
// // ) => {
// //     const moduleroles = await prisma.moduleRoles.update({
// //         where: {
// //             id,
// //         },
// //         data: data,
// //     });

// //     return moduleroles;
// // };

// //modules permission

// export const createRolePermission = async (
//     prisma: PrismaClient,
//     // input: RolePermissionInputType,
//     data: any,
// ) => {
//     const rolepermissions = prisma.rolesPermissions.create({
//         data: {
//             ...data,
//             // ...input,
//         },
//     });

//     return rolepermissions;
// };

// // export const getModuleRole = async (prisma: PrismaClient, id: number) => {
// //     const moduleroles = await prisma.moduleRoles.findUnique({
// //         where: {
// //             id,
// //         },
// //     });

// //     return moduleroles;
// // };

// // export const deleteModuleRole = async (prisma: PrismaClient, id: number) => {
// //     const moduleroles = await prisma.moduleRoles.delete({
// //         where: {
// //             id,
// //         },
// //     });

// //     return moduleroles;
// // };

// // export const updateModuleRole = async (
// //     prisma: PrismaClient,
// //     id: number,
// //     data: any,
// // ) => {
// //     const moduleroles = await prisma.moduleRoles.update({
// //         where: {
// //             id,
// //         },
// //         data: data,
// //     });

// //     return moduleroles;
// // };

// //user role

// export const createUserRole = async (
//     prisma: PrismaClient,
//     // input: ModulePermissionInputType,
//     data: any,
// ) => {
//     const userroles = prisma.userRoles.create({
//         data: {
//             ...data,
//             // ...input,
//         },
//     });

//     return userroles;
// };

// // export const getModuleRole = async (prisma: PrismaClient, id: number) => {
// //     const moduleroles = await prisma.moduleRoles.findUnique({
// //         where: {
// //             id,
// //         },
// //     });

// //     return moduleroles;
// // };

// // export const deleteModuleRole = async (prisma: PrismaClient, id: number) => {
// //     const moduleroles = await prisma.moduleRoles.delete({
// //         where: {
// //             id,
// //         },
// //     });

// //     return moduleroles;
// // };

// // export const updateModuleRole = async (
// //     prisma: PrismaClient,
// //     id: number,
// //     data: any,
// // ) => {
// //     const moduleroles = await prisma.moduleRoles.update({
// //         where: {
// //             id,
// //         },
// //         data: data,
// //     });

// //     return moduleroles;
// // };

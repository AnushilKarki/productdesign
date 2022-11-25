// /* eslint-disable @typescript-eslint/ban-ts-comment */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { FastifyPluginAsync } from 'fastify';
// import {
//     createRoleHandler,
//     updateRoleHandler,
//     getRoleHandler,
//     deleteRoleHandler,
//     createPermissionHandler,
//     getPermissionHandler,
//     updatePermissionHandler,
//     deletePermissionHandler,
//     createModuleHandler,
//     getModuleHandler,
//     updateModuleHandler,
//     deleteModuleHandler,
//     createModulePermissionHandler,
//     createModuleRoleHandler,
//     createRolePermissionHandler,
//     createUserRoleHandler,
// } from '../../modules/roleandpermission/roleandpermission.handler';
// import { RoleResponse } from '../../modules/roleandpermission/roleandpermission.schema';

// const roleandpermission: FastifyPluginAsync = async (
//     fastify,
// ): Promise<void> => {
//     fastify.post(
//         '/create/role',
//         {
//             schema: {
//                 description: 'Create new role',
//                 tags: ['role'],
//                 summary: 'create role',
//                 response: {
//                     201: {
//                         success: { type: 'boolean' },
//                         message: { type: 'string' },
//                         result: RoleResponse,
//                     },
//                 },
//             },
//         },
//         createRoleHandler,
//     );
//     fastify.put(
//         '/update/role/:id',
//         {
//             schema: {
//                 description: 'update new role',
//                 tags: ['role'],
//                 summary: 'update role',
//                 response: {
//                     201: RoleResponse,
//                     // {
//                     //     success: { type: 'boolean' },
//                     //     message: { type: 'string' },
//                     //     result: RoleResponse,
//                     // },
//                 },
//             },
//         },
//         updateRoleHandler,
//     );
//     fastify.get(
//         '/role',
//         {
//             schema: {
//                 description: 'Fetch all role',
//                 tags: ['role'],
//                 summary: 'fetch roles',
//                 response: {
//                     200: RoleResponse,
//                 },
//             },
//         },
//         getRoleHandler,
//     );
//     fastify.delete(
//         '/role/delete/:id',
//         {
//             schema: {
//                 description: 'delete single role',
//                 tags: ['role'],
//                 summary: 'delete role',
//                 response: {
//                     200: RoleResponse,
//                 },
//             },
//         },
//         deleteRoleHandler,
//     );
//     //permission
//     fastify.post(
//         '/create/permission',
//         {
//             schema: {
//                 description: 'Create new permission',
//                 tags: ['permission'],
//                 summary: 'create permission',
//                 response: {
//                     201: RoleResponse,
//                     // 201: {
//                     //     success: { type: 'boolean' },
//                     //     message: { type: 'string' },
//                     //     result: RoleResponse,
//                     // },
//                 },
//             },
//         },
//         createPermissionHandler,
//     );
//     fastify.put(
//         '/update/permission/:id',
//         {
//             schema: {
//                 description: 'Create new permission',
//                 tags: ['permission'],
//                 summary: 'create permission',
//                 response: {
//                     201: RoleResponse,
//                     // 201: {
//                     //     success: { type: 'boolean' },
//                     //     message: { type: 'string' },
//                     //     result: RoleResponse,
//                     // },
//                 },
//             },
//         },
//         updatePermissionHandler,
//     );
//     fastify.get(
//         '/permission',
//         {
//             schema: {
//                 description: 'Fetch all permission',
//                 tags: ['permission'],
//                 summary: 'fetch permission',
//                 response: {
//                     200: RoleResponse,
//                 },
//             },
//         },
//         getPermissionHandler,
//     );
//     fastify.delete(
//         '/permission/delete/:id',
//         {
//             schema: {
//                 description: 'delete single permission',
//                 tags: ['permission'],
//                 summary: 'delete permission',
//                 response: {
//                     200: RoleResponse,
//                 },
//             },
//         },
//         deletePermissionHandler,
//     );
//     //module
//     fastify.post(
//         '/create/module',
//         {
//             schema: {
//                 description: 'Create new module',
//                 tags: ['module'],
//                 summary: 'create module',
//                 response: {
//                     201: {
//                         success: { type: 'boolean' },
//                         message: { type: 'string' },
//                         result: RoleResponse,
//                     },
//                 },
//             },
//         },
//         createModuleHandler,
//     );
//     fastify.put(
//         '/update/module/:id',
//         {
//             schema: {
//                 description: 'update new module',
//                 tags: ['module'],
//                 summary: 'update module',
//                 response: {
//                     201: RoleResponse,
//                     // 201: {
//                     //     success: { type: 'boolean' },
//                     //     message: { type: 'string' },
//                     //     result: RoleResponse,
//                     // },
//                 },
//             },
//         },
//         updateModuleHandler,
//     );
//     fastify.get(
//         '/module',
//         {
//             schema: {
//                 description: 'Fetch all module',
//                 tags: ['module'],
//                 summary: 'fetch module',
//                 response: {
//                     200: RoleResponse,
//                 },
//             },
//         },
//         getModuleHandler,
//     );
//     fastify.delete(
//         '/module/delete/:id',
//         {
//             schema: {
//                 description: 'delete single module',
//                 tags: ['module'],
//                 summary: 'delete module',
//                 response: {
//                     200: RoleResponse,
//                 },
//             },
//         },
//         deleteModuleHandler,
//     );
//     //module role
//     fastify.post(
//         '/create/modulerole',
//         {
//             schema: {
//                 description: 'Create new modulerole',
//                 tags: ['modulerole'],
//                 summary: 'create modulerole',
//                 response: {
//                     201: {
//                         success: { type: 'boolean' },
//                         message: { type: 'string' },
//                         result: RoleResponse,
//                     },
//                 },
//             },
//         },
//         createModuleRoleHandler,
//     );
//     // role permission
//     fastify.post(
//         '/create/rolepermission',
//         {
//             schema: {
//                 description: 'Create new rolepermission',
//                 tags: ['rolepermission'],
//                 summary: 'create rolepermission',
//                 response: {
//                     201: {
//                         success: { type: 'boolean' },
//                         message: { type: 'string' },
//                         result: RoleResponse,
//                     },
//                 },
//             },
//         },
//         createRolePermissionHandler,
//     );
//     //module permission
//     fastify.post(
//         '/create/modulepermission',
//         {
//             schema: {
//                 description: 'Create new modulepermission',
//                 tags: ['modulepermission'],
//                 summary: 'create modulepermission',
//                 response: {
//                     201: {
//                         success: { type: 'boolean' },
//                         message: { type: 'string' },
//                         result: RoleResponse,
//                     },
//                 },
//             },
//         },
//         createModulePermissionHandler,
//     );
//     //user role
//     fastify.post(
//         '/create/userrole',
//         {
//             schema: {
//                 description: 'Create new userrole',
//                 tags: ['userrole'],
//                 summary: 'create userrole',
//                 response: {
//                     201: {
//                         success: { type: 'boolean' },
//                         message: { type: 'string' },
//                         result: RoleResponse,
//                     },
//                 },
//             },
//         },
//         createUserRoleHandler,
//     );
// };
// export default roleandpermission;

// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { FastifyRequest, FastifyReply } from 'fastify';
// import {
//     ModuleInputType,
//     RoleInputType,
//     PermissionInputType,
// } from './roleandpermission.schema';
// import {
//     createRole,
//     updateRole,
//     createModule,
//     // getModule,
//     updateModule,
//     deleteModule,
//     createPermission,
//     // getPermission,
//     updatePermission,
//     deletePermission,
//     // getRole,
//     deleteRole,
//     createModuleRole,
//     createModulePermission,
//     createRolePermission,
//     createUserRole,
// } from './roleandpermission.service';

// // role

// export const createRoleHandler = async (
//     request: FastifyRequest<{
//         Body: RoleInputType;
//     }>,
//     reply: FastifyReply,
// ) => {
//     const {
//         server: { prisma },
//         body,
//     } = request;

//     try {
//         await createRole(prisma, body);

//         return reply.code(201).send({
//             success: true,
//             message: 'Created successfully',
//         });
//     } catch (error) {
//         console.log(error);

//         return new Error('Something went wrong');
//     }
// };

// export const getRoleHandler = async (
//     request: FastifyRequest<{
//         // Params: { id: string };
//     }>,
//     reply: FastifyReply,
// ) => {
//     const {
//         server: { prisma },
//         // params: { id },
//     } = request;

//     try {
//         // const role = await getRole(prisma, parseInt(id));
//         // const role = 'radha';
//         const role = await prisma.roles.findMany();

//         return reply.code(201).send({
//             success: true,
//             results: role,
//         });
//     } catch (error) {
//         console.log(error);

//         return new Error('Something went wrong');
//     }
// };

// export const deleteRoleHandler = async (
//     request: FastifyRequest<{
//         Params: {
//             id: string;
//         };
//     }>,
//     reply: FastifyReply,
// ) => {
//     const {
//         server: { prisma },
//         params: { id },
//     } = request;

//     try {
//         await deleteRole(prisma, parseInt(id));

//         return reply.code(201).send({
//             success: true,
//             message: 'role deleted successfully',
//         });
//     } catch (error) {
//         return new Error('Something went wrong');
//     }
// };

// export const updateRoleHandler = async (
//     request: FastifyRequest<{
//         Body: RoleInputType;
//         Params: {
//             id: string;
//         };
//     }>,
//     reply: FastifyReply,
// ) => {
//     const {
//         server: { prisma },
//         params: { id },
//         body,
//     } = request;

//     try {
//         const result = await updateRole(prisma, parseInt(id), body);

//         return reply.code(201).send({
//             success: true,
//             results: result,
//             message: 'role updated successfully',
//         });
//     } catch (error) {
//         console.log(error);

//         return new Error('Something went wrong');
//     }
// };

// // module

// export const createModuleHandler = async (
//     request: FastifyRequest<{
//         Body: ModuleInputType;
//     }>,
//     reply: FastifyReply,
// ) => {
//     const {
//         server: { prisma },
//         body,
//     } = request;

//     try {
//         await createModule(prisma, body);

//         return reply.code(201).send({
//             success: true,
//             message: 'Created successfully',
//         });
//     } catch (error) {
//         return new Error('Something went wrong');
//     }
// };

// export const getModuleHandler = async (
//     request: FastifyRequest<{
//         // Params: { id: string };
//     }>,
//     reply: FastifyReply,
// ) => {
//     const {
//         server: { prisma },
//         // params: { id },
//     } = request;

//     try {
//         const module = await prisma.modules.findMany();
//         // const module = await getModule(prisma, parseInt(id));

//         return reply.code(201).send({
//             success: true,
//             results: module,
//         });
//     } catch (error) {
//         return new Error('Something went wrong');
//     }
// };

// export const deleteModuleHandler = async (
//     request: FastifyRequest<{
//         Params: {
//             id: string;
//         };
//     }>,
//     reply: FastifyReply,
// ) => {
//     const {
//         server: { prisma },
//         params: { id },
//     } = request;

//     try {
//         await deleteModule(prisma, parseInt(id));

//         return reply.code(201).send({
//             success: true,
//             message: 'module deleted successfully',
//         });
//     } catch (error) {
//         return new Error('Something went wrong');
//     }
// };

// export const updateModuleHandler = async (
//     request: FastifyRequest<{
//         Body: ModuleInputType;
//         Params: {
//             id: string;
//         };
//     }>,
//     reply: FastifyReply,
// ) => {
//     const {
//         server: { prisma },
//         params: { id },
//         body,
//     } = request;

//     try {
//         const modules = await updateModule(prisma, parseInt(id), body);

//         return reply.code(201).send({
//             success: true,
//             message: 'module updated successfully',
//             results: modules,
//         });
//     } catch (error) {
//         return new Error('Something went wrong');
//     }
// };
// // permission

// export const createPermissionHandler = async (
//     request: FastifyRequest<{
//         Body: PermissionInputType;
//     }>,
//     reply: FastifyReply,
// ) => {
//     const {
//         server: { prisma },
//         body,
//     } = request;

//     try {
//         const permission = await createPermission(prisma, body);

//         return reply.code(201).send({
//             success: true,
//             message: 'Created successfully',
//             results: permission,
//         });
//     } catch (error) {
//         return new Error('Something went wrong');
//     }
// };

// export const getPermissionHandler = async (
//     request: FastifyRequest<{
//         // Params: { id: string };
//     }>,
//     reply: FastifyReply,
// ) => {
//     const {
//         server: { prisma },
//         // params: { id },
//     } = request;

//     try {
//         // const permission = await getPermission(prisma, parseInt(id));
//         const permission = await prisma.permisssions.findMany();

//         return reply.code(201).send({
//             success: true,
//             results: permission,
//         });
//     } catch (error) {
//         return new Error('Something went wrong');
//     }
// };

// export const deletePermissionHandler = async (
//     request: FastifyRequest<{
//         Params: {
//             id: string;
//         };
//     }>,
//     reply: FastifyReply,
// ) => {
//     const {
//         server: { prisma },
//         params: { id },
//     } = request;

//     try {
//         await deletePermission(prisma, parseInt(id));

//         return reply.code(201).send({
//             success: true,
//             message: 'module deleted successfully',
//         });
//     } catch (error) {
//         return new Error('Something went wrong');
//     }
// };

// export const updatePermissionHandler = async (
//     request: FastifyRequest<{
//         Body: PermissionInputType;
//         Params: {
//             id: string;
//         };
//     }>,
//     reply: FastifyReply,
// ) => {
//     const {
//         server: { prisma },
//         params: { id },
//         body,
//     } = request;

//     try {
//         const permission = await updatePermission(prisma, parseInt(id), body);

//         return reply.code(201).send({
//             success: true,
//             results: permission,
//             message: 'permission deleted successfully',
//         });
//     } catch (error) {
//         return new Error('Something went wrong');
//     }
// };

// // module role

// export const createModuleRoleHandler = async (
//     request: FastifyRequest<{
//         Body: {
//             [x: string]: any;
//         };
//     }>,
//     reply: FastifyReply,
// ) => {
//     const {
//         server: { prisma },
//         body,
//     } = request;

//     try {
//         await createModuleRole(prisma, {
//             assigned_at: body?.assigned_at,
//             assigned_by: body?.assigned_by,
//             modulesId: body?.modulesId,
//             rolesId: body?.rolesId,
//         });

//         return reply.code(201).send({
//             success: true,
//             message: 'Created successfully',
//         });
//     } catch (error) {
//         console.log(error);

//         return new Error('Something went wrong');
//     }
// };

// // module permission

// export const createModulePermissionHandler = async (
//     request: FastifyRequest<{
//         Body: {
//             [x: string]: any;
//         };
//     }>,
//     reply: FastifyReply,
// ) => {
//     const {
//         server: { prisma },
//         body,
//     } = request;

//     try {
//         await createModulePermission(prisma, {
//             assigned_at: body?.assigned_at,
//             assigned_by: body?.assigned_by,
//             modulesId: body?.modulesId,
//             permisssionsId: body?.permissionsId,
//         });

//         return reply.code(201).send({
//             success: true,
//             message: 'Created successfully',
//         });
//     } catch (error) {
//         console.log(error);

//         return new Error('Something went wrong');
//     }
// };

// // role permission

// export const createRolePermissionHandler = async (
//     request: FastifyRequest<{
//         Body: {
//             [x: string]: any;
//         };
//     }>,
//     reply: FastifyReply,
// ) => {
//     const {
//         server: { prisma },
//         body,
//     } = request;

//     try {
//         await createRolePermission(prisma, {
//             rolesId: body?.rolesId,
//             modulePermissionsModulesId: body?.modulePermissionsModulesId,
//             modulePermissionsPermisssionsId:
//                 body?.modulePermissionsPermisssionsId,
//         });

//         return reply.code(201).send({
//             success: true,
//             message: 'Created successfully',
//         });
//     } catch (error) {
//         console.log(error);

//         return new Error('Something went wrong');
//     }
// };

// // module permission

// export const createUserRoleHandler = async (
//     request: FastifyRequest<{
//         Body: {
//             [x: string]: any;
//         };
//     }>,
//     reply: FastifyReply,
// ) => {
//     const {
//         server: { prisma },
//         body,
//     } = request;

//     try {
//         await createUserRole(prisma, {
//             usersId: body?.usersId,
//             rolesId: body?.rolesId,
//             assigned_at: body?.assigned_at,
//             assigned_by: body?.assigned_by,
//         });

//         return reply.code(201).send({
//             success: true,
//             message: 'Created successfully',
//         });
//     } catch (error) {
//         console.log(error);

//         return new Error('Something went wrong');
//     }
// };

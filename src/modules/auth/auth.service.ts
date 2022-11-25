/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as bcrypt from 'bcryptjs';
import { ProspectInputType, SignUpInputType } from './auth.schema';
import { PrismaClient } from '@prisma/client';

export const createProspectUser = async (
    prisma: PrismaClient,
    input: ProspectInputType,
) => {
    const u = await prisma.prospectUsers.findUnique({
        where: {
            email: input?.email,
        },
    });

    if (u) return u;
    const user = await prisma.prospectUsers.create({
        data: {
            email: input?.email,
        },
    });

    return user;
};

export const findProspectUserByEmail = async (
    prisma: PrismaClient,
    input: string,
) => {
    const user = await prisma.prospectUsers.findUnique({
        where: {
            email: input,
        },
    });

    return user;
};

export const createUser = async (
    prisma: PrismaClient,
    input: SignUpInputType,
  
) => {
    const { password, ...rest } = input;
    const hashed = await bcrypt.hash(password, 10);
    const user = prisma.users.create({
        data: {
            ...rest,
            password: hashed,
            // roles: {
            //     create: [
            //         {
            //             // @ts-ignore
            //             assigned_by: 'bijay',
            //             Roles: {
            //                 connect: {
            //                     id: 2,
            //                 },
            //             },
            //         },
            //     ],
            // },
        },
    });

    return user;
};

export const getUser = async (prisma: PrismaClient, id: number) => {
    const user = await prisma.users.findUnique({
        where: {
            id,
        },
    });

    return user;
};

export const deleteUser = async (prisma: PrismaClient, id: number) => {
    const user = await prisma.users.delete({
        where: {
            id,
        },
    });

    return user;
};

export const updateUser = async (
    prisma: PrismaClient,
    id: number,
    data: any,
) => {
    const user = await prisma.users.update({
        where: {
            id,
        },
        data: data,
    });

    return user;
};

export const loginService = async (prisma: PrismaClient, input: string) => {
    const user = await prisma.users.findUnique({
        where: {
            email: input,
        },
        // include: {
        //     roles: {
        //         include: {
        //             Roles: {
        //                 select: {
        //                     title: true,
        //                 },
        //             },
        //         },
        //     },
        // },
    });

    return user;
};

export const findUserByEmail = async (prisma: PrismaClient, input: string) => {
    const user = await prisma.users.findUnique({
        where: {
            email: input,
        },
    });

    return user;
};

export const findUserById = async (prisma: PrismaClient, id: number) => {
    const user = await prisma.users.findUnique({
        where: {
            id,
        },
    });

    return user;
};

export const updatePassword = async (
    prisma: PrismaClient,
    id: number,
    password: string,
) => {
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

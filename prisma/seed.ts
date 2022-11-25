/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaClient } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
    console.log('start seeding..s.');
    // const admin = await prisma.users.findUnique({
    //     where: {
    //         email: 'dev.bijay04@gmail.com',
    //     },
    // });
    // console.log('start seeding..s.', admin);
    const password = await bcryptjs.hash('@hello#123', 10);

    // if (admin) {
    //     console.log('can not create another super admin');
    //     throw new Error('can not create another super admin');
    // }

    const res = await prisma.users.create({
        data: {
            email: 'dev.bijay04@gmail.com',
            // country: 'nepal',
            name: 'bijay budhathoki',
            password,
            phone: '1234567890',
            // domain: 'bijay.roocrm.com',
            // profile:
            //     'https://gitlab.com/uploads/-/system/user/avatar/2474169/avatar.png?width=400',
            roles: {
                create: [
                    {
                        // @ts-ignore
                        assigned_by: 'bijay',

                        Roles: {
                            create: {
                                // @ts-ignore
                                title: 'super_admin',
                                // @ts-ignore
                                created_by: 'bijay',
                            },
                        },
                    },
                ],
            },
        },
    });
    const roles = await prisma.roles.createMany({
        data: [
            {
                title: 'admin',
                created_by: res?.name,
            },
            {
                title: 'user',
                created_by: res?.name,
            },
        ],
    });
    console.log(`Seeding finished.`, res, roles);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.log('error', e);
        await prisma.$disconnect();
        process.exit(1);
    });

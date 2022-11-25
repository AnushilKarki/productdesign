/*
  Warnings:

  - You are about to drop the column `name` on the `Modules` table. All the data in the column will be lost.
  - You are about to drop the `ModulesRolePermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userRole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Modules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ModulesRolePermission" DROP CONSTRAINT "ModulesRolePermission_modulesId_fkey";

-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "userRole" DROP CONSTRAINT "userRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "userRole" DROP CONSTRAINT "userRole_userId_fkey";

-- DropIndex
DROP INDEX "Modules_id_key";

-- AlterTable
ALTER TABLE "Modules" DROP COLUMN "name",
ADD COLUMN     "created_by" TEXT,
ADD COLUMN     "is_deleted" BOOLEAN DEFAULT false,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updated_by" TEXT,
ADD CONSTRAINT "Modules_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "ModulesRolePermission";

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "userRole";

-- CreateTable
CREATE TABLE "UserRoles" (
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_by" TEXT,
    "usersId" INTEGER NOT NULL,
    "rolesId" INTEGER NOT NULL,

    CONSTRAINT "UserRoles_pkey" PRIMARY KEY ("usersId","rolesId")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleRoles" (
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_by" TEXT,
    "rolesId" INTEGER NOT NULL,
    "modulesId" INTEGER NOT NULL,

    CONSTRAINT "ModuleRoles_pkey" PRIMARY KEY ("rolesId","modulesId")
);

-- CreateTable
CREATE TABLE "ModulePermissions" (
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_by" TEXT,
    "modulesId" INTEGER NOT NULL,
    "permisssionsId" INTEGER NOT NULL,

    CONSTRAINT "ModulePermissions_pkey" PRIMARY KEY ("modulesId","permisssionsId")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolesPermissions" (
    "rolesId" INTEGER NOT NULL,
    "modulePermissionsModulesId" INTEGER NOT NULL,
    "modulePermissionsPermisssionsId" INTEGER NOT NULL,

    CONSTRAINT "RolesPermissions_pkey" PRIMARY KEY ("rolesId","modulePermissionsModulesId")
);

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "UserRoles_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoles" ADD CONSTRAINT "UserRoles_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleRoles" ADD CONSTRAINT "ModuleRoles_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleRoles" ADD CONSTRAINT "ModuleRoles_modulesId_fkey" FOREIGN KEY ("modulesId") REFERENCES "Modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModulePermissions" ADD CONSTRAINT "ModulePermissions_modulesId_fkey" FOREIGN KEY ("modulesId") REFERENCES "Modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModulePermissions" ADD CONSTRAINT "ModulePermissions_permisssionsId_fkey" FOREIGN KEY ("permisssionsId") REFERENCES "Permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesPermissions" ADD CONSTRAINT "RolesPermissions_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesPermissions" ADD CONSTRAINT "RolesPermissions_modulePermissionsModulesId_modulePermissi_fkey" FOREIGN KEY ("modulePermissionsModulesId", "modulePermissionsPermisssionsId") REFERENCES "ModulePermissions"("modulesId", "permisssionsId") ON DELETE RESTRICT ON UPDATE CASCADE;

import { FastifyRequest } from "fastify";

export const verifySuperAdmin = async (request: FastifyRequest) => {
  const token = request.headers.authorization?.split(" ")[1] || "";
  const decoded: any = request.jwt.decode(token);

  console.log("in catch", decoded?.roles);

  try {
    //todo query database

    if (!decoded?.roles?.includes("super_admin")) {
      throw new Error("Resources not allowed");
    }
  } catch (error) {
    throw new Error("Resources not allowed");
  }
};

export const verifyAdmin = async () => {
  try {
    //todo
    const roles = false;

    if (!roles) {
      throw new Error("Resources not allowed");
    }

    return;
  } catch (error) {
    throw new Error("Resources not allowed");
  }
};

export const verifyUser = async () => {
  try {
    //todo
    const roles = false;

    if (!roles) {
      throw new Error("Resources not allowed");
    }

    return;
  } catch (error) {
    throw new Error("Resources not allowed");
  }
};

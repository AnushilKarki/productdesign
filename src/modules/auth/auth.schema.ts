import { Static, Type } from '@sinclair/typebox';

const coreData = {
    email: Type.String({
        format: 'email',
    }),
    name: Type.String({
        minLength: 2,
    }),
    roles: Type.String({
        minLength: 2,
    }),
    // country: Type.String(),
    phone: Type.String(),
    // profile: Type.Optional(Type.String()),
    // domain: Type.Optional(Type.String()),
    // referer_ource: Type.Optional(Type.String()),
};
export const ProspectInput = Type.Object({
    email: Type.String({
        format: 'email',
    }),
});
export const ProspectInputResponse = Type.Object({
    success: Type.String(),
    message: Type.String(),
});

export const LoginInput = Type.Object({
    email: Type.String({
        minLength: 2,
    }),
    password: Type.String({
        minLength: 4,
    }),
});
export const LoginInputResponse = Type.Object({
    success: Type.Boolean(),
    results: Type.Object({
        ...coreData,
        userId: Type.Optional(Type.Any()),
    }),
});

export const SignupInput = Type.Object({
    ...coreData,
    password: Type.String({
        minLength: 4,
    }),
    userId: Type.Optional(Type.Any()),
});
export const SignUpResponse = Object({
    success: Type.Boolean(),
    results: Type.Object({
        ...coreData,
    }),
});

export type ProspectInputType = Static<typeof ProspectInput>;
export type LoginInputType = Static<typeof LoginInput>;
export type LoginInputResponseType = Static<typeof LoginInputResponse>;
export type SignUpInputType = Static<typeof SignupInput>;
export type SignUpInputResponseType = Static<typeof SignUpResponse>;

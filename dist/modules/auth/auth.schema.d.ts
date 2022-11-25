import { Static } from '@sinclair/typebox';
export declare const ProspectInput: import("@sinclair/typebox").TObject<{
    email: import("@sinclair/typebox").TString<"email">;
}>;
export declare const ProspectInputResponse: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TString<string>;
    message: import("@sinclair/typebox").TString<string>;
}>;
export declare const LoginInput: import("@sinclair/typebox").TObject<{
    email: import("@sinclair/typebox").TString<string>;
    password: import("@sinclair/typebox").TString<string>;
}>;
export declare const LoginInputResponse: import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TBoolean;
    results: import("@sinclair/typebox").TObject<{
        userId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
        email: import("@sinclair/typebox").TString<"email">;
        name: import("@sinclair/typebox").TString<string>;
        roles: import("@sinclair/typebox").TString<string>;
        phone: import("@sinclair/typebox").TString<string>;
    }>;
}>;
export declare const SignupInput: import("@sinclair/typebox").TObject<{
    password: import("@sinclair/typebox").TString<string>;
    userId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TAny>;
    email: import("@sinclair/typebox").TString<"email">;
    name: import("@sinclair/typebox").TString<string>;
    roles: import("@sinclair/typebox").TString<string>;
    phone: import("@sinclair/typebox").TString<string>;
}>;
export declare const SignUpResponse: any;
export declare type ProspectInputType = Static<typeof ProspectInput>;
export declare type LoginInputType = Static<typeof LoginInput>;
export declare type LoginInputResponseType = Static<typeof LoginInputResponse>;
export declare type SignUpInputType = Static<typeof SignupInput>;
export declare type SignUpInputResponseType = Static<typeof SignUpResponse>;

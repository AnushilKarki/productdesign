interface VerifyParams {
    token: number;
    email: string;
}
export declare const sendVerificationMail: ({ token, email }: VerifyParams) => Promise<void>;
export declare const resetLink: ({ link, email, }: {
    link: string;
    email: string;
}) => Promise<void>;
export {};

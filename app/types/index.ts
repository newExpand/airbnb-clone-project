import { Listing, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createAt"> & {
    createAt: string;
};

export type SafeUser = Omit<User, "createdAt" | "updateAt" | "emailVerified"> & {
    createdAt: string;
    updateAt: string;
    emailVerified: string | null;
};

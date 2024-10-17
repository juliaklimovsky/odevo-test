import {User} from "../types/user";

export const users = {
    standardUser: {
        login: 'standard_user',
        password: 'secret_sauce',
        firstName: 'Pippi',
        lastName: 'Långstrump',
        zip: '12345'
    },

    lockedOutUser: {
        login: 'locked_out_user',
        password: 'secret_sauce'
    }
} satisfies Record<string, User>;

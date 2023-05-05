import { roles } from './../../service/roles.js';

export const endpoint = {
    add : [roles.user],
    update: [roles.user],
    delete:[roles.user]
}
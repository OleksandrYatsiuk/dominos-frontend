import { UserRoles } from 'src/app/core/models/user.model';

export const CAN_MANAGE_PIZZA = [ UserRoles.Administrator, UserRoles.ProjectManager ];
export const IS_MANAGEMENT = [ UserRoles.Administrator, UserRoles.ProjectManager ];

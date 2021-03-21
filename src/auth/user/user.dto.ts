import {IsDefined, IsEmail, IsIn} from 'class-validator';
import { USER_ROLES, IUserRoles } from 'src/shared/enums/app.properties';
import { LoginProvidersType, LOGIN_PROVIDERS } from "src/shared/enums/login-providers.enums";

export class UsersDto {
    @IsDefined()
    @IsEmail()
    username: string;

    password: string;

    @IsDefined()
    @IsIn(Object.keys(LOGIN_PROVIDERS))	
    provider: LoginProvidersType;

    @IsDefined()
    @IsIn(Object.keys(USER_ROLES))
    role: IUserRoles;
}
import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: 'Email не может быть пустым' })
    @IsEmail({}, { message: 'Некорректный формат Email' })
    email: string;

    @IsNotEmpty({ message: 'Пароль не может быть пустым' })
    @IsString({ message: 'Пароль должен быть строкой' })
    password: string;
}
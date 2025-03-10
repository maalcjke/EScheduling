import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class RegisterDto {
    @IsNotEmpty({ message: 'Email не может быть пустым' })
    @IsEmail({}, { message: 'Некорректный формат Email' })
    email: string;

    @MinLength(6, { message: 'Пароль не может быть короче 6 символов' })
    @IsNotEmpty({ message: 'Пароль не может быть пустым' })
    @IsString({ message: 'Пароль должен быть строкой' })
    password: string;
}
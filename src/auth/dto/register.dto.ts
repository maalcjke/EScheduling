import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class RegisterDto {
    @IsNotEmpty({ message: 'Email не может быть пустым' })
    @IsEmail({}, { message: 'Некорректный формат Email' })
    email: string;

    @MinLength(6, { message: 'Пароль не может быть короче 6 символов' })
    @IsNotEmpty({ message: 'Пароль не может быть пустым' })
    @IsString({ message: 'Пароль должен быть строкой' })
    password: string;

    @MinLength(2, { message: 'Имя не может быть короче 2 символов' })
    @IsNotEmpty({ message: 'Имя не может быть пустым' })
    @IsString({ message: 'Имя должно быть строкой' })
    username: string;
}
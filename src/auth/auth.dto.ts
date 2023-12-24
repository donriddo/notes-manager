import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class SignInDTO extends SignUpDTO {}

import { NonEmpty, IsEmail, MinLength } from '@/common/decorators/validation.decorator';

export class CreateUserDto {
  @NonEmpty("O campo nome é obrigatório!")
  name: string;

  @IsEmail('Informe um email valido')
  email: string;

  @NonEmpty("O campo senha é obrigatório!")
  @MinLength(6, "A senha deve conter no mínimo 6 caracteres!")
  password: string;
}

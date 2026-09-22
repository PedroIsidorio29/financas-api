import { NonEmpty } from "@/common/decorators/validation.decorator";

export class LoginUserDto {
  @NonEmpty("O campo email é obrigatório!")
  email: string;

  @NonEmpty("O campo senha é obrigatório!")
  password: string;
}

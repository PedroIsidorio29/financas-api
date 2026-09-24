
import { Injectable, UnauthorizedException,ConflictException } from '@nestjs/common';
import { User, UserDocument } from '@/user/schemas/user.schema';
import { AuthService } from '@/auth/auth.service';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) { }

  async create(name: string, email: string, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    const findEmail = await this.findByEmail(email.trim());

    if (!!findEmail)
      throw new ConflictException('Já existe um usuario cadastrado com esse email');

    const user = new this.userModel({
      name,
      email,
      password: passwordHash,
    });
    return user.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async login(_email: string, password: string) {
    const errorMsg = "Login inválido, verifique seus dados e tente novamente"

    const user = await this.findByEmail(_email);

    if (!user)
      throw new UnauthorizedException(errorMsg);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      throw new UnauthorizedException(errorMsg);

    const accessToken = this.authService.generateToken(
      user._id.toString(),
      user.email,
    );

    // const { _id, name, email } = user
    return { accessToken }
  }

}


/* 
@Injectable(): Essa anotação informa ao Nest que essa classe pode participar do sistema de injeção de dependências.
@InjectModel(User.name): Especifica para Nest que o Model do Mongoose correspondente ao User.
private readonly userModel: Model<UserDocument>: guardamos esse Model em uma propriedade do UserService.
*/
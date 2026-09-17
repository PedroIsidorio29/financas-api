
import { User, UserDocument } from '@/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) { }

  async create(name: string, email: string, password: string) {
    const user = new this.userModel({
      name,
      email,
      password,
    });
    console.log(user);
    
    // return user.save();
  }

}


/* 
@Injectable(): Essa anotação informa ao Nest que essa classe pode participar do sistema de injeção de dependências.
@InjectModel(User.name): Especifica para Nest que o Model do Mongoose correspondente ao User.
private readonly userModel: Model<UserDocument>: guardamos esse Model em uma propriedade do UserService.
*/
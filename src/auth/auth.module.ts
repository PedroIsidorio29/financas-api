import { JwtStrategy } from '@/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@/auth/auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    JwtModule.register({
      secret: 'minha-chave-secreta',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports: [
    AuthService,
    PassportModule,
  ],
})
export class AuthModule {}
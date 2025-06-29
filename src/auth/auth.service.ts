import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        try {
            const user = await this.usersService.findByEmail(email);
            
            const passwordValid = await bcrypt.compare(password, user.password);

            if (!passwordValid) {
                throw new UnauthorizedException('Correo o contraseña inválidos');
            }

            return user;
        } catch (error) {
            throw new UnauthorizedException('Correo o contraseña inválidos');
        }
    }

    async login(user: any) {
        const payload = { sub: user.id, role: user.role, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                // Add other user properties as needed
            }
        };
    }
}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';



type User = {
    id?: string;
    email: string;
    password: string;
    role?: string;
    // Add other user properties as needed
};

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        
        if (!user || !user.password) {
            throw new UnauthorizedException('Correo o contraseña inválidos');
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            throw new UnauthorizedException('Correo o contraseña inválidos');
        }

        return user;
    }

    async login(user: any) {
        const payload = { sub: user.id, role: user.role, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
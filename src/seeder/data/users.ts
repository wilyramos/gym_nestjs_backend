import { hashSync } from 'bcrypt';
import { User } from '../../users/entities/user.entity';

export const usersSeed = async (): Promise<Partial<User>[]> => {
    const passwordHash = hashSync('123456', 10);

    return [
        {
            name: 'Admin Jorge',
            email: 'admin@correo.com',
            dni: '12345678',
            password: passwordHash,
            role: 'ADMIN',
        },
        {
            name: 'Luis Gómez',
            email: 'luis@correo.com',
            dni: '87654321',
            password: passwordHash,
            role: 'CLIENT',
        },
        {
            name: 'Carla Sánchez',
            email: 'carla@correo.com',
            dni: '11223344',
            password: passwordHash,
            role: 'CLIENT',
        },
        {
            name: 'Pedro Torres',
            email: 'pedro@correo.com',
            dni: '44332211',
            password: passwordHash,
            role: 'CLIENT',
        },
        {
            name: 'Lucía Ramírez',
            email: 'lucia@correo.com',
            dni: '99887766',
            password: passwordHash,
            role: 'TRAINER',
        },
        {
            name: 'Marco Alarcón',
            email: 'marco@correo.com',
            dni: '55667788',
            password: passwordHash,
            role: 'TRAINER',
        },
    ];
};

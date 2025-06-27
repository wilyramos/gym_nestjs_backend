import { Membership } from '../../memberships/entities/membership.entity';

export const membershipsSeed: Partial<Membership>[] = [
    {
        name: 'Membresía Mensual',
        price: 80.00,
        durationInDays: 30,
        isActive: true,
    },
    {
        name: 'Membresía Trimestral',
        price: 160.00,
        durationInDays: 90,
        isActive: true,
    },
    {
        name: 'Membresía Anual',
        price: 300.00,
        durationInDays: 365,
        isActive: true,
    },
    {
        name: 'Membresía Premium',
        price: 500.00,
        durationInDays: 365,
        isActive: true,
    },
];

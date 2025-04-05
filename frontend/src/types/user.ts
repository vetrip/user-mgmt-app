export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SUSPENDED = 'SUSPENDED'
}

export interface UserDTO {
    id?: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    status?: UserStatus;
    role?: UserRole;
    createdAt?: string;
    lastLoginAt?: string;
} 
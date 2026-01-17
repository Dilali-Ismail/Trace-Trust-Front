export type UserRole = 'ADMIN' | 'WAREHOUSE_MANAGER' | 'CLIENT';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    active: boolean;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
    role: UserRole;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    role: UserRole;
}

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../../config/env.js';
import { mockStore } from '../../database/mockStore.js';
import { RegisterInput, LoginInput } from './auth.schema.js';

export class AuthService {
  static async register(input: RegisterInput) {
    const existing = mockStore.users.find((u) => u.email.toLowerCase() === input.email.toLowerCase());
    if (existing) {
      throw new Error('Email sudah terdaftar. Silakan gunakan email lain atau login.');
    }

    const password_hash = await bcrypt.hash(input.password, 10);
    const userId = `USR-${Date.now()}`;
    const businessId = `UMKM-${Date.now()}`;

    const newUser = {
      user_id: userId,
      name: input.name,
      email: input.email,
      password_hash,
      role: 'OWNER',
      created_at: new Date().toISOString(),
    };

    mockStore.users.push(newUser);

    if (input.business_name) {
      mockStore.businesses.push({
        business_id: businessId,
        name: input.business_name,
        type: 'General UMKM',
        description: 'Usaha UMKM terdaftar baru',
        province: 'Jawa Barat',
        city_regency: 'Bandung',
        district: 'Coblong',
        employee_count: 1,
        years_operating: 1,
        phone: '',
        email: input.email,
        website: '',
        created_at: new Date().toISOString(),
      });
    }

    const token = jwt.sign(
      {
        user_id: newUser.user_id,
        email: newUser.email,
        role: newUser.role,
        business_id: input.business_name ? businessId : 'UMKM001',
      },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    return {
      user: {
        user_id: newUser.user_id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    };
  }

  static async login(input: LoginInput) {
    const user = mockStore.users.find((u) => u.email.toLowerCase() === input.email.toLowerCase());
    if (!user) {
      throw new Error('Email atau password tidak sesuai.');
    }

    const isMatch = await bcrypt.compare(input.password, user.password_hash);
    if (!isMatch) {
      throw new Error('Email atau password tidak sesuai.');
    }

    const business = mockStore.businesses[0];

    const token = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
        business_id: business ? business.business_id : 'UMKM001',
      },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    return {
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        business_id: business ? business.business_id : 'UMKM001',
      },
      token,
    };
  }

  static async getMe(userId: string) {
    const user = mockStore.users.find((u) => u.user_id === userId);
    if (!user) {
      throw new Error('Pengguna tidak ditemukan.');
    }

    const business = mockStore.businesses[0];

    return {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
      business: business || null,
    };
  }
}

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding APH YAH PostgreSQL database via Prisma...');

  const passwordHash = await bcrypt.hash('Demo123!', 10);

  const user = await prisma.user.upsert({
    where: { email: 'demo@aphyah.id' },
    update: {},
    create: {
      name: 'Budi Santoso',
      email: 'demo@aphyah.id',
      password_hash: passwordHash,
      role: 'OWNER',
    },
  });

  const business = await prisma.business.upsert({
    where: { business_id: 'UMKM001' },
    update: {},
    create: {
      business_id: 'UMKM001',
      name: 'Kopi Karawang',
      type: 'F&B / Pengolahan Kopi',
      description: 'Produsen kopi lokal specialty dan olahan turunan kopi asli Karawang, Jawa Barat.',
      province: 'Jawa Barat',
      city_regency: 'Kabupaten Karawang',
      district: 'Karawang Barat',
      employee_count: 8,
      years_operating: 4,
      phone: '081234567890',
      email: 'info@kopikarawang.id',
      website: 'https://kopikarawang.id',
    },
  });

  await prisma.businessUser.upsert({
    where: { business_id_user_id: { business_id: business.business_id, user_id: user.user_id } },
    update: {},
    create: {
      business_id: business.business_id,
      user_id: user.user_id,
      role: 'OWNER',
    },
  });

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

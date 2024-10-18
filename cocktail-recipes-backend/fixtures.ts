import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Cocktail from './models/Cocktail';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropDatabase();
    console.log('Database dropped successfully');
  } catch (e) {
    console.log('Error dropping database:', e);
  }

  const [_user, admin] = await User.create({
    email: 'user@mail.com',
    password: '123WWW',
    displayName: 'Grisha',
    token: crypto.randomUUID(),
    avatar: 'fixtures/admin-avatar.jpg',
    role: 'user',
  }, {
    email: 'admin@mail.com',
    password: '123321',
    displayName: 'Administrator',
    token: crypto.randomUUID(),
    avatar: 'fixtures/admin-avatar.jpg',
    role: 'admin',
  });

  await Cocktail.create({
    user: admin,
    title: 'ivanArtist',
    recipe: '2024',
    image: 'fixtures/admin-avatar.jpg',
    ingredients: [
      {
        title: 'lol',
        quantity: '15ml',
      },
      {
        title: 'lol',
        quantity: '125ml',
      },
    ],
    isPublished: true,
  });

  await db.close();
  await mongoose.disconnect();
};

run().catch(console.error);
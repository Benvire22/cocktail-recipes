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

  const [user, admin] = await User.create({
    email: 'user@mail.com',
    password: '123WWW',
    displayName: 'Grisha',
    token: crypto.randomUUID(),
    avatar: 'fixtures/grisha.webp',
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
    user: user,
    title: 'Tea',
    recipe: 'Подогреть воду\n' +
      'Для черного чая вода должна быть почти кипящей (95-100°C). Для зеленого и белого чая — немного прохладнее (75-85°C), чтобы не испортить вкус.',
    image: 'fixtures/tea.webp',
    ingredients: [
      {
        title: 'Tea',
        quantity: '15g',
      },
      {
        title: 'water',
        quantity: '400ml',
      },
    ],
    isPublished: true,
  }, {
    user: admin,
    title: 'Coffee',
    recipe: 'Сначала вскипятите воду. Лучше использовать свежую фильтрованную воду, ' +
      'чтобы улучшить вкус кофе. Добавьте 1-2 чайные ложки растворимого кофе в чашку. ' +
      'Количество кофе зависит от того, насколько крепкий напиток вы хотите получить. ' +
      'Залейте кофе горячей водой (около 90-95°C, но не кипящей). ' +
      'Оставьте немного места в чашке, если вы планируете добавить молоко или сливки.',
    image: 'fixtures/coffee.webp',
    ingredients: [
      {
        title: 'Coffee',
        quantity: '10g',
      },
      {
        title: 'water',
        quantity: '200ml',
      },
    ],
    isPublished: true,
  });

  await db.close();
  await mongoose.disconnect();
};

run().catch(console.error);
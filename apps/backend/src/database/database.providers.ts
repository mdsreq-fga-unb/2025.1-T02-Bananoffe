import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      const uri = process.env.MONGO_URI;
      if (!uri) throw new Error('Variável MONGO_URI não definida.');
      return mongoose.connect(uri);
    },
  },
];
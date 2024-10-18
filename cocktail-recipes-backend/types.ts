import mongoose, { Model } from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  displayName: string;
  token: string;
  avatar: string | null;
  role: string;
  googleID?: string;
}

export interface CocktailIngredient {
  title: string;
  quantity: string;
}

export interface ICocktail {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId | string;
  title: string;
  image: string;
  recipe: string;
  ingredients: CocktailIngredient[];
  isPublished: boolean;
}

export type CocktailMutation = Omit<ICocktail, '_id'>;

export type CocktailModel = Model<CocktailMutation>;

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;
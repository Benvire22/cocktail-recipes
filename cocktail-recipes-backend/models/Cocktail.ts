import mongoose, { Types } from 'mongoose';
import { CocktailModel, CocktailMutation } from '../types';
import User from './User';

const Schema = mongoose.Schema;

const CocktailSchema = new Schema<CocktailMutation, CocktailModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'Album not found',
    },
  },
  title: {
    required: true,
    type: String,
  },
  recipe: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
  ingredients: {
    required: true,
    type: [],
  },
  isPublished: {
    required: true,
    type: Boolean,
    default: false,
  },
});

const Cocktail = mongoose.model<CocktailMutation, CocktailModel>('Cocktail', CocktailSchema);
export default Cocktail;
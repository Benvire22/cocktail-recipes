
export interface CocktailIngredient {
  title: string;
  quantity: string;
}

export interface Cocktail {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  };
  title: string;
  image: string;
  recipe: string;
  ingredients: CocktailIngredient[];
  isPublished: boolean;
}

export interface CocktailMutation {
  title: string;
  image: File;
  recipe: string;
  ingredients: CocktailIngredient[];
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string
  avatar: File | null;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  token: string;
  role: string;
  avatar: string | null;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
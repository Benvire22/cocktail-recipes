import mongoose, { Model } from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  displayName: string;
  token: string;
  role: string;
  googleID?: string;
  avatar: string | null;
}

export interface ArtistI {
  _id: mongoose.Types.ObjectId;
  name: string;
  photo: string | null;
  description: string | null;
  isPublished: boolean;
}

export type ArtistMutation = Omit<ArtistI, '_id'>;

export type ArtistModel = Model<ArtistMutation>;

export interface AlbumI {
  _id: mongoose.Types.ObjectId;
  artist: mongoose.Types.ObjectId | string;
  name: string;
  releaseDate: number;
  image: string | null;
  isPublished: boolean;
}

export type AlbumMutation = Omit<AlbumI, '_id'>;
export type AlbumModel = Model<AlbumMutation>;

export interface TrackI {
  _id: mongoose.Types.ObjectId;
  album: mongoose.Types.ObjectId | string;
  name: string;
  length: string;
  number: number;
  isPublished: boolean;
}

export type TrackMutation = Omit<TrackI, '_id'>;
export type TrackModel = Model<TrackMutation>;


export interface TrackHistoryMutation {
  user: mongoose.Types.ObjectId;
  track: mongoose.Types.ObjectId | string;
  artist: mongoose.Types.ObjectId | string;
  datetime: Date;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;
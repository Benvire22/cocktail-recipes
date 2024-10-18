import express from 'express';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import Cocktail from '../models/Cocktail';
import { imageUpload } from '../multer';
import authSimple from '../middleware/authSimple';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', authSimple, async (req: RequestWithUser, res, next) => {
  try {
    const currentUser = req.user;
    const { user } = req.query;

    if (currentUser && user !== '') {
      const cocktails = await Cocktail.find(
        currentUser
          ? { user: currentUser._id }
          : { isPublished: true }).populate('user', '_id displayName');

      return res.send(cocktails);
    }

    const cocktails = await Cocktail.find(
      currentUser?.role === 'admin'
        ? {}
        : { isPublished: true }).populate('user', '_id displayName');

    return res.send(cocktails);
  } catch (e) {
    return next(e);
  }
});

cocktailsRouter.get('/:id', authSimple, async (req: RequestWithUser, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: 'Invalid cocktail ID' });
    }

    const user = req.user;

    const cocktail = await Cocktail.findOne({ _id: req.params.id }).populate('user', '_id displayName');

    if (user?._id === cocktail?.user || user?.role === 'admin') {
      return res.send(cocktail);
    }

    if (!cocktail || !cocktail.isPublished) {
      return res.status(400).send({ error: 'Cocktail not found!' });
    }

    return res.send(cocktail);
  } catch (e) {
    return next(e);
  }
});

cocktailsRouter.post('/', auth, permit('user', 'admin'), imageUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({ error: 'Wrong token!' });
    }

    if (!req.body.title || !req.body.recipe || !req.file || req.body.ingredients.length < 1) {
      return res.status(400).send({ error: 'All fields are required!' });
    }

    const cocktail = new Cocktail({
      user: req.user,
      title: req.body.title,
      recipe: req.body.recipe,
      image: req.file.filename,
      ingredients: JSON.parse(req.body.ingredients),
    });

    await cocktail.save();
    return res.send(cocktail);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({ error: 'Wrong token!' });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: 'Invalid cocktail ID!' });
    }

    const editedCocktail = await Cocktail.findById(req.params.id);

    if (!editedCocktail) {
      return res.status(400).send({ error: 'Cocktail not found!' });
    }

    editedCocktail.isPublished = !editedCocktail.isPublished;
    editedCocktail.save();

    return res.send(editedCocktail);
  } catch (e) {
    return next(e);
  }
});

cocktailsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).send({ error: 'Wrong token!' });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ error: 'Invalid cocktail ID!' });
    }

    const deletedCocktail = await Cocktail.findByIdAndDelete(req.params.id);


    if (!deletedCocktail) {
      return res.status(400).send({ error: 'Cocktail not found!' });
    }

    return res.send({ message: 'Cocktail deleted successfully!' });
  } catch (e) {
    return next(e);
  }
});

export default cocktailsRouter;

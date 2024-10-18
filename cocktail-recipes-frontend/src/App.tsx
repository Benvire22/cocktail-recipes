import { Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import Register from './features/users/Register';
import Login from './features/users/Login';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import Cocktails from './features/cocktails/Cocktails';
import NewCocktail from './features/cocktails/NewCocktail';
import OneCocktail from './features/cocktails/OneCocktail';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Cocktails />} />
          <Route
            path="/cocktails/:id"
            element={
              <ProtectedRoute isAllowed={user && (user.role === 'user' || user.role === 'admin')}>
                <OneCocktail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-cocktails"
            element={
              <ProtectedRoute isAllowed={user && (user.role === 'user' || user.role === 'admin')}>
                <Cocktails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cocktails/new"
            element={
              <ProtectedRoute isAllowed={user && (user.role === 'user' || user.role === 'admin')}>
                <NewCocktail />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;

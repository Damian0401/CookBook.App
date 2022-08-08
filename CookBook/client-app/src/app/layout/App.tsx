import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import HomePage from '../../features/home/HomePage';
import RecipeDashboard from '../../features/recipes/dashboard/RecipeDashboard';
import RecipeDetails from '../../features/recipes/details/RecipeDetails';
import RecipeForm from '../../features/recipes/form/RecipeForm';
import NavBar from './NavBar';
import './styles.css';

function App() {

  let location = useLocation();

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='recipes' element={<NavBar />}>
          <Route index element={<RecipeDashboard />} />
          <Route path='details/:id' element={<RecipeDetails />} />
          <Route path='manage'>
            <Route key={location.key} index element={<RecipeForm />} />
            <Route key={location.key} path=':id' element={<RecipeForm />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
          <Route path="*" element={<NotFound content={<HomePage />} />} />
      </Routes>
    </>
  )
}

export default App;

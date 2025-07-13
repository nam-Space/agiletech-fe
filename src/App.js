
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import ProfilePage from 'pages/ProfilePage';
import TagsPage from 'pages/TagsPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "/login",
          element:
            <LoginPage />
        },
        {
          path: "/register",
          element:
            <RegisterPage />
        },
        {
          path: "/profile",
          element:
            <ProfilePage />
        },
        {
          path: "/tag",
          element:
            <TagsPage />
        },
      ],
    },
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;

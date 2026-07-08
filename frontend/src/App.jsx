import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { router } from './routes';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
        <Toaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
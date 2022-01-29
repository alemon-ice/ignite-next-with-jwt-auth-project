import { SignOutButton } from '../components/SignOutButton';
import { AuthProvider } from '../context/AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SignOutButton />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

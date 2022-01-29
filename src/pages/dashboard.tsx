import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api
      .get('/me')
      .then((response) => console.log({ response }))
      .catch((err) => console.log({ err }));
  }, []);

  return (
    <>
      <div>{user?.email}</div>
      <h1>Dashboard</h1>
    </>
  );
}

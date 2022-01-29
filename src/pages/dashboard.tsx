import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

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

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  await apiClient.get('/me').then((response) => console.log({ response }));

  return {
    props: {},
  };
});

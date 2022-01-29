import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Can } from './Can';

export function SignOutButton() {
  const { signOut } = useContext(AuthContext);

  return (
    <Can permissions={[]} roles={[]}>
      <button type="button" onClick={signOut}>
        Sair
      </button>
    </Can>
  );
}

import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import decode from 'jwt-decode';
import { AuthTokenError } from '../errors/AuthTokenError';
import { validateUserPermissions } from './validateUserPermissions';

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

interface WithSSROptions {
  permissions?: string[];
  roles?: string[];
}

export function withSSRAuth<T>(
  fn: GetServerSideProps<T>,
  options: WithSSROptions
): GetServerSideProps {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['nextauth.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    if (options) {
      const user = decode<User>(token);

      const userHasValidPermissions = validateUserPermissions({
        user,
        permissions: options.permissions,
        roles: options.roles,
      });

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false,
          },
        };
      }
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'nextauth.token');
        destroyCookie(ctx, 'nextauth.refreshToken');

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }
  };
}

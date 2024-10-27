'use server';

import { currentUser } from '@clerk/nextjs/server';

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, body: { error: 'Unauthorized' } };
    }
  } catch (error) {
    return { status: 500, body: { error: (error as Error).message } };
  }
};

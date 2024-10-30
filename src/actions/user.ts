'use server';

import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export const onAuthenticateUser = async () => {
  try {
    // Log to see when the function starts
    console.log('🟢 Starting authentication process');

    // Retrieve the current user
    const user = await currentUser();
    if (!user) {
      console.log('🔴 No user found. Returning 403 status.');
      return { status: 403 };
    }
    console.log('🟢 Current user retrieved:', user);

    // Check if the user already exists in the database
    const userExist = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
      },
    });

    if (userExist) {
      console.log('🟢 User already exists in the database:', userExist);
      return { status: 200, user: userExist };
    }

    // If user doesn't exist, create a new user
    console.log('🔵 User not found in database. Creating new user...');
    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: 'PERSONAL',
          },
        },
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (newUser) {
      console.log('🟢 New user created successfully:', newUser);
      return { status: 201, user: newUser };
    }

    // If something went wrong with the creation process
    console.log('🔴 Failed to create new user. Returning 400 status.');
    return { status: 400 };
  } catch (error) {
    console.log('🔴 ERROR during authentication process:', error);
    return { status: 500 };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const notifications = await client.user.findUnique({
      where: { clerkid: user.id },
      select: {
        notifications: true,
        _count: {
          select: {
            notifications: true,
          },
        },
      },
    });

    if (notifications && notifications.notifications.length > 0) {
      return { status: 200, data: notifications };
    }
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 404, data: [] };
  }
};

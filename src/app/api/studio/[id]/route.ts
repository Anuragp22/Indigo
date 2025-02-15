import { client } from '@/lib/prisma';
import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params; // Only change: await `context.params`
  console.log('Endpoint hit ✅');

  try {
    // Look up the user in your database by their clerk id.
    const userProfile = await client.user.findUnique({
      where: {
        clerkid: id,
      },
      include: {
        studio: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (userProfile) {
      return NextResponse.json({ status: 200, user: userProfile });
    }

    // Use the clerkClient to fetch the user if not found in your DB.
    const clerk = await clerkClient();
    const clerkUserInstance = await clerk.users.getUser(id);

    // Create a new user in your database using data from the clerk user.
    const createUser = await client.user.create({
      data: {
        clerkid: id,
        email: clerkUserInstance.emailAddresses[0].emailAddress,
        firstname: clerkUserInstance.firstName,
        lastname: clerkUserInstance.lastName,
        studio: {
          create: {},
        },
        workspace: {
          create: {
            name: `${clerkUserInstance.firstName}'s Workspace`,
            type: 'PERSONAL',
          },
        },
        subscription: {
          create: {},
        },
      },
      include: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (createUser) {
      return NextResponse.json({ status: 201, user: createUser });
    }

    return NextResponse.json({ status: 400 });
  } catch (error) {
    console.error('ERROR', error);
    return NextResponse.json({ status: 500, error: 'Internal Server Error' });
  }
}

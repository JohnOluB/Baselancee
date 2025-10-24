import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Find user by email
    // const user = await db.user.findUnique({ where: { email } });
    
    // Mock user for example
    const user = {
      id: '123',
      email: email,
      passwordHash: '$2a$10$...', // hashed password
      roles: ['freelancer', 'client'], // User has both roles
      name: 'John Doe'
    };

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Create session/JWT
    // const token = jwt.sign({ userId: user.id }, SECRET);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles,
      },
      // token
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
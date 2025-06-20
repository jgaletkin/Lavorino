import { NextResponse } from 'next/server'

export const dynamic = 'force-static'
export const revalidate = false

export async function POST(): Promise<NextResponse> {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' })
  
  // Clear the auth cookie
  response.cookies.set('user', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0
  })
  
  return response
} 
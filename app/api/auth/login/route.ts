import { NextRequest, NextResponse } from 'next/server'

export async function POST() {
  try {
    // Mock authentication logic
    return NextResponse.json({
      success: true,
      user: {
        id: '1',
        email: 'demo@demo.com',
        name: 'Demo User',
        role: 'provider'
      }
    })
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('user')
  return response
} 
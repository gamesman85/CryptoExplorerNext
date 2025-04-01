import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:3001/api/crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.text) {
      return NextResponse.json(
        { error: 'Text is required' }, 
        { status: 400 }
      );
    }
    
    // Validate algorithm
    if (!['aes-256-cbc', 'sha256', 'md5', 'base64'].includes(body.algorithm)) {
      return NextResponse.json(
        { error: 'Unsupported algorithm' },
        { status: 400 }
      );
    }
    
    // Check if key is required but not provided
    if (body.algorithm === 'aes-256-cbc' && !body.key) {
      return NextResponse.json(
        { error: 'Key is required for AES encryption/decryption' },
        { status: 400 }
      );
    }
    
    // Forward request to backend
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
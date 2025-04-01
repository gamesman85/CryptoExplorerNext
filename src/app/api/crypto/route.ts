import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, algorithm, operation, key } = body;

    // Validation
    if (!text || !algorithm || !operation) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // If encryption/decryption algorithms are selected, key is required
    if (algorithm === 'aes-256-cbc' && !key) {
      return NextResponse.json(
        { error: 'Secret key is required for AES encryption/decryption' },
        { status: 400 }
      );
    }

    let result = '';

    // Process based on algorithm and operation
    switch (algorithm) {
      case 'aes-256-cbc':
        if (operation === 'encrypt') {
          result = encryptAES(text, key);
        } else {
          result = decryptAES(text, key);
        }
        break;
      case 'sha-256':
        result = hashSHA256(text);
        break;
      case 'md5':
        result = hashMD5(text);
        break;
      case 'base64':
        if (operation === 'encrypt') {
          result = encodeBase64(text);
        } else {
          result = decodeBase64(text);
        }
        break;
      default:
        return NextResponse.json(
          { error: 'Unsupported algorithm' },
          { status: 400 }
        );
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error processing crypto operation:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// Crypto functions
function encryptAES(text: string, key: string): string {
  // Create a key of exactly 32 bytes (256 bits) by hashing the provided key
  const hash = crypto.createHash('sha256').update(key).digest();
  
  // Generate a random initialization vector
  const iv = crypto.randomBytes(16);
  
  // Create cipher with key and iv
  const cipher = crypto.createCipheriv('aes-256-cbc', hash, iv);
  
  // Encrypt the text
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  
  // Return iv and encrypted data
  return iv.toString('hex') + ':' + encrypted;
}

function decryptAES(encryptedText: string, key: string): string {
  try {
    // Split iv and encrypted data
    const textParts = encryptedText.split(':');
    if (textParts.length !== 2) {
      return 'Invalid encrypted text format';
    }
    
    const iv = Buffer.from(textParts[0], 'hex');
    const encryptedData = textParts[1];
    
    // Create a key of exactly 32 bytes (256 bits) by hashing the provided key
    const hash = crypto.createHash('sha256').update(key).digest();
    
    // Create decipher with key and iv
    const decipher = crypto.createDecipheriv('aes-256-cbc', hash, iv);
    
    // Decrypt the text
    let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch {
    return 'Failed to decrypt: Invalid encrypted text or key';
  }
}

function hashSHA256(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}

function hashMD5(text: string): string {
  return crypto.createHash('md5').update(text).digest('hex');
}

function encodeBase64(text: string): string {
  return Buffer.from(text).toString('base64');
}

function decodeBase64(text: string): string {
  try {
    return Buffer.from(text, 'base64').toString('utf8');
  } catch {
    return 'Failed to decode: Invalid Base64 string';
  }
}
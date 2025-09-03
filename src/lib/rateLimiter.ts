// Simple in-memory rate limiter
interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export function checkRateLimit(
  identifier: string, 
  maxRequests: number = 5, 
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const key = identifier
  
  // Clean up expired entries
  for (const [k, v] of rateLimitStore.entries()) {
    if (now > v.resetTime) {
      rateLimitStore.delete(k)
    }
  }
  
  const entry = rateLimitStore.get(key)
  
  if (!entry) {
    // First request
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    })
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs
    }
  }
  
  if (now > entry.resetTime) {
    // Window expired, reset
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    })
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs
    }
  }
  
  if (entry.count >= maxRequests) {
    // Rate limit exceeded
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime
    }
  }
  
  // Increment counter
  entry.count++
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime
  }
}

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (cfConnectingIP) return cfConnectingIP
  if (realIP) return realIP
  if (forwarded) return forwarded.split(',')[0].trim()
  
  return 'unknown'
}

// Enhanced in-memory rate limiter with multiple tiers and better tracking
interface RateLimitEntry {
  count: number
  resetTime: number
  lastRequest: number
  suspicious: boolean
  blocked: boolean
  blockUntil?: number
}

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
  suspiciousThreshold: number
  blockDuration: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Different rate limits for different types of requests
const RATE_LIMITS = {
  booking: { maxRequests: 5, windowMs: 15 * 60 * 1000, suspiciousThreshold: 3, blockDuration: 60 * 60 * 1000 }, // 5 requests per 15 min
  general: { maxRequests: 20, windowMs: 15 * 60 * 1000, suspiciousThreshold: 10, blockDuration: 30 * 60 * 1000 }, // 20 requests per 15 min
  admin: { maxRequests: 50, windowMs: 15 * 60 * 1000, suspiciousThreshold: 25, blockDuration: 15 * 60 * 1000 } // 50 requests per 15 min
} as const

export function checkRateLimit(
  identifier: string, 
  type: keyof typeof RATE_LIMITS = 'general',
  customConfig?: Partial<RateLimitConfig>
): { allowed: boolean; remaining: number; resetTime: number; isSuspicious: boolean; isBlocked: boolean } {
  const now = Date.now()
  const config = { ...RATE_LIMITS[type], ...customConfig }
  const key = `${type}:${identifier}`
  
  // Clean up expired entries periodically
  if (Math.random() < 0.1) { // 10% chance to clean up
    cleanupExpiredEntries(now)
  }
  
  const entry = rateLimitStore.get(key)
  
  // Check if currently blocked
  if (entry?.blocked && entry.blockUntil && now < entry.blockUntil) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.blockUntil,
      isSuspicious: entry.suspicious,
      isBlocked: true
    }
  }
  
  if (!entry) {
    // First request
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
      lastRequest: now,
      suspicious: false,
      blocked: false
    })
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
      isSuspicious: false,
      isBlocked: false
    }
  }
  
  if (now > entry.resetTime) {
    // Window expired, reset
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
      lastRequest: now,
      suspicious: false,
      blocked: false
    })
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
      isSuspicious: false,
      isBlocked: false
    }
  }
  
  if (entry.count >= config.maxRequests) {
    // Rate limit exceeded - mark as suspicious
    entry.suspicious = true
    entry.blocked = true
    entry.blockUntil = now + config.blockDuration
    
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      isSuspicious: true,
      isBlocked: true
    }
  }
  
  // Check for suspicious behavior (rapid requests)
  const timeSinceLastRequest = now - entry.lastRequest
  if (timeSinceLastRequest < 1000 && entry.count >= config.suspiciousThreshold) { // Less than 1 second between requests
    entry.suspicious = true
  }
  
  // Increment counter
  entry.count++
  entry.lastRequest = now
  
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
    isSuspicious: entry.suspicious,
    isBlocked: false
  }
}

function cleanupExpiredEntries(now: number): void {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime && (!entry.blockUntil || now > entry.blockUntil)) {
      rateLimitStore.delete(key)
    }
  }
}

// Get rate limit status for an identifier
export function getRateLimitStatus(identifier: string, type: keyof typeof RATE_LIMITS = 'general') {
  const key = `${type}:${identifier}`
  const entry = rateLimitStore.get(key)
  
  if (!entry) {
    return { isBlocked: false, isSuspicious: false, remaining: RATE_LIMITS[type].maxRequests }
  }
  
  const now = Date.now()
  const isBlocked = entry.blocked && entry.blockUntil ? now < entry.blockUntil : false
  const isExpired = now > entry.resetTime
  
  return {
    isBlocked,
    isSuspicious: entry.suspicious,
    remaining: isExpired ? RATE_LIMITS[type].maxRequests : Math.max(0, RATE_LIMITS[type].maxRequests - entry.count),
    resetTime: entry.resetTime,
    blockUntil: entry.blockUntil
  }
}

// Reset rate limit for an identifier (admin function)
export function resetRateLimit(identifier: string, type: keyof typeof RATE_LIMITS = 'general'): boolean {
  const key = `${type}:${identifier}`
  return rateLimitStore.delete(key)
}

// Get all blocked IPs (admin function)
export function getBlockedIPs(): Array<{ identifier: string; type: string; blockUntil: number; isSuspicious: boolean }> {
  const now = Date.now()
  const blocked: Array<{ identifier: string; type: string; blockUntil: number; isSuspicious: boolean }> = []
  
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.blocked && entry.blockUntil && now < entry.blockUntil) {
      const [type, identifier] = key.split(':', 2)
      blocked.push({
        identifier,
        type,
        blockUntil: entry.blockUntil,
        isSuspicious: entry.suspicious
      })
    }
  }
  
  return blocked
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

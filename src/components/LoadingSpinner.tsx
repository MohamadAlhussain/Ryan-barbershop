interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'amber' | 'white' | 'gray'
}

export default function LoadingSpinner({ size = 'md', color = 'amber' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const colorClasses = {
    amber: 'border-amber-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent'
  }

  return (
    <div className={`${sizeClasses[size]} border-4 ${colorClasses[color]} rounded-full animate-spin`}></div>
  )
}

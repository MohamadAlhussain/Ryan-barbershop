interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'amber' | 'white' | 'gray'
  text?: string
  fullScreen?: boolean
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'amber', 
  text,
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const colorClasses = {
    amber: 'border-amber-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-400 border-t-transparent'
  }

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizeClasses[size]} border-4 ${colorClasses[color]} rounded-full animate-spin`}></div>
      {text && (
        <p className="text-sm text-gray-400 animate-pulse">{text}</p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}

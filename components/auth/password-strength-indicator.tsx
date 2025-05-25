interface PasswordStrengthIndicatorProps {
  strength: number // 0-4 scale
}

export default function PasswordStrengthIndicator({ strength }: PasswordStrengthIndicatorProps) {
  const getStrengthText = () => {
    switch (strength) {
      case 0:
        return "Weak"
      case 1:
        return "Fair"
      case 2:
        return "Good"
      case 3:
        return "Strong"
      case 4:
        return "Very Strong"
      default:
        return "Weak"
    }
  }

  const getStrengthColor = () => {
    switch (strength) {
      case 0:
        return "bg-red-500"
      case 1:
        return "bg-orange-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-green-500"
      case 4:
        return "bg-emerald-500"
      default:
        return "bg-red-500"
    }
  }

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <div className="flex space-x-1">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`h-1 w-6 rounded-full ${index < strength ? getStrengthColor() : "bg-[#3D4A5C]"}`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-400">{getStrengthText()}</span>
      </div>
      <p className="text-xs text-gray-500">
        Use 8+ characters with a mix of uppercase, lowercase, numbers, and symbols
      </p>
    </div>
  )
}

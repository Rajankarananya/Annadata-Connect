export function AsyncButton({
  children,
  isLoading = false,
  disabled = false,
  loadingText = 'Please wait... ',
  className = '',
  type = 'button',
  onClick,
}) {
  const isDisabled = disabled || isLoading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={isLoading}
      className={`${className} min-h-[44px] disabled:cursor-not-allowed disabled:opacity-60`.trim()}
    >
      {isLoading ? loadingText : children}
    </button>
  )
}

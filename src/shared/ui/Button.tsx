import { forwardRef } from 'react'

const variantStyles = {
  primary:
    'bg-aqxBlue text-white shadow-sm hover:bg-aqxBlue/90 disabled:bg-aqxBorder disabled:text-aqxTextSecondary',
  secondary:
    'border border-transparent text-aqxTextSecondary hover:border-aqxBlue/30 hover:bg-white',
  secondaryActive: 'bg-aqxBlue text-white shadow-sm font-semibold',
  ghost:
    'border border-aqxBorder text-aqxTextSecondary hover:opacity-80 disabled:opacity-40',
} as const

type ButtonVariant = keyof typeof variantStyles

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  variant?: ButtonVariant
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', type = 'button', className = '', ...props }, ref) => {
    const base =
      'cursor-pointer rounded-full px-4 py-1 text-sm transition disabled:cursor-default focus:outline-none focus:ring-2 focus:ring-aqxBlue focus:ring-offset-2'
    return (
      <button
        ref={ref}
        type={type}
        className={`${base} ${variantStyles[variant]} ${className}`.trim()}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

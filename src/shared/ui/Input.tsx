import { forwardRef, type ReactNode } from 'react'

const baseInputStyles =
  'w-full rounded-full border border-aqxBorder bg-aqxBg py-2.5 pr-4 text-sm text-aqxTextPrimary placeholder:text-aqxTextSecondary focus:border-aqxBlue focus:outline-none focus:ring-2 focus:ring-aqxBlue/10'

type InputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'className'> & {
  startAdornment?: ReactNode
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ startAdornment, className = '', ...props }, ref) => {
    const hasAdornment = Boolean(startAdornment)
    return (
      <label className="relative block">
        {hasAdornment && (
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-aqxTextSecondary">
            {startAdornment}
          </span>
        )}
        <input
          ref={ref}
          className={`${baseInputStyles} ${hasAdornment ? 'pl-11' : 'pl-4'} ${className}`.trim()}
          {...props}
        />
      </label>
    )
  },
)

Input.displayName = 'Input'

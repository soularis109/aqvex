import { forwardRef } from 'react'

const baseSelectStyles =
  'h-10 w-full rounded-full border border-aqxBorder bg-white px-4 py-2 text-sm text-aqxTextPrimary shadow-sm focus:border-aqxBlue focus:outline-none focus:ring-2 focus:ring-aqxBlue/10 disabled:opacity-60 disabled:cursor-not-allowed'

type SelectProps = React.ComponentPropsWithoutRef<'select'>

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', ...props }, ref) => (
    <select
      ref={ref}
      className={`${baseSelectStyles} ${className}`.trim()}
      {...props}
    />
  ),
)

Select.displayName = 'Select'

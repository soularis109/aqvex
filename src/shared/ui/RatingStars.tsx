interface RatingStarsProps {
  rating: number
  reviewsCount: number
}

export function RatingStars({ rating, reviewsCount }: RatingStarsProps) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5

  return (
    <div className="flex items-center gap-2 text-xs text-aqxTextSecondary">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => {
          const starIndex = index + 1
          let fill = 'none'
          if (starIndex <= fullStars) fill = 'currentColor'
          else if (starIndex === fullStars + 1 && hasHalf) fill = 'url(#half)'

          return (
            <svg
              key={starIndex}
              className="h-4 w-4 text-yellow-400"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              {fill === 'url(#half)' && (
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              )}
              <path
                fill={fill}
                stroke="currentColor"
                strokeWidth="1"
                d="M10 1.5l2.39 4.84 5.34.78-3.86 3.76.91 5.32L10 13.9l-4.78 2.5.91-5.32-3.86-3.76 5.34-.78L10 1.5z"
              />
            </svg>
          )
        })}
      </div>
      <span className="font-medium text-aqxTextPrimary">
        {rating.toFixed(1)}
      </span>
      <span>({reviewsCount})</span>
    </div>
  )
}

export default RatingStars

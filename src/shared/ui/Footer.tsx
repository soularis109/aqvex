export function Footer() {
  return (
    <footer className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-aqxBorder pt-6 text-xs text-aqxTextSecondary sm:flex-row">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold tracking-[0.12em] text-aqxBlue uppercase">
          AQVEX
        </span>
        <span>© 2026 | Все права защищены</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span>Visa</span>
        <span>Mastercard</span>
        <span>Apple Pay</span>
        <span>Google Pay</span>
      </div>
    </footer>
  )
}

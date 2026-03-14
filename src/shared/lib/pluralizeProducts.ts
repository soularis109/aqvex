/**
 * Russian pluralization for "товар":
 * - 1, 21, 31... → товар
 * - 2-4, 22-24, 32-34... → товара
 * - 0, 5-20, 25-30... → товаров
 */
export function pluralizeProducts(total: number): string {
  const mod10 = total % 10
  const mod100 = total % 100

  const suffix =
    mod10 === 1 && mod100 !== 11
      ? ''
      : mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)
        ? 'а'
        : 'ов'

  return `${total} товар${suffix}`
}

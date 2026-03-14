import { describe, it, expect } from 'vitest'
import { pluralizeProducts } from './pluralizeProducts'

describe('pluralizeProducts', () => {
  it('returns "1 товар" for total 1', () => {
    expect(pluralizeProducts(1)).toBe('1 товар')
  })

  it('returns "2 товара" for total 2', () => {
    expect(pluralizeProducts(2)).toBe('2 товара')
  })

  it('returns "4 товара" for total 4', () => {
    expect(pluralizeProducts(4)).toBe('4 товара')
  })

  it('returns "5 товаров" for total 5', () => {
    expect(pluralizeProducts(5)).toBe('5 товаров')
  })

  it('returns "11 товаров" for total 11', () => {
    expect(pluralizeProducts(11)).toBe('11 товаров')
  })

  it('returns "21 товар" for total 21', () => {
    expect(pluralizeProducts(21)).toBe('21 товар')
  })

  it('returns "0 товаров" for total 0', () => {
    expect(pluralizeProducts(0)).toBe('0 товаров')
  })

  it('returns "12 товаров" for total 12', () => {
    expect(pluralizeProducts(12)).toBe('12 товаров')
  })

  it('returns "13 товаров" for total 13', () => {
    expect(pluralizeProducts(13)).toBe('13 товаров')
  })

  it('returns "14 товаров" for total 14', () => {
    expect(pluralizeProducts(14)).toBe('14 товаров')
  })

  it('returns "22 товара" for total 22', () => {
    expect(pluralizeProducts(22)).toBe('22 товара')
  })

  it('returns "23 товара" for total 23', () => {
    expect(pluralizeProducts(23)).toBe('23 товара')
  })

  it('returns "24 товара" for total 24', () => {
    expect(pluralizeProducts(24)).toBe('24 товара')
  })
})

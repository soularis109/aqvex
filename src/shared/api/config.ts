const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined

if (!baseUrl) {
  // Для дев-режиму можна залишити попереджання, щоб не падати миттєво
  console.warn(
    'VITE_API_BASE_URL is not set. Falling back to default AQVEX API URL.',
  )
}

const normalizedBase = (
  baseUrl ?? 'https://ip-194-99-21-145-139178.vps.hosted-by-mvps.net/api/v1'
).replace(/\/+$/, '')

export const API_BASE_URL = normalizedBase
export const PRODUCTS_URL = `${API_BASE_URL}/products`

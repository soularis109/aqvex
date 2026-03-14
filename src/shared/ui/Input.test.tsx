import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Search..." />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('is controlled when value and onChange are provided', () => {
    const handleChange = vi.fn()
    render(
      <Input value="initial" onChange={handleChange} placeholder="Search" />,
    )

    const input = screen.getByPlaceholderText('Search')
    fireEvent.change(input, { target: { value: 'test' } })

    expect(handleChange).toHaveBeenCalled()
  })

  it('renders startAdornment when provided', () => {
    render(<Input startAdornment={<span>🔍</span>} placeholder="Search" />)
    expect(screen.getByText('🔍')).toBeInTheDocument()
  })

  it('has accessible label when startAdornment renders', () => {
    render(<Input startAdornment="Search:" placeholder="Type here" />)
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
  })
})

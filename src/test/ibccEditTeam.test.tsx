import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import MyTeamPage from '@/pages/user/MyTeamPage'
import { ibccService, type MyTeam } from '@/services/ibcc'

const mockSetUser = vi.fn()
const mockAuthUser = { id: 12, email: 'leader@ui.ac.id', name: 'John Doe', role: 'USER' }

const mockAuthValue = {
  user: mockAuthUser,
  loading: false,
  sessionExpired: false,
  setUser: mockSetUser,
  logout: vi.fn(),
}

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => mockAuthValue,
  useOptionalAuth: () => mockAuthValue,
}))

vi.mock('@/components/landing/Footer', () => ({
  default: () => <footer data-testid="footer" />,
}))

const sampleTeam = (isLeader: boolean): MyTeam => ({
  id: 42,
  name: 'The Innovators',
  code: 'MYR6JD',
  status: 'PRELIMINARY_SUBMITTED',
  isLeader,
  competitionStage: 'PREELIM',
  payment: {
    status: 'PENDING_VERIFICATION',
    isUploaded: true,
    submittedAt: '2026-10-15T10:00:00.000Z',
  },
  selectionResult: {
    isAnnounced: false,
    isQualified: false,
    announcementMessage: null,
  },
  leader: {
    id: 12,
    name: 'John Doe',
    email: 'leader@ui.ac.id',
    whatsapp: '081234567890',
    institution: 'Universitas Indonesia',
    major: 'Management',
    yearOfStudy: '2nd year',
  },
  members: [
    {
      id: 15,
      name: 'Jane Doe',
      email: 'jane@ui.ac.id',
      whatsapp: '081298765432',
      institution: 'Universitas Indonesia',
      major: 'Accounting',
      yearOfStudy: '3rd year',
    },
  ],
  submissions: {
    requirementsCompleted: true,
    paymentSubmitted: true,
    paymentSubmittedAt: '2026-10-15T10:00:00.000Z',
    preliminaryOutputSubmitted: true,
    preliminarySubmittedAt: '2026-10-15T10:30:00.000Z',
  },
})

describe('MyTeamPage Edit Details flow', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    mockSetUser.mockClear()
  })

  it('hides Edit Details buttons when viewer is not the team leader', async () => {
    vi.spyOn(ibccService, 'getMyTeam').mockResolvedValue(sampleTeam(false))

    render(
      <MemoryRouter>
        <MyTeamPage />
      </MemoryRouter>,
    )

    await screen.findByText('The Innovators')
    expect(screen.queryByRole('button', { name: 'Edit Details' })).not.toBeInTheDocument()
  })

  it('pre-fills existing DB details, locks team name and email, and patches member updates', async () => {
    const initial = sampleTeam(true)
    const updated: MyTeam = {
      ...initial,
      members: [
        {
          ...initial.members[0],
          name: 'Jane Updated',
          whatsapp: '08111222333',
          institution: 'Institut Teknologi Bandung',
          major: 'Finance',
          yearOfStudy: '4th year',
        },
      ],
    }

    vi.spyOn(ibccService, 'getMyTeam').mockResolvedValue(initial)
    const updateSpy = vi.spyOn(ibccService, 'updateMyTeam').mockResolvedValue(updated)

    render(
      <MemoryRouter>
        <MyTeamPage />
      </MemoryRouter>,
    )

    const editButtons = await screen.findAllByRole('button', { name: 'Edit Details' })
    expect(editButtons).toHaveLength(2)

    fireEvent.click(editButtons[1])

    const teamNameInput = screen.getByLabelText('Team Name') as HTMLInputElement
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement
    const fullNameInput = screen.getByLabelText(/Full Name/i) as HTMLInputElement
    const whatsappInput = screen.getByLabelText(/WhatsApp Number/i) as HTMLInputElement
    const institutionInput = screen.getByLabelText(/Institution/i) as HTMLInputElement
    const majorInput = screen.getByLabelText(/Major/i) as HTMLInputElement
    const thirdYearRadio = screen.getByRole('radio', { name: '3rd Year' }) as HTMLInputElement

    expect(teamNameInput).toBeDisabled()
    expect(teamNameInput.value).toBe('The Innovators')
    expect(emailInput).toBeDisabled()
    expect(emailInput.value).toBe('jane@ui.ac.id')
    expect(fullNameInput.value).toBe('Jane Doe')
    expect(whatsappInput.value).toBe('081298765432')
    expect(institutionInput.value).toBe('Universitas Indonesia')
    expect(majorInput.value).toBe('Accounting')
    expect(thirdYearRadio.checked).toBe(true)

    fireEvent.change(fullNameInput, { target: { value: 'Jane Updated' } })
    fireEvent.change(whatsappInput, { target: { value: '\u200E08111222333' } })
    fireEvent.change(institutionInput, { target: { value: 'Institut Teknologi Bandung' } })
    fireEvent.change(majorInput, { target: { value: 'Finance' } })
    fireEvent.click(screen.getByRole('radio', { name: '4th Year' }))
    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }))

    await waitFor(() => {
      expect(updateSpy).toHaveBeenCalledWith({
        members: [
          {
            userId: 15,
            fullName: 'Jane Updated',
            whatsapp: '08111222333',
            institution: 'Institut Teknologi Bandung',
            major: 'Finance',
            yearOfStudy: '4th year',
          },
        ],
      })
    })

    await screen.findByText('Jane Updated')
    expect(mockSetUser).not.toHaveBeenCalled()
  })

  it('patches leader details and syncs AuthContext user name', async () => {
    const initial = sampleTeam(true)
    const updated: MyTeam = {
      ...initial,
      leader: {
        ...initial.leader,
        name: 'Muhammad Azka',
      },
    }

    vi.spyOn(ibccService, 'getMyTeam').mockResolvedValue(initial)
    const updateSpy = vi.spyOn(ibccService, 'updateMyTeam').mockResolvedValue(updated)

    render(
      <MemoryRouter>
        <MyTeamPage />
      </MemoryRouter>,
    )

    const editButtons = await screen.findAllByRole('button', { name: 'Edit Details' })
    fireEvent.click(editButtons[0])

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Muhammad Azka' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }))

    await waitFor(() => {
      expect(updateSpy).toHaveBeenCalledWith({
        leader: {
          fullName: 'Muhammad Azka',
          whatsapp: '081234567890',
          institution: 'Universitas Indonesia',
          major: 'Management',
          yearOfStudy: '2nd year',
        },
      })
    })

    expect(mockSetUser).toHaveBeenCalledWith({ ...mockAuthUser, name: 'Muhammad Azka' })
    await screen.findByText('Muhammad Azka')
  })
})

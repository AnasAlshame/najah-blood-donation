import { DonorRegistrationInput, IDonor, BloodType } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiService = {
  // Public: Register donor
  async registerDonor(data: DonorRegistrationInput): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/donors/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Admin Auth
  async loginAdmin(credentials: { usernameOrEmail: string; password: string }) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return res.json();
  },

  async registerAdmin(data: { username: string; fullName: string; email: string; password: string; passcode: string }) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Admin: Get donors with filters
  async getDonors(
    token: string,
    params: {
      bloodType?: string;
      matchCompatible?: boolean;
      faculty?: string;
      city?: string;
      status?: string;
      search?: string;
    }
  ): Promise<{ success: boolean; count: number; data: IDonor[]; message?: string }> {
    const query = new URLSearchParams();
    if (params.bloodType) query.append('bloodType', params.bloodType);
    if (params.matchCompatible) query.append('matchCompatible', 'true');
    if (params.faculty) query.append('faculty', params.faculty);
    if (params.city) query.append('city', params.city);
    if (params.status) query.append('status', params.status);
    if (params.search) query.append('search', params.search);

    const res = await fetch(`${API_BASE}/donors?${query.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.json();
  },

  // Admin: Update status
  async updateDonorStatus(
    token: string,
    id: string,
    update: { status?: string; lastDonationDate?: string; notes?: string }
  ) {
    const res = await fetch(`${API_BASE}/donors/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(update)
    });
    return res.json();
  },

  // Admin: Delete donor
  async deleteDonor(token: string, id: string) {
    const res = await fetch(`${API_BASE}/donors/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.json();
  }
};

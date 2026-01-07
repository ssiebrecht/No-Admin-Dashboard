/**
 * Mock Users Data
 * Mac OS 8/9 Classic User Management System
 */

import type { User } from '../types/user';

/**
 * Mock users for the admin dashboard
 */
export const mockUsers: User[] = [
  {
    id: 'user-1',
    username: 'sjobs',
    fullName: 'Steve Jobs',
    email: 'sjobs@apple.com',
    role: 'admin',
    createdAt: '1997-09-16T10:00:00.000Z',
    lastLogin: '2026-01-07T08:30:00.000Z',
    isActive: true,
  },
  {
    id: 'user-2',
    username: 'woz',
    fullName: 'Steve Wozniak',
    email: 'woz@apple.com',
    role: 'admin',
    createdAt: '1976-04-01T09:00:00.000Z',
    lastLogin: '2026-01-06T15:45:00.000Z',
    isActive: true,
  },
  {
    id: 'user-3',
    username: 'jive',
    fullName: 'Jony Ive',
    email: 'jive@apple.com',
    role: 'moderator',
    createdAt: '1992-09-01T10:00:00.000Z',
    lastLogin: '2026-01-05T12:00:00.000Z',
    isActive: true,
  },
  {
    id: 'user-4',
    username: 'tcook',
    fullName: 'Tim Cook',
    email: 'tcook@apple.com',
    role: 'moderator',
    createdAt: '1998-03-15T08:00:00.000Z',
    lastLogin: '2026-01-07T09:15:00.000Z',
    isActive: true,
  },
  {
    id: 'user-5',
    username: 'aforstall',
    fullName: 'Scott Forstall',
    email: 'aforstall@apple.com',
    role: 'user',
    createdAt: '1997-01-15T11:00:00.000Z',
    lastLogin: '2025-12-20T14:30:00.000Z',
    isActive: false,
  },
  {
    id: 'user-6',
    username: 'cruby',
    fullName: 'Craig Federighi',
    email: 'cruby@apple.com',
    role: 'user',
    createdAt: '1996-06-01T09:00:00.000Z',
    lastLogin: '2026-01-06T16:20:00.000Z',
    isActive: true,
  },
  {
    id: 'user-7',
    username: 'pschiller',
    fullName: 'Phil Schiller',
    email: 'pschiller@apple.com',
    role: 'user',
    createdAt: '1997-08-20T10:30:00.000Z',
    lastLogin: '2026-01-04T11:00:00.000Z',
    isActive: true,
  },
  {
    id: 'user-8',
    username: 'esue',
    fullName: 'Eddy Cue',
    email: 'esue@apple.com',
    role: 'user',
    createdAt: '1989-10-01T08:00:00.000Z',
    lastLogin: '2026-01-03T17:45:00.000Z',
    isActive: true,
  },
];

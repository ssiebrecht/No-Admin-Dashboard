/**
 * Mock Processes Data
 * Simulated process list for Activity Monitor
 */

import type { Process } from '../types/activity';

/**
 * Base mock processes representing typical system and user processes
 */
export const MOCK_PROCESSES: Process[] = [
  {
    id: 'proc-1',
    pid: 1,
    name: 'System',
    cpu: 2.5,
    memory: 1.2,
    memoryBytes: 125829120,
    user: 'root',
  },
  {
    id: 'proc-2',
    pid: 142,
    name: 'Dashboard App',
    cpu: 8.3,
    memory: 4.5,
    memoryBytes: 471859200,
    user: 'admin',
  },
  {
    id: 'proc-3',
    pid: 256,
    name: 'File Browser',
    cpu: 3.1,
    memory: 2.8,
    memoryBytes: 293601280,
    user: 'admin',
  },
  {
    id: 'proc-4',
    pid: 89,
    name: 'WindowServer',
    cpu: 12.4,
    memory: 6.2,
    memoryBytes: 649068544,
    user: 'root',
  },
  {
    id: 'proc-5',
    pid: 312,
    name: 'Finder',
    cpu: 1.8,
    memory: 3.1,
    memoryBytes: 324009984,
    user: 'admin',
  },
  {
    id: 'proc-6',
    pid: 445,
    name: 'Network Service',
    cpu: 0.5,
    memory: 0.8,
    memoryBytes: 83886080,
    user: 'daemon',
  },
  {
    id: 'proc-7',
    pid: 567,
    name: 'Database Server',
    cpu: 5.7,
    memory: 8.4,
    memoryBytes: 880803840,
    user: 'postgres',
  },
  {
    id: 'proc-8',
    pid: 678,
    name: 'Mail Daemon',
    cpu: 0.3,
    memory: 1.5,
    memoryBytes: 157286400,
    user: 'daemon',
  },
  {
    id: 'proc-9',
    pid: 789,
    name: 'Activity Monitor',
    cpu: 4.2,
    memory: 2.1,
    memoryBytes: 220200960,
    user: 'admin',
  },
  {
    id: 'proc-10',
    pid: 234,
    name: 'Control Panels',
    cpu: 1.1,
    memory: 1.9,
    memoryBytes: 199229440,
    user: 'admin',
  },
  {
    id: 'proc-11',
    pid: 901,
    name: 'Backup Service',
    cpu: 0.8,
    memory: 2.3,
    memoryBytes: 241172480,
    user: 'daemon',
  },
  {
    id: 'proc-12',
    pid: 1023,
    name: 'Print Spooler',
    cpu: 0.1,
    memory: 0.4,
    memoryBytes: 41943040,
    user: 'lp',
  },
];

/**
 * Generate randomized process data with realistic fluctuations
 */
export const generateRandomizedProcesses = (): Process[] => {
  return MOCK_PROCESSES.map((process) => ({
    ...process,
    cpu: Math.max(0, Math.min(100, process.cpu + (Math.random() - 0.5) * 3)),
    memory: Math.max(0, Math.min(100, process.memory + (Math.random() - 0.5) * 1)),
    memoryBytes: Math.max(0, process.memoryBytes + Math.round((Math.random() - 0.5) * 10485760)),
  }));
};

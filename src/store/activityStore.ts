/**
 * Activity Store - Zustand State Management
 * Mac OS 8/9 Classic Activity Monitor
 */

import { create } from 'zustand';
import type {
  Process,
  CPUStats,
  MemoryStats,
  DiskStats,
  NetworkStats,
} from '../types/activity';
import { generateRandomizedProcesses } from '../data/mockProcesses';

/**
 * Maximum history points (60 seconds at 1-second intervals)
 */
const MAX_HISTORY_POINTS = 60;

/**
 * Activity store state interface
 */
interface ActivityState {
  /** CPU statistics */
  cpu: CPUStats;
  /** Memory statistics */
  memory: MemoryStats;
  /** Disk statistics */
  disk: DiskStats;
  /** Network statistics */
  network: NetworkStats;
  
  /** CPU usage history (total %) */
  cpuHistory: number[];
  /** Memory usage history (used %) */
  memoryHistory: number[];
  /** Disk read speed history */
  diskReadHistory: number[];
  /** Disk write speed history */
  diskWriteHistory: number[];
  /** Network incoming speed history */
  networkInHistory: number[];
  /** Network outgoing speed history */
  networkOutHistory: number[];
  
  /** Running processes */
  processes: Process[];
}

/**
 * Activity store actions interface
 */
interface ActivityActions {
  /** Update all statistics */
  updateStats: (stats: {
    cpu: CPUStats;
    memory: MemoryStats;
    disk: DiskStats;
    network: NetworkStats;
  }) => void;
  
  /** Refresh process list */
  refreshProcesses: () => void;
  
  /** Reset all data */
  reset: () => void;
}

type ActivityStore = ActivityState & ActivityActions;

/**
 * Initial CPU stats
 */
const initialCPU: CPUStats = {
  system: 12,
  user: 25,
  idle: 63,
};

/**
 * Initial Memory stats (in MB)
 */
const initialMemory: MemoryStats = {
  used: 6144,
  wired: 1536,
  compressed: 512,
  cached: 2048,
  available: 2048,
  total: 8192,
};

/**
 * Initial Disk stats
 */
const initialDisk: DiskStats = {
  readSpeed: 45,
  writeSpeed: 23,
  used: 256,
  total: 512,
};

/**
 * Initial Network stats
 */
const initialNetwork: NetworkStats = {
  received: 128,
  sent: 64,
  totalReceived: 1024,
  totalSent: 512,
  packetsIn: 1234567,
  packetsOut: 987654,
};

/**
 * Add value to history array, maintaining max length
 */
const addToHistory = (history: number[], value: number): number[] => {
  const newHistory = [...history, value];
  if (newHistory.length > MAX_HISTORY_POINTS) {
    return newHistory.slice(-MAX_HISTORY_POINTS);
  }
  return newHistory;
};

/**
 * Activity Store Implementation
 */
export const useActivityStore = create<ActivityStore>((set) => ({
  // Initial state
  cpu: initialCPU,
  memory: initialMemory,
  disk: initialDisk,
  network: initialNetwork,
  
  cpuHistory: Array(MAX_HISTORY_POINTS).fill(initialCPU.system + initialCPU.user),
  memoryHistory: Array(MAX_HISTORY_POINTS).fill((initialMemory.used / initialMemory.total) * 100),
  diskReadHistory: Array(MAX_HISTORY_POINTS).fill(initialDisk.readSpeed),
  diskWriteHistory: Array(MAX_HISTORY_POINTS).fill(initialDisk.writeSpeed),
  networkInHistory: Array(MAX_HISTORY_POINTS).fill(initialNetwork.received),
  networkOutHistory: Array(MAX_HISTORY_POINTS).fill(initialNetwork.sent),
  
  processes: generateRandomizedProcesses(),
  
  // Actions
  updateStats: (stats) => {
    set((state) => {
      const cpuTotal = stats.cpu.system + stats.cpu.user;
      const memoryPercent = (stats.memory.used / stats.memory.total) * 100;
      
      return {
        cpu: stats.cpu,
        memory: stats.memory,
        disk: stats.disk,
        network: stats.network,
        cpuHistory: addToHistory(state.cpuHistory, cpuTotal),
        memoryHistory: addToHistory(state.memoryHistory, memoryPercent),
        diskReadHistory: addToHistory(state.diskReadHistory, stats.disk.readSpeed),
        diskWriteHistory: addToHistory(state.diskWriteHistory, stats.disk.writeSpeed),
        networkInHistory: addToHistory(state.networkInHistory, stats.network.received),
        networkOutHistory: addToHistory(state.networkOutHistory, stats.network.sent),
      };
    });
  },
  
  refreshProcesses: () => {
    set({
      processes: generateRandomizedProcesses(),
    });
  },
  
  reset: () => {
    set({
      cpu: initialCPU,
      memory: initialMemory,
      disk: initialDisk,
      network: initialNetwork,
      cpuHistory: Array(MAX_HISTORY_POINTS).fill(0),
      memoryHistory: Array(MAX_HISTORY_POINTS).fill(0),
      diskReadHistory: Array(MAX_HISTORY_POINTS).fill(0),
      diskWriteHistory: Array(MAX_HISTORY_POINTS).fill(0),
      networkInHistory: Array(MAX_HISTORY_POINTS).fill(0),
      networkOutHistory: Array(MAX_HISTORY_POINTS).fill(0),
      processes: [],
    });
  },
}));

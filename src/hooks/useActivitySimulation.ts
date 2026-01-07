/**
 * useActivitySimulation Hook
 * Simulates live CPU, Memory, Disk, and Network activity data
 */

import { useEffect, useRef, useCallback } from 'react';
import { useActivityStore } from '../store/activityStore';
import type { CPUStats, MemoryStats, DiskStats, NetworkStats } from '../types/activity';

/**
 * Configuration for the simulation
 */
const SIMULATION_INTERVAL = 1000; // 1 second

/**
 * Generate smooth random variations within bounds
 */
const vary = (current: number, variance: number, min: number, max: number): number => {
  const change = (Math.random() - 0.5) * variance;
  return Math.max(min, Math.min(max, current + change));
};

/**
 * Generate CPU stats with realistic fluctuations
 */
const generateCPUStats = (previous: CPUStats): CPUStats => {
  const system = vary(previous.system, 8, 3, 35);
  const user = vary(previous.user, 12, 10, 60);
  const total = system + user;
  
  // Ensure total doesn't exceed 100
  if (total > 98) {
    const scale = 98 / total;
    return {
      system: system * scale,
      user: user * scale,
      idle: 2,
    };
  }
  
  return {
    system,
    user,
    idle: 100 - system - user,
  };
};

/**
 * Generate Memory stats with realistic fluctuations
 */
const generateMemoryStats = (previous: MemoryStats): MemoryStats => {
  const total = previous.total; // Keep total fixed
  const wired = vary(previous.wired, 50, 1024, 2048);
  const compressed = vary(previous.compressed, 30, 256, 1024);
  const cached = vary(previous.cached, 100, 1024, 3072);
  
  // Calculate used and available
  const baseUsed = wired + compressed;
  const appMemory = vary(previous.used - baseUsed, 150, 2048, 4096);
  const used = Math.min(baseUsed + appMemory, total - 512);
  const available = total - used;
  
  return {
    used,
    wired,
    compressed,
    cached: Math.min(cached, available),
    available,
    total,
  };
};

/**
 * Generate Disk stats with realistic fluctuations
 */
const generateDiskStats = (previous: DiskStats): DiskStats => {
  // Disk space changes very slowly
  const used = vary(previous.used, 0.1, 200, 450);
  
  // I/O speeds fluctuate more
  const readSpeed = vary(previous.readSpeed, 30, 0, 150);
  const writeSpeed = vary(previous.writeSpeed, 20, 0, 100);
  
  return {
    readSpeed: Math.max(0, readSpeed),
    writeSpeed: Math.max(0, writeSpeed),
    used,
    total: previous.total,
  };
};

/**
 * Generate Network stats with realistic fluctuations
 */
const generateNetworkStats = (previous: NetworkStats): NetworkStats => {
  const received = vary(previous.received, 80, 0, 500);
  const sent = vary(previous.sent, 40, 0, 250);
  
  // Accumulate totals (convert KB/s to MB over 1 second)
  const totalReceived = previous.totalReceived + (received / 1024);
  const totalSent = previous.totalSent + (sent / 1024);
  
  // Simulate packet counts (roughly 50 packets per KB)
  const packetsIn = previous.packetsIn + Math.floor(received * 50);
  const packetsOut = previous.packetsOut + Math.floor(sent * 50);
  
  return {
    received: Math.max(0, received),
    sent: Math.max(0, sent),
    totalReceived,
    totalSent,
    packetsIn,
    packetsOut,
  };
};

/**
 * Hook for simulating activity data
 * Starts/stops simulation based on isActive parameter
 */
export const useActivitySimulation = (isActive: boolean) => {
  const intervalRef = useRef<number | null>(null);
  const previousStatsRef = useRef<{
    cpu: CPUStats;
    memory: MemoryStats;
    disk: DiskStats;
    network: NetworkStats;
  } | null>(null);
  
  const { updateStats, refreshProcesses, cpu, memory, disk, network } = useActivityStore();
  
  // Store current stats for reference
  if (!previousStatsRef.current) {
    previousStatsRef.current = { cpu, memory, disk, network };
  }
  
  const simulate = useCallback(() => {
    if (!previousStatsRef.current) return;
    
    const newStats = {
      cpu: generateCPUStats(previousStatsRef.current.cpu),
      memory: generateMemoryStats(previousStatsRef.current.memory),
      disk: generateDiskStats(previousStatsRef.current.disk),
      network: generateNetworkStats(previousStatsRef.current.network),
    };
    
    previousStatsRef.current = newStats;
    updateStats(newStats);
    
    // Refresh processes every 3 seconds
    if (Date.now() % 3000 < SIMULATION_INTERVAL) {
      refreshProcesses();
    }
  }, [updateStats, refreshProcesses]);
  
  useEffect(() => {
    if (isActive) {
      // Start simulation
      intervalRef.current = window.setInterval(simulate, SIMULATION_INTERVAL);
      
      // Run immediately on start
      simulate();
    } else {
      // Stop simulation
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, simulate]);
  
  return {
    isRunning: Boolean(intervalRef.current),
  };
};

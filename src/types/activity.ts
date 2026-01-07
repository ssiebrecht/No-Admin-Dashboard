/**
 * Activity Monitor Types
 * Type definitions for system activity monitoring
 */

/**
 * Process information for process list
 */
export interface Process {
  /** Unique process identifier */
  id: string;
  /** System process ID */
  pid: number;
  /** Process name */
  name: string;
  /** CPU usage percentage (0-100) */
  cpu: number;
  /** Memory usage percentage (0-100) */
  memory: number;
  /** Memory usage in bytes */
  memoryBytes: number;
  /** User running the process */
  user: string;
}

/**
 * CPU statistics
 */
export interface CPUStats {
  /** System processes CPU usage (0-100) */
  system: number;
  /** User processes CPU usage (0-100) */
  user: number;
  /** Idle CPU percentage (0-100) */
  idle: number;
}

/**
 * Memory statistics
 */
export interface MemoryStats {
  /** Used memory in MB */
  used: number;
  /** Wired memory in MB (cannot be paged out) */
  wired: number;
  /** Compressed memory in MB */
  compressed: number;
  /** Cached files memory in MB */
  cached: number;
  /** Available memory in MB */
  available: number;
  /** Total memory in MB */
  total: number;
}

/**
 * Disk I/O statistics
 */
export interface DiskStats {
  /** Current read speed in MB/s */
  readSpeed: number;
  /** Current write speed in MB/s */
  writeSpeed: number;
  /** Used disk space in GB */
  used: number;
  /** Total disk space in GB */
  total: number;
}

/**
 * Network statistics
 */
export interface NetworkStats {
  /** Current received speed in KB/s */
  received: number;
  /** Current sent speed in KB/s */
  sent: number;
  /** Total data received in MB */
  totalReceived: number;
  /** Total data sent in MB */
  totalSent: number;
  /** Total packets received */
  packetsIn: number;
  /** Total packets sent */
  packetsOut: number;
}

/**
 * Activity tab identifiers
 */
export type ActivityTab = 'cpu' | 'memory' | 'disk' | 'network';

/**
 * Process sort field options
 */
export type ProcessSortField = 'name' | 'cpu' | 'memory' | 'pid' | 'user';

/**
 * Activity sort order (separate from file SortOrder)
 */
export type ActivitySortOrder = 'asc' | 'desc';

/**
 * File System Type Definitions
 * Mac OS 8/9 Classic File Browser Types
 */

/**
 * File system item types
 */
export type FileType = 'folder' | 'file';

/**
 * View mode for file browser
 */
export type ViewMode = 'icons' | 'list' | 'columns';

/**
 * Sort field options
 */
export type SortField = 'name' | 'date' | 'size' | 'kind';

/**
 * Sort order direction
 */
export type SortOrder = 'asc' | 'desc';

/**
 * File system item definition
 */
export interface FileItem {
  /** Unique identifier */
  id: string;
  /** File or folder name */
  name: string;
  /** Type of item */
  type: FileType;
  /** File extension (e.g., 'txt', 'ts', 'png') */
  extension?: string;
  /** File size in bytes (undefined for folders) */
  size?: number;
  /** Creation timestamp */
  createdAt: string;
  /** Last modified timestamp */
  modifiedAt: string;
  /** Parent folder ID (null for root items) */
  parentId: string | null;
  /** Custom icon (emoji override) */
  icon?: string;
}

/**
 * File browser navigation history item
 */
export interface NavigationHistoryItem {
  /** Folder ID */
  folderId: string | null;
  /** Timestamp when navigated */
  timestamp: string;
}

/**
 * File Store State
 */
export interface FileStoreState {
  /** All files indexed by ID */
  files: Record<string, FileItem>;
  /** Currently viewed folder ID (null for root) */
  currentFolderId: string | null;
  /** Currently selected file IDs */
  selectedFileIds: string[];
  /** Navigation history for back/forward */
  history: NavigationHistoryItem[];
  /** Current position in history */
  historyIndex: number;
  /** Current view mode */
  viewMode: ViewMode;
  /** Current sort field */
  sortBy: SortField;
  /** Current sort order */
  sortOrder: SortOrder;
  /** Search query */
  searchQuery: string;
}

/**
 * File Store Actions
 */
export interface FileStoreActions {
  /** Navigate to a folder */
  navigateTo: (folderId: string | null) => void;
  /** Go back in history */
  goBack: () => void;
  /** Go forward in history */
  goForward: () => void;
  /** Check if can go back */
  canGoBack: () => boolean;
  /** Check if can go forward */
  canGoForward: () => boolean;
  /** Select files (replaces selection) */
  selectFiles: (fileIds: string[]) => void;
  /** Toggle file selection */
  toggleFileSelection: (fileId: string) => void;
  /** Add to selection */
  addToSelection: (fileId: string) => void;
  /** Clear selection */
  clearSelection: () => void;
  /** Create a new folder */
  createFolder: (name: string, parentId?: string | null) => string;
  /** Rename a file or folder */
  renameFile: (fileId: string, newName: string) => void;
  /** Delete files */
  deleteFiles: (fileIds: string[]) => void;
  /** Set view mode */
  setViewMode: (mode: ViewMode) => void;
  /** Set sort options */
  setSortBy: (field: SortField) => void;
  /** Toggle sort order */
  toggleSortOrder: () => void;
  /** Set search query */
  setSearchQuery: (query: string) => void;
  /** Get files in current folder */
  getCurrentFiles: () => FileItem[];
  /** Get breadcrumb path */
  getBreadcrumbPath: () => FileItem[];
  /** Get a single file by ID */
  getFile: (fileId: string) => FileItem | undefined;
  /** Initialize with mock data */
  initializeMockData: (files: Record<string, FileItem>) => void;
}

/**
 * Combined File Store Type
 */
export type FileStore = FileStoreState & FileStoreActions;

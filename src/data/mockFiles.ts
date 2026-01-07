/**
 * Mock File System Data
 * Sample files and folders for the File Browser
 */

import type { FileItem } from '../types/file';

/**
 * Mock filesystem structure
 * Organized as a flat Record for efficient lookup
 */
export const mockFiles: Record<string, FileItem> = {
  // Root Level Folders
  'folder-documents': {
    id: 'folder-documents',
    name: 'Documents',
    type: 'folder',
    createdAt: '2025-01-01T10:00:00Z',
    modifiedAt: '2025-12-15T14:30:00Z',
    parentId: null,
    icon: '📁',
  },
  'folder-applications': {
    id: 'folder-applications',
    name: 'Applications',
    type: 'folder',
    createdAt: '2025-01-01T10:00:00Z',
    modifiedAt: '2025-11-20T09:15:00Z',
    parentId: null,
    icon: '📂',
  },
  'folder-system': {
    id: 'folder-system',
    name: 'System Folder',
    type: 'folder',
    createdAt: '2025-01-01T10:00:00Z',
    modifiedAt: '2025-10-01T08:00:00Z',
    parentId: null,
    icon: '🗂️',
  },
  'folder-projects': {
    id: 'folder-projects',
    name: 'Projects',
    type: 'folder',
    createdAt: '2025-03-15T12:00:00Z',
    modifiedAt: '2026-01-05T16:45:00Z',
    parentId: null,
  },
  'folder-downloads': {
    id: 'folder-downloads',
    name: 'Downloads',
    type: 'folder',
    createdAt: '2025-01-01T10:00:00Z',
    modifiedAt: '2026-01-07T11:20:00Z',
    parentId: null,
  },
  
  // Root Level Files
  'file-readme': {
    id: 'file-readme',
    name: 'Read Me.txt',
    type: 'file',
    extension: 'txt',
    size: 1254,
    createdAt: '2025-01-01T10:00:00Z',
    modifiedAt: '2025-06-20T15:30:00Z',
    parentId: null,
  },
  'file-notes': {
    id: 'file-notes',
    name: 'Notes.md',
    type: 'file',
    extension: 'md',
    size: 4521,
    createdAt: '2025-08-10T09:00:00Z',
    modifiedAt: '2025-12-28T10:15:00Z',
    parentId: null,
  },
  
  // Documents Folder Contents
  'doc-report': {
    id: 'doc-report',
    name: 'Annual Report 2025.pdf',
    type: 'file',
    extension: 'pdf',
    size: 2456789,
    createdAt: '2025-12-01T14:00:00Z',
    modifiedAt: '2025-12-15T16:30:00Z',
    parentId: 'folder-documents',
  },
  'doc-budget': {
    id: 'doc-budget',
    name: 'Budget.xlsx',
    type: 'file',
    extension: 'xlsx',
    size: 125678,
    createdAt: '2025-10-01T09:00:00Z',
    modifiedAt: '2025-12-20T11:45:00Z',
    parentId: 'folder-documents',
  },
  'doc-letter': {
    id: 'doc-letter',
    name: 'Letter to Santa.doc',
    type: 'file',
    extension: 'doc',
    size: 45678,
    createdAt: '2025-12-20T10:00:00Z',
    modifiedAt: '2025-12-20T10:30:00Z',
    parentId: 'folder-documents',
  },
  'folder-work': {
    id: 'folder-work',
    name: 'Work',
    type: 'folder',
    createdAt: '2025-06-01T08:00:00Z',
    modifiedAt: '2025-12-10T17:00:00Z',
    parentId: 'folder-documents',
  },
  
  // Work Subfolder Contents
  'work-presentation': {
    id: 'work-presentation',
    name: 'Q4 Presentation.pptx',
    type: 'file',
    extension: 'pptx',
    size: 5678901,
    createdAt: '2025-11-15T10:00:00Z',
    modifiedAt: '2025-12-10T15:30:00Z',
    parentId: 'folder-work',
  },
  'work-meeting-notes': {
    id: 'work-meeting-notes',
    name: 'Meeting Notes.txt',
    type: 'file',
    extension: 'txt',
    size: 8765,
    createdAt: '2025-12-05T14:00:00Z',
    modifiedAt: '2025-12-05T16:00:00Z',
    parentId: 'folder-work',
  },
  
  // Applications Folder Contents
  'app-simcity': {
    id: 'app-simcity',
    name: 'SimCity 2000',
    type: 'file',
    extension: 'app',
    size: 15678901,
    createdAt: '2025-01-15T12:00:00Z',
    modifiedAt: '2025-01-15T12:00:00Z',
    parentId: 'folder-applications',
    icon: '🏙️',
  },
  'app-photoshop': {
    id: 'app-photoshop',
    name: 'Adobe Photoshop',
    type: 'file',
    extension: 'app',
    size: 89012345,
    createdAt: '2025-02-01T09:00:00Z',
    modifiedAt: '2025-08-15T10:00:00Z',
    parentId: 'folder-applications',
    icon: '🎨',
  },
  'app-word': {
    id: 'app-word',
    name: 'Microsoft Word',
    type: 'file',
    extension: 'app',
    size: 45678901,
    createdAt: '2025-01-01T10:00:00Z',
    modifiedAt: '2025-06-01T14:00:00Z',
    parentId: 'folder-applications',
    icon: '📝',
  },
  
  // Projects Folder Contents
  'folder-react-dashboard': {
    id: 'folder-react-dashboard',
    name: 'React Dashboard',
    type: 'folder',
    createdAt: '2025-09-01T09:00:00Z',
    modifiedAt: '2026-01-05T16:45:00Z',
    parentId: 'folder-projects',
  },
  'proj-todo-app': {
    id: 'proj-todo-app',
    name: 'todo-app.zip',
    type: 'file',
    extension: 'zip',
    size: 234567,
    createdAt: '2025-07-01T11:00:00Z',
    modifiedAt: '2025-07-15T14:30:00Z',
    parentId: 'folder-projects',
  },
  
  // React Dashboard Project Contents
  'rd-package': {
    id: 'rd-package',
    name: 'package.json',
    type: 'file',
    extension: 'json',
    size: 2345,
    createdAt: '2025-09-01T09:00:00Z',
    modifiedAt: '2026-01-05T16:45:00Z',
    parentId: 'folder-react-dashboard',
  },
  'rd-app': {
    id: 'rd-app',
    name: 'App.tsx',
    type: 'file',
    extension: 'tsx',
    size: 4567,
    createdAt: '2025-09-01T09:00:00Z',
    modifiedAt: '2026-01-05T15:30:00Z',
    parentId: 'folder-react-dashboard',
  },
  'rd-styles': {
    id: 'rd-styles',
    name: 'styles.css',
    type: 'file',
    extension: 'css',
    size: 1234,
    createdAt: '2025-09-01T09:00:00Z',
    modifiedAt: '2025-12-20T10:00:00Z',
    parentId: 'folder-react-dashboard',
  },
  'folder-components': {
    id: 'folder-components',
    name: 'components',
    type: 'folder',
    createdAt: '2025-09-01T09:00:00Z',
    modifiedAt: '2026-01-05T16:00:00Z',
    parentId: 'folder-react-dashboard',
  },
  
  // Downloads Folder Contents
  'dl-image': {
    id: 'dl-image',
    name: 'wallpaper.png',
    type: 'file',
    extension: 'png',
    size: 3456789,
    createdAt: '2026-01-05T20:00:00Z',
    modifiedAt: '2026-01-05T20:00:00Z',
    parentId: 'folder-downloads',
  },
  'dl-music': {
    id: 'dl-music',
    name: 'song.mp3',
    type: 'file',
    extension: 'mp3',
    size: 5678901,
    createdAt: '2026-01-07T09:00:00Z',
    modifiedAt: '2026-01-07T09:00:00Z',
    parentId: 'folder-downloads',
  },
  'dl-video': {
    id: 'dl-video',
    name: 'tutorial.mp4',
    type: 'file',
    extension: 'mp4',
    size: 123456789,
    createdAt: '2026-01-06T15:00:00Z',
    modifiedAt: '2026-01-06T15:00:00Z',
    parentId: 'folder-downloads',
  },
  'dl-installer': {
    id: 'dl-installer',
    name: 'installer.dmg',
    type: 'file',
    extension: 'dmg',
    size: 456789012,
    createdAt: '2026-01-07T11:00:00Z',
    modifiedAt: '2026-01-07T11:20:00Z',
    parentId: 'folder-downloads',
  },
  
  // System Folder Contents
  'sys-preferences': {
    id: 'sys-preferences',
    name: 'Preferences',
    type: 'folder',
    createdAt: '2025-01-01T10:00:00Z',
    modifiedAt: '2025-10-01T08:00:00Z',
    parentId: 'folder-system',
    icon: '⚙️',
  },
  'sys-extensions': {
    id: 'sys-extensions',
    name: 'Extensions',
    type: 'folder',
    createdAt: '2025-01-01T10:00:00Z',
    modifiedAt: '2025-08-15T12:00:00Z',
    parentId: 'folder-system',
  },
  'sys-finder': {
    id: 'sys-finder',
    name: 'Finder',
    type: 'file',
    extension: 'app',
    size: 2345678,
    createdAt: '2025-01-01T10:00:00Z',
    modifiedAt: '2025-01-01T10:00:00Z',
    parentId: 'folder-system',
    icon: '🖥️',
  },
};

/**
 * Get files at root level (no parent)
 */
export function getRootFiles(): FileItem[] {
  return Object.values(mockFiles).filter(f => f.parentId === null);
}

/**
 * Get files in a specific folder
 */
export function getFilesInFolder(folderId: string): FileItem[] {
  return Object.values(mockFiles).filter(f => f.parentId === folderId);
}

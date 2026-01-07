/**
 * File Utilities
 * Helper functions for file operations
 */

import type { FileItem } from '../types/file';

/**
 * File extension to icon mapping
 */
const EXTENSION_ICONS: Record<string, string> = {
  // Documents
  txt: '📄',
  doc: '📝',
  docx: '📝',
  pdf: '📕',
  rtf: '📄',
  md: '📝',
  
  // Spreadsheets
  xls: '📊',
  xlsx: '📊',
  csv: '📊',
  
  // Presentations
  ppt: '📽️',
  pptx: '📽️',
  
  // Images
  jpg: '🖼️',
  jpeg: '🖼️',
  png: '🖼️',
  gif: '🎞️',
  bmp: '🖼️',
  svg: '🎨',
  ico: '🖼️',
  
  // Audio
  mp3: '🎵',
  wav: '🎵',
  aac: '🎵',
  flac: '🎵',
  ogg: '🎵',
  
  // Video
  mp4: '🎬',
  avi: '🎬',
  mov: '🎬',
  mkv: '🎬',
  wmv: '🎬',
  
  // Archives
  zip: '📦',
  rar: '📦',
  '7z': '📦',
  tar: '📦',
  gz: '📦',
  
  // Code
  js: '📜',
  ts: '📘',
  tsx: '⚛️',
  jsx: '⚛️',
  html: '🌐',
  css: '🎨',
  scss: '🎨',
  json: '📋',
  xml: '📋',
  py: '🐍',
  rb: '💎',
  java: '☕',
  c: '⚙️',
  cpp: '⚙️',
  h: '⚙️',
  rs: '🦀',
  go: '🔷',
  php: '🐘',
  sql: '🗃️',
  sh: '🖥️',
  bat: '🖥️',
  
  // Config
  yml: '⚙️',
  yaml: '⚙️',
  toml: '⚙️',
  ini: '⚙️',
  env: '🔐',
  
  // Fonts
  ttf: '🔤',
  otf: '🔤',
  woff: '🔤',
  woff2: '🔤',
  
  // Executables
  exe: '⚡',
  app: '📱',
  dmg: '💿',
  
  // Other
  log: '📋',
  bak: '💾',
};

/**
 * File extension to kind description mapping
 */
const EXTENSION_KINDS: Record<string, string> = {
  // Documents
  txt: 'Text Document',
  doc: 'Word Document',
  docx: 'Word Document',
  pdf: 'PDF Document',
  rtf: 'Rich Text Document',
  md: 'Markdown Document',
  
  // Spreadsheets
  xls: 'Excel Spreadsheet',
  xlsx: 'Excel Spreadsheet',
  csv: 'CSV File',
  
  // Presentations
  ppt: 'PowerPoint Presentation',
  pptx: 'PowerPoint Presentation',
  
  // Images
  jpg: 'JPEG Image',
  jpeg: 'JPEG Image',
  png: 'PNG Image',
  gif: 'GIF Image',
  bmp: 'Bitmap Image',
  svg: 'SVG Image',
  ico: 'Icon File',
  
  // Audio
  mp3: 'MP3 Audio',
  wav: 'WAV Audio',
  aac: 'AAC Audio',
  flac: 'FLAC Audio',
  ogg: 'OGG Audio',
  
  // Video
  mp4: 'MP4 Video',
  avi: 'AVI Video',
  mov: 'QuickTime Movie',
  mkv: 'MKV Video',
  wmv: 'Windows Media Video',
  
  // Archives
  zip: 'ZIP Archive',
  rar: 'RAR Archive',
  '7z': '7-Zip Archive',
  tar: 'TAR Archive',
  gz: 'GZip Archive',
  
  // Code
  js: 'JavaScript File',
  ts: 'TypeScript File',
  tsx: 'TypeScript React File',
  jsx: 'JavaScript React File',
  html: 'HTML Document',
  css: 'CSS Stylesheet',
  scss: 'SCSS Stylesheet',
  json: 'JSON File',
  xml: 'XML File',
  py: 'Python Script',
  rb: 'Ruby Script',
  java: 'Java File',
  c: 'C Source File',
  cpp: 'C++ Source File',
  h: 'Header File',
  rs: 'Rust File',
  go: 'Go File',
  php: 'PHP File',
  sql: 'SQL File',
  sh: 'Shell Script',
  bat: 'Batch File',
  
  // Config
  yml: 'YAML File',
  yaml: 'YAML File',
  toml: 'TOML File',
  ini: 'INI File',
  env: 'Environment File',
  
  // Fonts
  ttf: 'TrueType Font',
  otf: 'OpenType Font',
  woff: 'Web Font',
  woff2: 'Web Font',
  
  // Executables
  exe: 'Application',
  app: 'Application',
  dmg: 'Disk Image',
  
  // Other
  log: 'Log File',
  bak: 'Backup File',
};

/**
 * Get icon for a file based on its type and extension
 */
export function getFileIcon(file: FileItem): string {
  // Custom icon takes precedence
  if (file.icon) {
    return file.icon;
  }
  
  // Folder icon
  if (file.type === 'folder') {
    return '📁';
  }
  
  // Get icon from extension
  const ext = file.extension?.toLowerCase() || '';
  return EXTENSION_ICONS[ext] || '📄';
}

/**
 * Get kind description for a file
 */
export function getFileKind(file: FileItem): string {
  if (file.type === 'folder') {
    return 'Folder';
  }
  
  const ext = file.extension?.toLowerCase() || '';
  return EXTENSION_KINDS[ext] || 'Document';
}

/**
 * Format file size in human-readable format
 */
export function formatFileSize(bytes: number | undefined): string {
  if (bytes === undefined || bytes === null) {
    return '--';
  }
  
  if (bytes === 0) {
    return '0 B';
  }
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  // Keep to max 2 decimal places
  const size = bytes / Math.pow(k, i);
  const formatted = size < 10 ? size.toFixed(1) : Math.round(size).toString();
  
  return `${formatted} ${units[i]}`;
}

/**
 * Format date in classic Mac OS style
 */
export function formatFileDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Check if today
  if (date.toDateString() === today.toDateString()) {
    return `Today, ${date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })}`;
  }
  
  // Check if yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })}`;
  }
  
  // Format with date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
  });
}

/**
 * Sort files by the specified field and order
 */
export function sortFiles(
  files: FileItem[],
  sortBy: 'name' | 'date' | 'size' | 'kind',
  sortOrder: 'asc' | 'desc'
): FileItem[] {
  const sorted = [...files].sort((a, b) => {
    // Folders always come first
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
        break;
      
      case 'date':
        comparison = new Date(a.modifiedAt).getTime() - new Date(b.modifiedAt).getTime();
        break;
      
      case 'size':
        comparison = (a.size || 0) - (b.size || 0);
        break;
      
      case 'kind':
        comparison = getFileKind(a).localeCompare(getFileKind(b));
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });
  
  return sorted;
}

/**
 * Filter files by search query
 */
export function filterFiles(files: FileItem[], query: string): FileItem[] {
  if (!query.trim()) {
    return files;
  }
  
  const lowerQuery = query.toLowerCase();
  return files.filter((file) => 
    file.name.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get file extension from filename
 */
export function getExtension(filename: string): string | undefined {
  const parts = filename.split('.');
  if (parts.length > 1) {
    return parts.pop()?.toLowerCase();
  }
  return undefined;
}

/**
 * Generate a unique ID
 */
export function generateFileId(): string {
  return `file-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * File Store - Zustand State Management
 * Mac OS 8/9 Classic File Browser System
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  FileStore,
  FileItem,
  ViewMode,
  SortField,
  NavigationHistoryItem,
} from '../types/file';
import { mockFiles } from '../data/mockFiles';
import { sortFiles, filterFiles, generateFileId, getExtension } from '../utils/fileUtils';

/**
 * File Store Implementation
 */
export const useFileStore = create<FileStore>()(
  persist(
    (set, get) => ({
      // Initial State
      files: mockFiles,
      currentFolderId: null,
      selectedFileIds: [],
      history: [{ folderId: null, timestamp: new Date().toISOString() }],
      historyIndex: 0,
      viewMode: 'icons',
      sortBy: 'name',
      sortOrder: 'asc',
      searchQuery: '',

      // Navigation Actions
      navigateTo: (folderId: string | null) => {
        const state = get();
        
        // If same folder, do nothing
        if (state.currentFolderId === folderId) return;
        
        // Trim history after current index (if we navigated back then forward somewhere new)
        const newHistory: NavigationHistoryItem[] = state.history.slice(0, state.historyIndex + 1);
        
        // Add new navigation entry
        newHistory.push({
          folderId,
          timestamp: new Date().toISOString(),
        });
        
        set({
          currentFolderId: folderId,
          selectedFileIds: [],
          history: newHistory,
          historyIndex: newHistory.length - 1,
          searchQuery: '', // Clear search when navigating
        });
      },

      goBack: () => {
        const state = get();
        if (state.historyIndex <= 0) return;
        
        const newIndex = state.historyIndex - 1;
        const historyEntry = state.history[newIndex];
        if (!historyEntry) return;
        
        set({
          currentFolderId: historyEntry.folderId,
          selectedFileIds: [],
          historyIndex: newIndex,
          searchQuery: '',
        });
      },

      goForward: () => {
        const state = get();
        if (state.historyIndex >= state.history.length - 1) return;
        
        const newIndex = state.historyIndex + 1;
        const historyEntry = state.history[newIndex];
        if (!historyEntry) return;
        
        set({
          currentFolderId: historyEntry.folderId,
          selectedFileIds: [],
          historyIndex: newIndex,
          searchQuery: '',
        });
      },

      canGoBack: () => {
        const state = get();
        return state.historyIndex > 0;
      },

      canGoForward: () => {
        const state = get();
        return state.historyIndex < state.history.length - 1;
      },

      // Selection Actions
      selectFiles: (fileIds: string[]) => {
        set({ selectedFileIds: fileIds });
      },

      toggleFileSelection: (fileId: string) => {
        const state = get();
        const isSelected = state.selectedFileIds.includes(fileId);
        
        if (isSelected) {
          set({
            selectedFileIds: state.selectedFileIds.filter((id) => id !== fileId),
          });
        } else {
          set({
            selectedFileIds: [...state.selectedFileIds, fileId],
          });
        }
      },

      addToSelection: (fileId: string) => {
        const state = get();
        if (!state.selectedFileIds.includes(fileId)) {
          set({
            selectedFileIds: [...state.selectedFileIds, fileId],
          });
        }
      },

      clearSelection: () => {
        set({ selectedFileIds: [] });
      },

      // File Operations
      createFolder: (name: string, parentId?: string | null) => {
        const state = get();
        const actualParentId = parentId !== undefined ? parentId : state.currentFolderId;
        
        const newFolderId = generateFileId();
        const now = new Date().toISOString();
        
        const newFolder: FileItem = {
          id: newFolderId,
          name,
          type: 'folder',
          createdAt: now,
          modifiedAt: now,
          parentId: actualParentId,
        };
        
        set({
          files: {
            ...state.files,
            [newFolderId]: newFolder,
          },
        });
        
        return newFolderId;
      },

      renameFile: (fileId: string, newName: string) => {
        const state = get();
        const file = state.files[fileId];
        
        if (!file) return;
        
        // Update extension if it's a file
        const extension = file.type === 'file' ? getExtension(newName) : undefined;
        
        set({
          files: {
            ...state.files,
            [fileId]: {
              ...file,
              name: newName,
              extension,
              modifiedAt: new Date().toISOString(),
            },
          },
        });
      },

      deleteFiles: (fileIds: string[]) => {
        const state = get();
        
        // Get all files to delete (including children)
        const getAllFilesToDelete = (ids: string[]): string[] => {
          const toDelete = new Set(ids);
          
          // Find all children of folders
          const findChildren = (parentId: string) => {
            Object.values(state.files).forEach((file) => {
              if (file.parentId === parentId && !toDelete.has(file.id)) {
                toDelete.add(file.id);
                if (file.type === 'folder') {
                  findChildren(file.id);
                }
              }
            });
          };
          
          ids.forEach((id) => {
            const file = state.files[id];
            if (file?.type === 'folder') {
              findChildren(id);
            }
          });
          
          return Array.from(toDelete);
        };
        
        const allIdsToDelete = getAllFilesToDelete(fileIds);
        const newFiles = { ...state.files };
        
        allIdsToDelete.forEach((id) => {
          delete newFiles[id];
        });
        
        set({
          files: newFiles,
          selectedFileIds: state.selectedFileIds.filter(
            (id) => !allIdsToDelete.includes(id)
          ),
        });
      },

      // View Options
      setViewMode: (mode: ViewMode) => {
        set({ viewMode: mode });
      },

      setSortBy: (field: SortField) => {
        const state = get();
        // If clicking same field, toggle order; otherwise default to asc
        if (state.sortBy === field) {
          set({ sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' });
        } else {
          set({ sortBy: field, sortOrder: 'asc' });
        }
      },

      toggleSortOrder: () => {
        const state = get();
        set({ sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc' });
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
      },

      // Getters
      getCurrentFiles: () => {
        const state = get();
        
        // Get files in current folder
        let files = Object.values(state.files).filter(
          (file) => file.parentId === state.currentFolderId
        );
        
        // Apply search filter
        files = filterFiles(files, state.searchQuery);
        
        // Apply sorting
        files = sortFiles(files, state.sortBy, state.sortOrder);
        
        return files;
      },

      getBreadcrumbPath: () => {
        const state = get();
        const path: FileItem[] = [];
        
        let currentId = state.currentFolderId;
        
        while (currentId !== null) {
          const folder = state.files[currentId];
          if (folder) {
            path.unshift(folder);
            currentId = folder.parentId;
          } else {
            break;
          }
        }
        
        return path;
      },

      getFile: (fileId: string) => {
        const state = get();
        return state.files[fileId];
      },

      initializeMockData: (files: Record<string, FileItem>) => {
        set({ files });
      },
    }),
    {
      name: 'macos-file-storage',
      partialize: (state) => ({
        files: state.files,
        viewMode: state.viewMode,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
      }),
    }
  )
);

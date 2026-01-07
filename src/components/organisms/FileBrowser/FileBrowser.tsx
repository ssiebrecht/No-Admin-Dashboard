/**
 * FileBrowser Organism
 * Classic Mac OS 8/9 Finder-style file browser
 */

import { type FC, useCallback, useMemo, useState } from 'react';
import { FileToolbar } from '../../molecules/FileToolbar';
import { FilePathBar } from '../../molecules/FilePathBar';
import { StatusBar } from '../../molecules/StatusBar';
import { FileList } from '../FileList';
import { GetInfoDialog } from '../GetInfoDialog';
import { useFileStore } from '../../../store/fileStore';
import { useDialog } from '../../../hooks/useDialog';
import type { FileItem, ViewMode } from '../../../types/file';
import { formatFileSize } from '../../../utils/fileUtils';
import styles from './FileBrowser.module.css';

export interface FileBrowserProps {
  /** Additional CSS class */
  className?: string;
}

/**
 * FileBrowser - Complete Finder-style file browser
 *
 * Features:
 * - Three view modes: icons, list, columns
 * - Navigation history (back/forward)
 * - Breadcrumb path navigation
 * - File selection with keyboard modifiers
 * - Sortable list view
 * - Get Info dialog
 * - New folder creation
 * - Status bar with item count
 */
export const FileBrowser: FC<FileBrowserProps> = ({
  className = '',
}) => {
  const dialog = useDialog();
  const [getInfoFile, setGetInfoFile] = useState<FileItem | null>(null);
  const [isGetInfoOpen, setIsGetInfoOpen] = useState(false);

  // File store state and actions
  const {
    files,
    currentFolderId,
    selectedFileIds,
    viewMode,
    sortBy,
    sortOrder,
    searchQuery,
    navigateTo,
    goBack,
    goForward,
    canGoBack,
    canGoForward,
    selectFiles,
    setViewMode,
    setSortBy,
    setSearchQuery,
    createFolder,
    renameFile,
    getCurrentFiles,
    getBreadcrumbPath,
    getFile,
  } = useFileStore();

  // Get current files (with sorting and filtering applied)
  const currentFiles = useMemo(() => getCurrentFiles(), [
    files,
    currentFolderId,
    sortBy,
    sortOrder,
    searchQuery,
  ]);

  // Get breadcrumb path
  const breadcrumbPath = useMemo(() => getBreadcrumbPath(), [
    files,
    currentFolderId,
  ]);

  // Calculate column data for column view
  const columnData = useMemo((): { columns: FileItem[][]; selections: (string | null)[] } => {
    if (viewMode !== 'columns') {
      return { columns: [], selections: [] };
    }

    const columns: FileItem[][] = [];
    const selections: (string | null)[] = [];

    // Root column
    const rootFiles = Object.values(files).filter(f => f.parentId === null);
    columns.push(rootFiles);
    selections.push(null);

    // Build path columns based on current folder
    let pathId = currentFolderId;
    const pathIds: string[] = [];

    while (pathId !== null) {
      pathIds.unshift(pathId);
      const folder = files[pathId];
      pathId = folder?.parentId ?? null;
    }

    // Add columns for each level in the path
    for (const folderId of pathIds) {
      // Find which item was selected to get to this folder
      selections[columns.length - 1] = folderId;

      // Add next column
      const folderFiles = Object.values(files).filter(f => f.parentId === folderId);
      columns.push(folderFiles);
      selections.push(null);
    }

    // If there's a selected file in the current folder, mark it
    if (selectedFileIds.length === 1 && columns.length > 0) {
      const selectedId = selectedFileIds[0];
      if (selectedId) {
        const selectedFile = files[selectedId];
        if (selectedFile && selectedFile.parentId === currentFolderId) {
          selections[columns.length - 1] = selectedId;
        }
      }
    }

    return { columns, selections };
  }, [viewMode, files, currentFolderId, selectedFileIds]);

  // Handle column selection
  const handleColumnSelect = useCallback((_columnIndex: number, file: FileItem) => {
    if (file.type === 'folder') {
      navigateTo(file.id);
    } else {
      selectFiles([file.id]);
    }
  }, [navigateTo, selectFiles]);

  // Handle file open (double-click)
  const handleOpen = useCallback((file: FileItem) => {
    if (file.type === 'folder') {
      navigateTo(file.id);
    } else {
      // For files, show Get Info dialog for now
      setGetInfoFile(file);
      setIsGetInfoOpen(true);
    }
  }, [navigateTo]);

  // Handle new folder creation
  const handleNewFolder = useCallback(async () => {
    const name = await dialog.prompt({
      title: 'New Folder',
      message: 'Enter a name for the new folder:',
      inputPlaceholder: 'untitled folder',
      defaultValue: 'New Folder',
      icon: 'question',
      confirmLabel: 'Create',
      cancelLabel: 'Cancel',
      required: true,
    });

    if (name !== null) {
      createFolder(name);
    }
  }, [dialog, createFolder]);

  // Handle view mode change
  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, [setViewMode]);

  // Handle Get Info dialog close
  const handleGetInfoClose = useCallback(() => {
    setIsGetInfoOpen(false);
    setGetInfoFile(null);
  }, []);

  // Handle rename from Get Info dialog
  const handleRename = useCallback((fileId: string, newName: string) => {
    renameFile(fileId, newName);
  }, [renameFile]);

  // Status bar content
  const statusText = useMemo(() => {
    const count = currentFiles.length;
    const itemText = count === 1 ? 'item' : 'items';

    if (selectedFileIds.length > 0) {
      const totalSize = selectedFileIds.reduce((sum, id) => {
        const file = getFile(id);
        return sum + (file?.size || 0);
      }, 0);
      
      return `${selectedFileIds.length} of ${count} selected, ${formatFileSize(totalSize)}`;
    }

    return `${count} ${itemText}`;
  }, [currentFiles.length, selectedFileIds, getFile]);

  // Get path as string array for Get Info dialog
  const filePath = useMemo(() => {
    return ['Macintosh HD', ...breadcrumbPath.map(f => f.name)];
  }, [breadcrumbPath]);

  const classNames = [
    styles.fileBrowser,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {/* Toolbar */}
      <FileToolbar
        canGoBack={canGoBack()}
        canGoForward={canGoForward()}
        onBack={goBack}
        onForward={goForward}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onNewFolder={handleNewFolder}
      />

      {/* Path Bar */}
      <FilePathBar
        path={breadcrumbPath}
        onNavigate={navigateTo}
      />

      {/* File List */}
      <FileList
        files={currentFiles}
        viewMode={viewMode}
        selectedFileIds={selectedFileIds}
        onSelectFiles={selectFiles}
        onOpen={handleOpen}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={setSortBy}
        columnData={columnData.columns}
        columnSelections={columnData.selections}
        onColumnSelect={handleColumnSelect}
      />

      {/* Status Bar */}
      <StatusBar text={statusText} />

      {/* Get Info Dialog */}
      <GetInfoDialog
        isOpen={isGetInfoOpen}
        onClose={handleGetInfoClose}
        file={getInfoFile}
        path={filePath}
        onRename={handleRename}
      />
    </div>
  );
};

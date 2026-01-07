/**
 * GetInfoDialog Organism
 * Classic Mac OS 8/9 "Get Info" dialog for file properties
 */

import { type FC, useState, useCallback, useEffect } from 'react';
import { Dialog, type DialogAction } from '../Dialog';
import { Text, Input, Divider } from '../../atoms';
import type { FileItem } from '../../../types/file';
import { getFileIcon, getFileKind, formatFileSize, formatFileDate } from '../../../utils/fileUtils';
import styles from './GetInfoDialog.module.css';

export interface GetInfoDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** File to show info for */
  file: FileItem | null;
  /** Path to the file (array of folder names) */
  path?: string[];
  /** Rename handler */
  onRename?: (fileId: string, newName: string) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * GetInfoDialog - Classic Mac OS "Get Info" dialog
 *
 * Features:
 * - Large icon display
 * - Editable file name
 * - Kind, Size, Where, Created, Modified info
 * - Classic Mac OS 8/9 styling
 */
export const GetInfoDialog: FC<GetInfoDialogProps> = ({
  isOpen,
  onClose,
  file,
  path = [],
  onRename,
  className = '',
}) => {
  const [editedName, setEditedName] = useState(file?.name || '');
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Reset state when file changes
  useEffect(() => {
    if (file) {
      setEditedName(file.name);
      setIsEditing(false);
      setHasChanges(false);
    }
  }, [file]);

  // Handle name change
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setEditedName(newName);
    setHasChanges(newName !== file?.name);
  }, [file]);

  // Handle save
  const handleSave = useCallback(() => {
    if (file && hasChanges && editedName.trim()) {
      onRename?.(file.id, editedName.trim());
      setHasChanges(false);
    }
    onClose();
  }, [file, hasChanges, editedName, onRename, onClose]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    setEditedName(file?.name || '');
    setHasChanges(false);
    onClose();
  }, [file, onClose]);

  if (!file) {
    return null;
  }

  const icon = getFileIcon(file);
  const kind = getFileKind(file);
  const size = formatFileSize(file.size);
  const created = formatFileDate(file.createdAt);
  const modified = formatFileDate(file.modifiedAt);
  const wherePath = path.length > 0 ? path.join(' ▶ ') : 'Macintosh HD';

  const actions: DialogAction[] = [
    {
      label: 'OK',
      variant: 'primary',
      isDefault: true,
      onClick: handleSave,
    },
    {
      label: 'Cancel',
      variant: 'secondary',
      isCancel: true,
      onClick: handleCancel,
    },
  ];

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleCancel}
      title={`${file.name} Info`}
      showTitleBar
      closable
      actions={actions}
      width={320}
      className={className}
    >
      <div className={styles.content}>
        {/* Icon and Name Section */}
        <div className={styles.header}>
          <span className={styles.icon}>{icon}</span>
          <div className={styles.nameSection}>
            {isEditing ? (
              <Input
                value={editedName}
                onChange={handleNameChange}
                className={styles.nameInput}
                autoFocus
              />
            ) : (
              <button
                type="button"
                className={styles.nameButton}
                onClick={() => setIsEditing(true)}
                title="Click to rename"
              >
                <Text variant="body" weight="semibold">
                  {editedName}
                </Text>
              </button>
            )}
            {isEditing && (
              <Text variant="small" color="secondary">
                Press Enter to confirm
              </Text>
            )}
          </div>
        </div>

        <Divider className={styles.divider} />

        {/* Info Section */}
        <div className={styles.infoSection}>
          <div className={styles.infoRow}>
            <Text variant="small" weight="semibold" className={styles.infoLabel}>
              Kind:
            </Text>
            <Text variant="small" className={styles.infoValue}>
              {kind}
            </Text>
          </div>

          {file.type === 'file' && (
            <div className={styles.infoRow}>
              <Text variant="small" weight="semibold" className={styles.infoLabel}>
                Size:
              </Text>
              <Text variant="small" className={styles.infoValue}>
                {size} {file.size !== undefined && `(${file.size.toLocaleString()} bytes)`}
              </Text>
            </div>
          )}

          <div className={styles.infoRow}>
            <Text variant="small" weight="semibold" className={styles.infoLabel}>
              Where:
            </Text>
            <Text variant="small" className={styles.infoValue}>
              {wherePath}
            </Text>
          </div>

          <Divider className={styles.divider} />

          <div className={styles.infoRow}>
            <Text variant="small" weight="semibold" className={styles.infoLabel}>
              Created:
            </Text>
            <Text variant="small" className={styles.infoValue}>
              {created}
            </Text>
          </div>

          <div className={styles.infoRow}>
            <Text variant="small" weight="semibold" className={styles.infoLabel}>
              Modified:
            </Text>
            <Text variant="small" className={styles.infoValue}>
              {modified}
            </Text>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

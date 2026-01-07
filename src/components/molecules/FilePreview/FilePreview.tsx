/**
 * FilePreview Molecule
 * Classic Mac OS 8/9 file preview panel for column view
 */

import { type FC } from 'react';
import { Text, Divider } from '../../atoms';
import type { FileItem } from '../../../types/file';
import { getFileIcon, getFileKind, formatFileSize, formatFileDate } from '../../../utils/fileUtils';
import styles from './FilePreview.module.css';

export interface FilePreviewProps {
  /** Selected file to preview (null for none/multiple) */
  file: FileItem | null;
  /** Number of selected items (for multi-select display) */
  selectedCount?: number;
  /** Additional CSS class */
  className?: string;
}

/**
 * FilePreview - Preview panel for selected file
 *
 * Shows file details in a right-side column:
 * - Large icon
 * - File name
 * - Kind, size, dates
 */
export const FilePreview: FC<FilePreviewProps> = ({
  file,
  selectedCount = 0,
  className = '',
}) => {
  const classNames = [
    styles.preview,
    className,
  ].filter(Boolean).join(' ');

  // Multiple selection
  if (selectedCount > 1) {
    return (
      <div className={classNames}>
        <div className={styles.multiSelect}>
          <span className={styles.multiIcon}>📚</span>
          <Text variant="body" weight="medium">
            {selectedCount} items selected
          </Text>
        </div>
      </div>
    );
  }

  // No selection
  if (!file) {
    return (
      <div className={classNames}>
        <div className={styles.empty}>
          <Text variant="small" color="secondary">
            No Selection
          </Text>
        </div>
      </div>
    );
  }

  // Single file preview
  const icon = getFileIcon(file);
  const kind = getFileKind(file);
  const size = formatFileSize(file.size);
  const created = formatFileDate(file.createdAt);
  const modified = formatFileDate(file.modifiedAt);

  return (
    <div className={classNames}>
      {/* Icon */}
      <div className={styles.iconSection}>
        <span className={styles.icon}>{icon}</span>
      </div>

      {/* Name */}
      <Text variant="body" weight="semibold" className={styles.name}>
        {file.name}
      </Text>

      <Divider />

      {/* Details */}
      <div className={styles.details}>
        <div className={styles.detailRow}>
          <Text variant="small" color="secondary" className={styles.label}>
            Kind:
          </Text>
          <Text variant="small" className={styles.value}>
            {kind}
          </Text>
        </div>

        {file.type === 'file' && (
          <div className={styles.detailRow}>
            <Text variant="small" color="secondary" className={styles.label}>
              Size:
            </Text>
            <Text variant="small" className={styles.value}>
              {size}
            </Text>
          </div>
        )}

        <div className={styles.detailRow}>
          <Text variant="small" color="secondary" className={styles.label}>
            Created:
          </Text>
          <Text variant="small" className={styles.value}>
            {created}
          </Text>
        </div>

        <div className={styles.detailRow}>
          <Text variant="small" color="secondary" className={styles.label}>
            Modified:
          </Text>
          <Text variant="small" className={styles.value}>
            {modified}
          </Text>
        </div>
      </div>
    </div>
  );
};

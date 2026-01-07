/**
 * FilePathBar Molecule
 * Classic Mac OS 8/9 breadcrumb path navigation
 */

import { type FC } from 'react';
import { Text, Icon } from '../../atoms';
import type { FileItem } from '../../../types/file';
import styles from './FilePathBar.module.css';

export interface FilePathBarProps {
  /** Breadcrumb path items */
  path: FileItem[];
  /** Click handler for path segments */
  onNavigate: (folderId: string | null) => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * FilePathBar - Breadcrumb navigation for folders
 *
 * Shows the current path with clickable segments:
 * - Disk icon for root
 * - Folder names as clickable links
 * - Current folder is non-clickable
 */
export const FilePathBar: FC<FilePathBarProps> = ({
  path,
  onNavigate,
  className = '',
}) => {
  const classNames = [
    styles.pathBar,
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav className={classNames} aria-label="Folder path">
      <ol className={styles.breadcrumb}>
        {/* Root/Disk */}
        <li className={styles.breadcrumbItem}>
          <button
            type="button"
            className={styles.pathButton}
            onClick={() => onNavigate(null)}
            title="Go to root"
          >
            <Icon name="folder" size="sm" />
            <Text variant="small" weight="medium">
              Macintosh HD
            </Text>
          </button>
        </li>

        {/* Path Segments */}
        {path.map((folder, index) => {
          const isLast = index === path.length - 1;

          return (
            <li key={folder.id} className={styles.breadcrumbItem}>
              <span className={styles.separator} aria-hidden="true">
                ▶
              </span>
              {isLast ? (
                <span className={styles.currentPath}>
                  <Text variant="small" weight="semibold">
                    {folder.name}
                  </Text>
                </span>
              ) : (
                <button
                  type="button"
                  className={styles.pathButton}
                  onClick={() => onNavigate(folder.id)}
                  title={`Go to ${folder.name}`}
                >
                  <Text variant="small">
                    {folder.name}
                  </Text>
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

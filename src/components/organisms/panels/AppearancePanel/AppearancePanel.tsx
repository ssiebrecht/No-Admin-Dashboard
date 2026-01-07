/**
 * AppearancePanel Organism
 * Control panel for appearance settings
 */

import { type FC } from 'react';
import { Text, Radio } from '../../../atoms';
import { Slider } from '../../../atoms/Slider';
import { useSettingsStore } from '../../../../store/settingsStore';
import { HIGHLIGHT_COLORS } from '../../../../data/controlPanels';
import type { Theme, HighlightColor, FontSize } from '../../../../types/settings';
import styles from './AppearancePanel.module.css';

/**
 * AppearancePanel - Appearance settings control panel
 *
 * Allows customizing:
 * - Theme (Platinum / Graphite)
 * - Highlight color
 * - Font size
 */
export const AppearancePanel: FC = () => {
  const { settings, updateAppearance } = useSettingsStore();
  const { appearance } = settings;

  const handleThemeChange = (theme: Theme) => {
    updateAppearance({ theme });
  };

  const handleHighlightColorChange = (highlightColor: HighlightColor) => {
    updateAppearance({ highlightColor });
  };

  const handleFontSizeChange = (value: number) => {
    const sizes: FontSize[] = ['small', 'medium', 'large'];
    updateAppearance({ fontSize: sizes[Math.round(value)] });
  };

  const fontSizeValue = ['small', 'medium', 'large'].indexOf(appearance.fontSize);

  return (
    <div className={styles.panel}>
      {/* Theme Selection */}
      <section className={styles.section}>
        <Text variant="label" weight="bold" className={styles.sectionTitle}>
          Theme
        </Text>
        <div className={styles.themeOptions}>
          <div className={styles.themeOption}>
            <Radio
              name="theme"
              value="platinum"
              checked={appearance.theme === 'platinum'}
              onChange={() => handleThemeChange('platinum')}
              label="Platinum"
            />
            <div className={styles.themePreview}>
              <div className={styles.platinumPreview} />
            </div>
          </div>
          <div className={styles.themeOption}>
            <Radio
              name="theme"
              value="graphite"
              checked={appearance.theme === 'graphite'}
              onChange={() => handleThemeChange('graphite')}
              label="Graphite"
            />
            <div className={styles.themePreview}>
              <div className={styles.graphitePreview} />
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Color Selection */}
      <section className={styles.section}>
        <Text variant="label" weight="bold" className={styles.sectionTitle}>
          Highlight Color
        </Text>
        <div className={styles.colorPicker}>
          {HIGHLIGHT_COLORS.map((color) => (
            <button
              key={color.id}
              type="button"
              className={`${styles.colorSwatch} ${
                appearance.highlightColor === color.id ? styles.colorSelected : ''
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => handleHighlightColorChange(color.id as HighlightColor)}
              title={color.name}
              aria-label={`Select ${color.name} highlight color`}
              aria-pressed={appearance.highlightColor === color.id}
            />
          ))}
        </div>
      </section>

      {/* Font Size */}
      <section className={styles.section}>
        <Text variant="label" weight="bold" className={styles.sectionTitle}>
          Font Size
        </Text>
        <div className={styles.fontSizeSlider}>
          <Text variant="small" color="secondary">Small</Text>
          <Slider
            value={fontSizeValue}
            min={0}
            max={2}
            step={1}
            onChange={handleFontSizeChange}
            aria-label="Font size"
          />
          <Text variant="small" color="secondary">Large</Text>
        </div>
      </section>
    </div>
  );
};

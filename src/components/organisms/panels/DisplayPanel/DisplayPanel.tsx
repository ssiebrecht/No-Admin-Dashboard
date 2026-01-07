/**
 * DisplayPanel Organism
 * Control panel for display settings
 */

import { type FC, useCallback } from 'react';
import { Text, Radio, Checkbox } from '../../../atoms';
import { Slider } from '../../../atoms/Slider';
import { useSettingsStore } from '../../../../store/settingsStore';
import { SCALING_OPTIONS } from '../../../../data/controlPanels';
import type { DisplayScaling } from '../../../../types/settings';
import styles from './DisplayPanel.module.css';

/**
 * DisplayPanel - Display settings control panel
 *
 * Allows customizing:
 * - Resolution mode (Best for display / Scaled)
 * - Scaling options (1x - 3x)
 * - Brightness
 * - Auto-adjust brightness
 */
export const DisplayPanel: FC = () => {
  const { settings, updateDisplay } = useSettingsStore();
  const { display } = settings;

  const handleScalingChange = useCallback(
    (scaling: DisplayScaling) => {
      updateDisplay({ scaling });
    },
    [updateDisplay]
  );

  const handleResetZoom = useCallback(() => {
    updateDisplay({ scaling: 1, brightness: 75 });
  }, [updateDisplay]);

  const handleBrightnessChange = useCallback(
    (brightness: number) => {
      updateDisplay({ brightness });
    },
    [updateDisplay]
  );

  const handleAutoAdjustChange = useCallback(
    (autoAdjustBrightness: boolean) => {
      updateDisplay({ autoAdjustBrightness });
    },
    [updateDisplay]
  );

  const isDefaultScaling = display.scaling === 1;

  return (
    <div className={styles.panel}>
      {/* Warning when zoom is > 1 */}
      {display.scaling > 1 && (
        <div className={styles.zoomWarning}>
          <span>⚠️ Zoom is at {display.scaling}x. UI may extend beyond viewport.</span>
          <button
            type="button"
            className={styles.resetButton}
            onClick={handleResetZoom}
          >
            Reset to 1x
          </button>
        </div>
      )}

      {/* Resolution Mode */}
      <section className={styles.section}>
        <Text variant="label" weight="bold" className={styles.sectionTitle}>
          Resolution
        </Text>
        <div className={styles.resolutionOptions}>
          <Radio
            name="resolution-mode"
            value="default"
            checked={isDefaultScaling}
            onChange={() => handleScalingChange(1)}
            label="Best for display"
          />
          <Radio
            name="resolution-mode"
            value="scaled"
            checked={!isDefaultScaling}
            onChange={() => handleScalingChange(1.5)}
            label="Scaled"
          />
        </div>
      </section>

      {/* Scaling Options */}
      <section className={styles.section}>
        <Text variant="label" weight="bold" className={styles.sectionTitle}>
          Scaling
        </Text>
        <div className={styles.scalingOptions}>
          {SCALING_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.scalingOption} ${
                display.scaling === option.value ? styles.scalingSelected : ''
              }`}
              onClick={() => handleScalingChange(option.value as DisplayScaling)}
              aria-pressed={display.scaling === option.value}
            >
              <div className={styles.scalingPreview}>
                <div
                  className={styles.scalingIcon}
                  style={{
                    transform: `scale(${0.5 + (option.value - 1) * 0.25})`,
                  }}
                >
                  🖥️
                </div>
              </div>
              <Text variant="small" weight="medium">
                {option.label}
              </Text>
              <Text variant="small" color="secondary">
                {option.description}
              </Text>
            </button>
          ))}
        </div>
      </section>

      {/* Brightness */}
      <section className={styles.section}>
        <Text variant="label" weight="bold" className={styles.sectionTitle}>
          Brightness
        </Text>
        <div className={styles.brightnessControl}>
          <Slider
            value={display.brightness}
            min={0}
            max={100}
            step={1}
            onChange={handleBrightnessChange}
            leftIcon="🌙"
            rightIcon="☀️"
            showValue
            disabled={display.autoAdjustBrightness}
            aria-label="Brightness"
          />
        </div>
        <Checkbox
          checked={display.autoAdjustBrightness}
          onChange={handleAutoAdjustChange}
          label="Automatically adjust brightness"
        />
      </section>

      {/* Display Info */}
      <section className={styles.section}>
        <Text variant="label" weight="bold" className={styles.sectionTitle}>
          Display Info
        </Text>
        <div className={styles.displayInfo}>
          <div className={styles.infoRow}>
            <Text variant="small" color="secondary">
              Resolution:
            </Text>
            <Text variant="small">1920 × 1080</Text>
          </div>
          <div className={styles.infoRow}>
            <Text variant="small" color="secondary">
              Refresh Rate:
            </Text>
            <Text variant="small">60 Hz</Text>
          </div>
          <div className={styles.infoRow}>
            <Text variant="small" color="secondary">
              Color Profile:
            </Text>
            <Text variant="small">sRGB IEC61966-2.1</Text>
          </div>
        </div>
      </section>
    </div>
  );
};

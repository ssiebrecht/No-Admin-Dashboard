/**
 * SoundPanel Organism
 * Control panel for sound settings
 */

import { type FC, useCallback } from 'react';
import { Text, Checkbox } from '../../../atoms';
import { Slider } from '../../../atoms/Slider';
import { useSettingsStore } from '../../../../store/settingsStore';
import { ALERT_SOUNDS } from '../../../../data/controlPanels';
import type { AlertSound } from '../../../../types/settings';
import styles from './SoundPanel.module.css';

/**
 * SoundPanel - Sound settings control panel
 *
 * Allows customizing:
 * - Output volume with mute toggle
 * - Alert sound selection
 * - Alert volume
 */
export const SoundPanel: FC = () => {
  const { settings, updateSound } = useSettingsStore();
  const { sound } = settings;

  const handleVolumeChange = useCallback(
    (outputVolume: number) => {
      updateSound({ outputVolume });
    },
    [updateSound]
  );

  const handleMuteChange = useCallback(
    (muted: boolean) => {
      updateSound({ muted });
    },
    [updateSound]
  );

  const handleAlertSoundChange = useCallback(
    (alertSound: AlertSound) => {
      updateSound({ alertSound });
      // Play a preview sound (simulated)
      console.log(`Playing alert sound: ${alertSound}`);
    },
    [updateSound]
  );

  const handleAlertVolumeChange = useCallback(
    (alertVolume: number) => {
      updateSound({ alertVolume });
    },
    [updateSound]
  );

  return (
    <div className={styles.panel}>
      {/* Output Volume */}
      <section className={styles.section}>
        <Text variant="label" weight="bold" className={styles.sectionTitle}>
          Output Volume
        </Text>
        <div className={styles.volumeControl}>
          <Slider
            value={sound.muted ? 0 : sound.outputVolume}
            min={0}
            max={100}
            step={1}
            onChange={handleVolumeChange}
            leftIcon="🔈"
            rightIcon="🔊"
            disabled={sound.muted}
            aria-label="Output volume"
          />
        </div>
        <Checkbox
          checked={sound.muted}
          onChange={handleMuteChange}
          label="Mute"
        />
      </section>

      {/* Alert Sounds */}
      <section className={styles.section}>
        <Text variant="label" weight="bold" className={styles.sectionTitle}>
          Alert Sounds
        </Text>
        <div className={styles.alertSoundList}>
          {ALERT_SOUNDS.map((alertSound) => (
            <button
              key={alertSound.id}
              type="button"
              className={`${styles.alertSoundItem} ${
                sound.alertSound === alertSound.id ? styles.selected : ''
              }`}
              onClick={() => handleAlertSoundChange(alertSound.id as AlertSound)}
              aria-selected={sound.alertSound === alertSound.id}
            >
              <span className={styles.soundIcon}>🔔</span>
              <Text variant="body">{alertSound.name}</Text>
            </button>
          ))}
        </div>
      </section>

      {/* Alert Volume */}
      <section className={styles.section}>
        <Text variant="label" weight="bold" className={styles.sectionTitle}>
          Alert Volume
        </Text>
        <div className={styles.volumeControl}>
          <Slider
            value={sound.alertVolume}
            min={0}
            max={100}
            step={1}
            onChange={handleAlertVolumeChange}
            leftIcon="🔕"
            rightIcon="🔔"
            showValue
            aria-label="Alert volume"
          />
        </div>
      </section>
    </div>
  );
};

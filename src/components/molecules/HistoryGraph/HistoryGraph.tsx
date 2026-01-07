/**
 * HistoryGraph Molecule
 * Classic Mac OS 8/9 line graph for historical data
 */

import { type FC, useMemo } from 'react';
import styles from './HistoryGraph.module.css';

export interface HistoryGraphProps {
  /** Primary data array (60 data points for 60 seconds) */
  data: number[];
  /** Secondary data array for dual-line graph */
  secondaryData?: number[];
  /** Maximum data points to display */
  maxPoints?: number;
  /** Graph height in pixels */
  height?: number;
  /** Primary line color */
  color?: string;
  /** Secondary line color */
  secondaryColor?: string;
  /** Maximum value for scaling (auto if not provided) */
  maxValue?: number;
  /** Show grid lines */
  showGrid?: boolean;
  /** Show time labels (-60s, Now) */
  showTimeLabels?: boolean;
  /** Fill under the line */
  filled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Accessible label */
  'aria-label'?: string;
}

/**
 * Generate SVG path for line graph
 */
const generatePath = (
  data: number[],
  width: number,
  height: number,
  maxValue: number,
  padding: number = 2
): string => {
  if (data.length === 0) return '';
  
  const effectiveHeight = height - padding * 2;
  const effectiveWidth = width - padding * 2;
  
  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * effectiveWidth;
    const y = padding + effectiveHeight - (value / maxValue) * effectiveHeight;
    return `${x},${y}`;
  });
  
  return `M${points.join('L')}`;
};

/**
 * Generate SVG path for filled area
 */
const generateFilledPath = (
  data: number[],
  width: number,
  height: number,
  maxValue: number,
  padding: number = 2
): string => {
  if (data.length === 0) return '';
  
  const effectiveHeight = height - padding * 2;
  const effectiveWidth = width - padding * 2;
  
  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * effectiveWidth;
    const y = padding + effectiveHeight - (value / maxValue) * effectiveHeight;
    return `${x},${y}`;
  });
  
  const firstX = padding;
  const lastX = padding + effectiveWidth;
  const bottomY = height - padding;
  
  return `M${firstX},${bottomY}L${points.join('L')}L${lastX},${bottomY}Z`;
};

/**
 * HistoryGraph - Time-series line graph
 *
 * Classic Mac OS style graph with:
 * - Grid background
 * - Single or dual line support
 * - Optional fill under line
 * - Auto-scaling Y-axis
 */
export const HistoryGraph: FC<HistoryGraphProps> = ({
  data,
  secondaryData,
  maxPoints = 60,
  height = 80,
  color = 'var(--color-highlight)',
  secondaryColor = 'var(--color-success)',
  maxValue: providedMaxValue,
  showGrid = true,
  showTimeLabels = true,
  filled = false,
  className = '',
  'aria-label': ariaLabel = 'History Graph',
}) => {
  const classNames = [
    styles.container,
    className,
  ].filter(Boolean).join(' ');

  // Limit data to maxPoints
  const limitedData = data.slice(-maxPoints);
  const limitedSecondaryData = secondaryData?.slice(-maxPoints);

  // Calculate max value for scaling
  const maxValue = useMemo(() => {
    if (providedMaxValue) return providedMaxValue;
    
    const allData = [
      ...limitedData,
      ...(limitedSecondaryData || []),
    ];
    
    const maxFromData = Math.max(...allData, 1);
    // Add 10% headroom and round up nicely
    return Math.ceil(maxFromData * 1.1 / 10) * 10;
  }, [limitedData, limitedSecondaryData, providedMaxValue]);

  // SVG dimensions
  const width = 300;
  const svgHeight = height;

  // Generate paths
  const primaryPath = generatePath(limitedData, width, svgHeight, maxValue);
  const primaryFilledPath = filled
    ? generateFilledPath(limitedData, width, svgHeight, maxValue)
    : '';
  
  const secondaryPath = limitedSecondaryData
    ? generatePath(limitedSecondaryData, width, svgHeight, maxValue)
    : '';
  const secondaryFilledPath = filled && limitedSecondaryData
    ? generateFilledPath(limitedSecondaryData, width, svgHeight, maxValue)
    : '';

  // Grid lines (4 horizontal lines)
  const gridLines = showGrid ? [0.25, 0.5, 0.75, 1].map((ratio) => ({
    y: 2 + (svgHeight - 4) * (1 - ratio),
    value: Math.round(maxValue * ratio),
  })) : [];

  return (
    <div
      className={classNames}
      style={{ height: `${height}px` }}
      role="img"
      aria-label={ariaLabel}
    >
      <svg
        className={styles.svg}
        viewBox={`0 0 ${width} ${svgHeight}`}
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {showGrid && (
          <g className={styles.grid}>
            {gridLines.map((line, index) => (
              <line
                key={index}
                x1="0"
                y1={line.y}
                x2={width}
                y2={line.y}
                className={styles.gridLine}
              />
            ))}
          </g>
        )}
        
        {/* Secondary data (drawn first, behind primary) */}
        {limitedSecondaryData && (
          <>
            {filled && (
              <path
                d={secondaryFilledPath}
                fill={secondaryColor}
                fillOpacity={0.2}
                className={styles.fillPath}
              />
            )}
            <path
              d={secondaryPath}
              stroke={secondaryColor}
              strokeWidth="1.5"
              fill="none"
              className={styles.linePath}
            />
          </>
        )}
        
        {/* Primary data */}
        {filled && (
          <path
            d={primaryFilledPath}
            fill={color}
            fillOpacity={0.3}
            className={styles.fillPath}
          />
        )}
        <path
          d={primaryPath}
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          className={styles.linePath}
        />
      </svg>
      
      {/* Y-axis labels */}
      {showGrid && (
        <div className={styles.yAxis}>
          {gridLines.reverse().map((line, index) => (
            <span
              key={index}
              className={styles.yLabel}
              style={{ top: `${line.y}px` }}
            >
              {line.value}
            </span>
          ))}
        </div>
      )}
      
      {/* Time labels */}
      {showTimeLabels && (
        <div className={styles.timeLabels}>
          <span className={styles.timeLabel}>-{maxPoints}s</span>
          <span className={styles.timeLabel}>Now</span>
        </div>
      )}
    </div>
  );
};

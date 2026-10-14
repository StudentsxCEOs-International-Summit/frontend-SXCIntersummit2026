import type React from 'react'

export const BLUE_COLOR_FILTER_ID = 'blue-color-filter'
export const BLUE_COLOR_FILTER_GLOW_ID = 'blue-color-filter-glow'

/**
 * Helper to get CSS style object for applying the blue filter to any element
 */
export function getBlueFilterStyle(filterId: string = BLUE_COLOR_FILTER_ID): React.CSSProperties {
  return {
    filter: `url(#${filterId})`,
    WebkitFilter: `url(#${filterId})`,
  }
}

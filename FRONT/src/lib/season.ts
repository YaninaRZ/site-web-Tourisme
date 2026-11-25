// Saisons : palettes du paysage de Riviera et teinte de fond associée.

export type Season = 'printemps' | 'ete' | 'automne' | 'hiver'

export interface Palette {
  /** Ciel (haut, bas) */
  s1: string
  s2: string
  sun: string
  /** Collines : lointaines, intermédiaires, proches */
  far: string
  mid: string
  near: string
  /** Mer (surface, profondeur) */
  e1: string
  e2: string
}

export const PALETTES: Record<Season, Palette> = {
  printemps: { s1: '#B8C9B0', s2: '#EFE3C6', sun: '#FFF3D6', far: '#9DB08E', mid: '#6E8560', near: '#2E3A2B', e1: '#6F8A8C', e2: '#16201F' },
  ete: { s1: '#EFAE86', s2: '#FBE3BF', sun: '#FFF5DE', far: '#D19A78', mid: '#A0634A', near: '#3A2419', e1: '#2F6F86', e2: '#0C1F28' },
  automne: { s1: '#C9A88A', s2: '#F3D9B5', sun: '#F8E6C8', far: '#B89176', mid: '#7B5D4B', near: '#3B2A22', e1: '#5B6B73', e2: '#141B20' },
  hiver: { s1: '#9FB3C4', s2: '#E4E2DA', sun: '#FFFFFF', far: '#8EA0B0', mid: '#5D7183', near: '#1C2631', e1: '#4E6577', e2: '#0E161E' },
}

/** Teinte de fond sombre de chaque saison */
export const TONES: Record<Season, string> = {
  printemps: '#2E3A2B',
  ete: '#3A2419',
  automne: '#33261A',
  hiver: '#1C2631',
}

export const SEASONS: Season[] = ['printemps', 'ete', 'automne', 'hiver']

export function seasonOf(date: Date): Season {
  const m = date.getMonth()
  if (m >= 2 && m <= 4) return 'printemps'
  if (m >= 5 && m <= 7) return 'ete'
  if (m >= 8 && m <= 10) return 'automne'
  return 'hiver'
}

export const currentSeason = seasonOf(new Date())

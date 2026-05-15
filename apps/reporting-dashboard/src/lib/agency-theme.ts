import type { AgencyTheme } from './types'

const themes: Record<string, AgencyTheme> = {
  clickflow: {
    slug: 'clickflow',
    name: 'Clickflow',
    domain: 'clickflow.dev',
    logo: '/logos/clickflow.svg',
    fontFamily: 'DM Sans',
    fontHeading: 'DM Sans',
    colors: {
      background: '#FAFAF8',
      foreground: '#1A1A18',
      accent: '#2D7A4F',
      accentForeground: '#ffffff',
      card: '#ffffff',
      cardBorder: '#E8E8E6',
      sidebar: '#1A1A18',
      sidebarText: '#ffffff',
    },
  },
  'acme-agency': {
    slug: 'acme-agency',
    name: 'Acme Agency',
    domain: 'acme-agency.example',
    logo: '/logos/acme-agency.svg',
    fontFamily: 'DM Sans',
    fontHeading: 'DM Sans',
    colors: {
      background: '#FAFAF8',
      foreground: '#1A1A18',
      accent: '#1A73E8',
      accentForeground: '#ffffff',
      card: '#ffffff',
      cardBorder: '#E8E8E6',
      sidebar: '#111827',
      sidebarText: '#ffffff',
    },
  },
  'beacon-brand': {
    slug: 'beacon-brand',
    name: 'Beacon Brand',
    domain: 'beaconbrand.example',
    logo: '/logos/beacon-brand.svg',
    fontFamily: 'DM Sans',
    fontHeading: 'DM Sans',
    colors: {
      background: '#FAFAF8',
      foreground: '#1A1A18',
      accent: '#8B5CF6',
      accentForeground: '#ffffff',
      card: '#ffffff',
      cardBorder: '#E8E8E6',
      sidebar: '#1A1A18',
      sidebarText: '#ffffff',
    },
  },
}

export function getAgencyTheme(slug: string): AgencyTheme {
  return themes[slug] || themes.clickflow
}

export function getAgencyThemeCSSVars(theme: AgencyTheme): Record<string, string> {
  return {
    '--color-background': theme.colors.background,
    '--color-foreground': theme.colors.foreground,
    '--color-accent': theme.colors.accent,
    '--color-accent-foreground': theme.colors.accentForeground,
    '--color-card': theme.colors.card,
    '--color-card-border': theme.colors.cardBorder,
    '--color-sidebar': theme.colors.sidebar,
    '--color-sidebar-text': theme.colors.sidebarText,
  }
}

import type * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = orchid fill (one per screen height), ghost = outline */
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** renders an <a> instead of a <button> */
  href?: string;
  icon?: 'arrow-down';
  /** B01 only: 4s breathing glow, lift on hover */
  breathe?: boolean;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface NavItem { label: string; href: string; current?: boolean }
export interface NavMenuProps { items: NavItem[]; onNavigate?: (item: NavItem, e: React.MouseEvent) => void; label?: string }
export declare function NavMenu(props: NavMenuProps): React.ReactElement;

export interface SiteHeaderProps { items: NavItem[]; scrolled?: boolean; onNavigate?: NavMenuProps['onNavigate']; onHome?: React.MouseEventHandler }
export declare function SiteHeader(props: SiteHeaderProps): React.ReactElement;

export interface SectionHeadingProps { eyebrow?: string; title: React.ReactNode; align?: 'start' | 'center'; as?: 'h1' | 'h2' | 'h3'; id?: string }
export declare function SectionHeading(props: SectionHeadingProps): React.ReactElement;

export interface NoticeBoxProps { title: string; children?: React.ReactNode }
export declare function NoticeBox(props: NoticeBoxProps): React.ReactElement;

export type SpeakerKind = 'pc' | '5' | '8';
export interface SpeakerArtProps { kind: SpeakerKind; decorative?: boolean; label?: string }
/** Temporary illustration until real product images exist. */
export declare function SpeakerArt(props: SpeakerArtProps): React.ReactElement;

export interface PlayControlProps { playing?: boolean; /** 0–100 */ progress?: number; onToggle?: React.MouseEventHandler }
export declare function PlayControl(props: PlayControlProps): React.ReactElement;

export interface CompareTileProps {
  kind: SpeakerKind;
  label?: string;
  state?: 'idle' | 'selected' | 'dimmed';
  playing?: boolean;
  progress?: number;
  onSelect?: React.MouseEventHandler;
  onToggle?: React.MouseEventHandler;
  style?: React.CSSProperties;
}
export declare function CompareTile(props: CompareTileProps): React.ReactElement;

export interface ModelCardProps { kind: '5' | '8'; name: string; children?: React.ReactNode; onOpen?: React.MouseEventHandler; style?: React.CSSProperties }
export declare function ModelCard(props: ModelCardProps): React.ReactElement;

export interface DetailPanelProps {
  kind: '5' | '8';
  name: string;
  imageSide?: 'left' | 'right';
  children?: React.ReactNode;
  onBuy?: React.MouseEventHandler;
  onTry?: React.MouseEventHandler;
  onClose?: React.MouseEventHandler;
  buyLabel?: string;
  tryLabel?: string;
  tryHref?: string;
}
export declare function DetailPanel(props: DetailPanelProps): React.ReactElement;

export interface DialogProps { open: boolean; title: string; children?: React.ReactNode; onClose?: () => void; closeLabel?: string }
export declare function Dialog(props: DialogProps): React.ReactElement | null;

export interface SiteFooterProps { items: NavItem[]; copyright?: string; onNavigate?: NavMenuProps['onNavigate']; onHome?: React.MouseEventHandler }
export declare function SiteFooter(props: SiteFooterProps): React.ReactElement;

declare global {
  interface Window {
    LowCore: {
      Button: typeof Button; NavMenu: typeof NavMenu; SiteHeader: typeof SiteHeader; SectionHeading: typeof SectionHeading;
      NoticeBox: typeof NoticeBox; SpeakerArt: typeof SpeakerArt; PlayControl: typeof PlayControl; CompareTile: typeof CompareTile;
      ModelCard: typeof ModelCard; DetailPanel: typeof DetailPanel; Dialog: typeof Dialog; SiteFooter: typeof SiteFooter;
    };
  }
}

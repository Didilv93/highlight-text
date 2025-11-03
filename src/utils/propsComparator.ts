export interface HighlightStyle {
  backgroundColor?: string;
  fontWeight?: string;
  color?: string;
}

export interface ComponentProps {
  search: string;
  caseSensitive?: boolean;
  className?: string;
  highlightClassName?: string;
  highlightStyle?: HighlightStyle;
  children: any;
}

export function arePropsEqual(prevProps: ComponentProps, nextProps: ComponentProps): boolean {
  if (
    prevProps.search !== nextProps.search ||
    prevProps.caseSensitive !== nextProps.caseSensitive ||
    prevProps.className !== nextProps.className ||
    prevProps.highlightClassName !== nextProps.highlightClassName
  ) {
    return false;
  }

  if (prevProps.highlightStyle !== nextProps.highlightStyle) {
    if (!prevProps.highlightStyle || !nextProps.highlightStyle) {
      return false;
    }

    if (
      prevProps.highlightStyle.backgroundColor !== nextProps.highlightStyle.backgroundColor ||
      prevProps.highlightStyle.color !== nextProps.highlightStyle.color ||
      prevProps.highlightStyle.fontWeight !== nextProps.highlightStyle.fontWeight
    ) {
      return false;
    }
  }

  if (prevProps.children !== nextProps.children) {
    return false;
  }

  return true;
}
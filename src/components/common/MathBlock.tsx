import { useEffect, useRef, type ReactNode } from 'react';
import katex from 'katex';

interface MathProps {
  children: ReactNode;
  display?: boolean;
  className?: string;
}

// Helper to flatten children into a string for KaTeX
function flattenChildren(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(flattenChildren).join('');
  if (children === null || children === undefined) return '';
  return '';
}

/**
 * Inline math component - renders LaTeX within text
 * Usage: <Math>x^2 + y^2 = z^2</Math>
 */
export function Math({ children, className = '' }: MathProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const latex = flattenChildren(children);

  useEffect(() => {
    if (ref.current && latex) {
      katex.render(latex, ref.current, {
        throwOnError: false,
        displayMode: false,
      });
    }
  }, [latex]);

  return <span ref={ref} className={`inline-block ${className}`} />;
}

/**
 * Block math component - renders LaTeX as centered display equation
 * Usage: <MathBlock>x^2 + y^2 = z^2</MathBlock>
 */
export function MathBlock({ children, className = '' }: MathProps) {
  const ref = useRef<HTMLDivElement>(null);
  const latex = flattenChildren(children);

  useEffect(() => {
    if (ref.current && latex) {
      katex.render(latex, ref.current, {
        throwOnError: false,
        displayMode: true,
      });
    }
  }, [latex]);

  return (
    <div
      ref={ref}
      className={`my-6 text-center text-lg overflow-x-auto ${className}`}
    />
  );
}

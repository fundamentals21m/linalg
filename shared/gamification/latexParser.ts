import katex from 'katex';

/**
 * LaTeX Parser and Renderer
 *
 * Uses katex to robustly parse and render LaTeX in quiz content.
 * Handles both inline ($...$) and display ($$...$$) math.
 */

export interface ParsedSegment {
  type: 'text' | 'inline-math' | 'display-math';
  content: string;
}

/**
 * Parse text containing LaTeX into segments
 */
export function parseLaTeX(text: string): ParsedSegment[] {
  if (!text) return [];

  const segments: ParsedSegment[] = [];
  let lastIndex = 0;

  // Find all LaTeX matches
  const matches: Array<{ type: string; latex: string; start: number; end: number }> = [];

  // Check for display math first ($$...$$)
  const displayRegex = /\$\$([^$]*?)\$\$/g;
  let match: RegExpExecArray | null;
  while ((match = displayRegex.exec(text)) !== null) {
    matches.push({
      type: 'display',
      latex: match[1],
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  // Check for inline math ($...$), excluding already matched display math
  const inlineRegex = /\$([^$]+?)\$/g;
  let inlineMatch: RegExpExecArray | null;
  while ((inlineMatch = inlineRegex.exec(text)) !== null) {
    const isOverlappingDisplay = matches.some(m =>
      inlineMatch!.index >= m.start && inlineMatch!.index < m.end
    );
    if (!isOverlappingDisplay) {
      matches.push({
        type: 'inline',
        latex: inlineMatch[1],
        start: inlineMatch.index,
        end: inlineMatch.index + inlineMatch[0].length,
      });
    }
  }

  // Sort matches by position
  matches.sort((a, b) => a.start - b.start);

  // Build segments
  matches.forEach(m => {
    const beforeText = text.slice(lastIndex, m.start);
    if (beforeText) {
      segments.push({ type: 'text', content: beforeText });
    }

    segments.push({
      type: m.type === 'display' ? 'display-math' : 'inline-math',
      content: m.latex,
    });

    lastIndex = m.end;
  });

  // Add remaining text after last match
  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return segments;
}

/**
 * Render LaTeX segments to HTML string
 */
export function renderLaTeX(text: string): string {
  if (!text) return '';

  const segments = parseLaTeX(text);

  return segments.map(segment => {
    if (segment.type === 'text') {
      return segment.content;
    } else if (segment.type === 'inline-math') {
      try {
        return katex.renderToString(segment.content, {
          throwOnError: false,
          displayMode: false,
        });
      } catch {
        return segment.content;
      }
    } else if (segment.type === 'display-math') {
      try {
        return katex.renderToString(segment.content, {
          throwOnError: false,
          displayMode: true,
        });
      } catch {
        return segment.content;
      }
    }
    return '';
  }).join('');
}

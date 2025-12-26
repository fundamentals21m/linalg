import katex from 'katex';
import DOMPurify from 'dompurify';

/**
 * LaTeX Parser and Renderer
 *
 * Uses katex to robustly parse and render LaTeX in quiz content.
 * Handles both inline ($...$) and display ($$...$$) math.
 * 
 * Security: All output is sanitized with DOMPurify as defense-in-depth,
 * in addition to HTML escaping of text segments.
 */

export interface ParsedSegment {
  type: 'text' | 'inline-math' | 'display-math';
  content: string;
}

/**
 * Escape HTML special characters to prevent XSS attacks
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
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
 * 
 * Security: Output is sanitized with DOMPurify to prevent XSS attacks.
 * KaTeX output is generally safe, but we apply DOMPurify as defense-in-depth.
 */
export function renderLaTeX(text: string): string {
  if (!text) return '';

  const segments = parseLaTeX(text);

  const rawHtml = segments.map(segment => {
    if (segment.type === 'text') {
      // Escape HTML in text segments to prevent XSS
      return escapeHtml(segment.content);
    } else if (segment.type === 'inline-math') {
      try {
        return katex.renderToString(segment.content, {
          throwOnError: false,
          displayMode: false,
        });
      } catch {
        // On KaTeX error, escape and return the raw content
        return escapeHtml(segment.content);
      }
    } else if (segment.type === 'display-math') {
      try {
        return katex.renderToString(segment.content, {
          throwOnError: false,
          displayMode: true,
        });
      } catch {
        // On KaTeX error, escape and return the raw content
        return escapeHtml(segment.content);
      }
    }
    return '';
  }).join('');

  // Final sanitization pass with DOMPurify for defense-in-depth
  return DOMPurify.sanitize(rawHtml, {
    // Allow KaTeX's SVG and styling elements
    ADD_TAGS: ['semantics', 'mrow', 'mi', 'mo', 'mn', 'msup', 'msub', 'mfrac', 'mroot', 'msqrt', 'mtext', 'annotation'],
    ADD_ATTR: ['encoding', 'mathvariant', 'stretchy', 'fence', 'separator', 'lspace', 'rspace'],
  });
}

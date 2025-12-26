import { describe, it, expect } from 'vitest';
import { parseLaTeX, renderLaTeX } from './latexParser';

describe('parseLaTeX', () => {
  it('should return empty array for empty string', () => {
    expect(parseLaTeX('')).toEqual([]);
  });

  it('should return empty array for null/undefined', () => {
    expect(parseLaTeX(null as unknown as string)).toEqual([]);
    expect(parseLaTeX(undefined as unknown as string)).toEqual([]);
  });

  it('should parse plain text', () => {
    const result = parseLaTeX('Hello world');
    expect(result).toEqual([{ type: 'text', content: 'Hello world' }]);
  });

  it('should parse inline math', () => {
    const result = parseLaTeX('The formula $x^2$ is quadratic');
    expect(result).toEqual([
      { type: 'text', content: 'The formula ' },
      { type: 'inline-math', content: 'x^2' },
      { type: 'text', content: ' is quadratic' },
    ]);
  });

  it('should parse display math', () => {
    const result = parseLaTeX('Consider $$\\sum_{i=1}^n i$$ the sum');
    expect(result).toEqual([
      { type: 'text', content: 'Consider ' },
      { type: 'display-math', content: '\\sum_{i=1}^n i' },
      { type: 'text', content: ' the sum' },
    ]);
  });

  it('should parse mixed inline and display math', () => {
    const result = parseLaTeX('Inline $a$ and display $$b$$');
    expect(result).toHaveLength(4);
    expect(result[1]).toEqual({ type: 'inline-math', content: 'a' });
    expect(result[3]).toEqual({ type: 'display-math', content: 'b' });
  });

  it('should not confuse display math with inline', () => {
    const result = parseLaTeX('$$x^2$$');
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('display-math');
    expect(result[0].content).toBe('x^2');
  });
});

describe('renderLaTeX', () => {
  it('should return empty string for empty input', () => {
    expect(renderLaTeX('')).toBe('');
  });

  it('should render plain text', () => {
    expect(renderLaTeX('Hello world')).toBe('Hello world');
  });

  it('should render inline math', () => {
    const result = renderLaTeX('The value $x$');
    expect(result).toContain('katex');
    expect(result).toContain('The value');
  });

  it('should render display math', () => {
    const result = renderLaTeX('Display: $$y$$');
    expect(result).toContain('katex');
    expect(result).toContain('Display:');
  });
});

describe('XSS Prevention', () => {
  it('should escape HTML in text segments', () => {
    const result = renderLaTeX('<script>alert("XSS")</script>');
    expect(result).not.toContain('<script>');
    expect(result).toContain('&lt;script&gt;');
  });

  it('should escape HTML entities in text', () => {
    const malicious = '<img src=x onerror="alert(1)">';
    const result = renderLaTeX(malicious);
    expect(result).not.toContain('<img');
    expect(result).toContain('&lt;img');
  });

  it('should not execute javascript: URLs', () => {
    const result = renderLaTeX('<a href="javascript:alert(1)">click</a>');
    expect(result).not.toContain('javascript:');
  });

  it('should sanitize event handlers', () => {
    const result = renderLaTeX('<div onclick="alert(1)">test</div>');
    expect(result).not.toContain('onclick');
  });

  it('should escape quotes in text', () => {
    const result = renderLaTeX('Test "quoted" and \'apostrophe\'');
    expect(result).toContain('&quot;');
    expect(result).toContain('&#x27;');
  });

  it('should escape ampersand in text', () => {
    const result = renderLaTeX('A & B');
    expect(result).toContain('&amp;');
  });

  it('should handle malicious LaTeX without script execution', () => {
    // LaTeX that might try to inject HTML via KaTeX output
    const result = renderLaTeX('$\\text{<script>alert(1)</script>}$');
    expect(result).not.toContain('<script>');
  });

  it('should sanitize SVG-based XSS attempts', () => {
    const result = renderLaTeX('<svg onload="alert(1)"><circle r="10"/></svg>');
    expect(result).not.toContain('onload');
  });

  it('should handle data: URL attempts', () => {
    const result = renderLaTeX('<a href="data:text/html,<script>alert(1)</script>">link</a>');
    // DOMPurify should strip or neutralize this
    expect(result).not.toContain('data:text/html');
  });

  it('should handle iframe injection attempts', () => {
    const result = renderLaTeX('<iframe src="https://evil.com"></iframe>');
    expect(result).not.toContain('<iframe');
  });

  it('should handle style-based XSS', () => {
    const result = renderLaTeX('<div style="background:url(javascript:alert(1))">test</div>');
    expect(result).not.toContain('javascript:');
  });

  it('should handle encoded XSS attempts', () => {
    // URL-encoded script tag
    const result = renderLaTeX('%3Cscript%3Ealert(1)%3C/script%3E');
    // Should be treated as plain text, not decoded
    expect(result).not.toContain('<script>');
  });

  it('should escape math content that fails to parse', () => {
    // Invalid LaTeX that will fall back to escaped text
    const result = renderLaTeX('$<script>$');
    expect(result).not.toContain('<script>');
  });
});

describe('Edge Cases', () => {
  it('should handle consecutive math expressions', () => {
    const result = renderLaTeX('$a$$b$$c$');
    expect(result).toContain('katex');
  });

  it('should handle empty math delimiters', () => {
    const result = renderLaTeX('Empty $$ inline');
    // Should not crash
    expect(result).toBeDefined();
  });

  it('should handle very long input', () => {
    const longText = 'x'.repeat(10000);
    const result = renderLaTeX(longText);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle unicode characters', () => {
    const result = renderLaTeX('Greek: $\\alpha$ and text: αβγ');
    expect(result).toContain('αβγ');
  });

  it('should handle newlines in text', () => {
    const result = renderLaTeX('Line 1\nLine 2');
    expect(result).toContain('Line 1');
    expect(result).toContain('Line 2');
  });

  it('should handle nested-looking dollar signs', () => {
    const result = renderLaTeX('Price: $100 and $200');
    // Should try to parse as math, may produce unexpected results but shouldn't crash
    expect(result).toBeDefined();
  });
});

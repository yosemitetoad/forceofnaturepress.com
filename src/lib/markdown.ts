import { marked } from 'marked';

/**
 * Parse markdown to HTML. For inline content (single paragraphs),
 * use parseInline to avoid wrapping in <p> tags.
 */
export async function md(text: string): Promise<string> {
  return await marked(text);
}

export async function mdInline(text: string): Promise<string> {
  return await marked.parseInline(text);
}

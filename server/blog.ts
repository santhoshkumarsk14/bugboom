import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date?: string;
  author?: string;
  tags?: string[];
  rawContent: string;
}

const BLOGS_DIR = path.join(process.cwd(), 'blogs');

function extractMetadataFromContent(content: string) {
  const lines = content.split('\n');
  let title = '';
  let description = '';
  
  // Extract title (first # heading)
  for (const line of lines) {
    if (line.startsWith('# ') && !title) {
      title = line.replace('# ', '').trim();
      break;
    }
  }
  
  // Extract description (look for meta description or first paragraph)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('*Meta Description:')) {
      description = line.replace('*Meta Description:', '').replace('*', '').trim();
      break;
    } else if (line.startsWith('**') && line.includes('look at') || line.includes('discover') || line.includes('follow')) {
      description = line.replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
      break;
    }
  }
  
  // If no description found, use first substantial paragraph
  if (!description) {
    for (const line of lines) {
      if (line.length > 100 && !line.startsWith('#') && !line.startsWith('*') && !line.startsWith('-')) {
        description = line.trim();
        break;
      }
    }
  }
  
  return { title, description };
}

function createSlugFromFilename(filename: string): string {
  return filename
    .replace('.md', '')
    .replace(/_/g, '-')
    .toLowerCase();
}

function extractTagsFromContent(content: string): string[] {
  const tags = [];
  const lowerContent = content.toLowerCase();
  
  // Extract tags based on content
  if (lowerContent.includes('bsf') || lowerContent.includes('black soldier fly')) tags.push('BSF');
  if (lowerContent.includes('sustainability') || lowerContent.includes('sustainable')) tags.push('sustainability');
  if (lowerContent.includes('singapore')) tags.push('singapore');
  if (lowerContent.includes('education') || lowerContent.includes('workshop')) tags.push('education');
  if (lowerContent.includes('startup') || lowerContent.includes('business')) tags.push('startup');
  if (lowerContent.includes('technology') || lowerContent.includes('innovation')) tags.push('technology');
  if (lowerContent.includes('middle east') || lowerContent.includes('expansion')) tags.push('expansion');
  if (lowerContent.includes('facility') || lowerContent.includes('vidacity')) tags.push('operations');
  if (lowerContent.includes('financial') || lowerContent.includes('revenue')) tags.push('business');
  if (lowerContent.includes('exhibition') || lowerContent.includes('mbs')) tags.push('events');
  
  return tags;
}

function extractDateFromContent(content: string, filename: string): string {
  // Try to extract date from content
  const dateRegex = /(?:august|july|june|may|april|march|february|january)\s+\d{4}/i;
  const match = content.match(dateRegex);
  if (match) {
    return new Date(match[0]).toISOString().split('T')[0];
  }
  
  // Default dates based on filename/content
  if (filename.includes('Chapter_1') || filename.includes('Foundation')) return '2024-12-15';
  if (filename.includes('Chapter_2') || filename.includes('Technical')) return '2025-01-20';
  if (filename.includes('Chapter_3') || filename.includes('Regulatory')) return '2025-02-15';
  if (filename.includes('Chapter_9') || filename.includes('Financial')) return '2025-07-10';
  if (filename.includes('Chapter_10') || filename.includes('Current_Status')) return '2025-08-15';
  if (filename.includes('BoomKits')) return '2025-08-01';
  if (filename.includes('Middle_East')) return '2025-08-05';
  if (filename.includes('Educational_Workshops')) return '2025-07-20';
  if (filename.includes('Facility') || filename.includes('Vidacity')) return '2025-05-15';
  if (filename.includes('MBS') || filename.includes('Exhibition')) return '2025-08-16';
  if (filename.includes('Chronicles')) return '2025-08-20';
  
  return '2025-08-01'; // Default date
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOGS_DIR)) {
    console.warn('Blogs directory not found:', BLOGS_DIR);
    return [];
  }

  const files = fs.readdirSync(BLOGS_DIR).filter(file => file.endsWith('.md'));
  
  const posts = files.map(file => {
    const filePath = path.join(BLOGS_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Try to parse frontmatter, but handle files without it
    const { data, content } = matter(fileContent);
    
    const { title, description } = extractMetadataFromContent(content);
    const slug = createSlugFromFilename(file);
    const tags = extractTagsFromContent(content);
    const date = data.date || extractDateFromContent(content, file);
    
    return {
      slug,
      title: data.title || title,
      description: data.description || description,
      content,
      date,
      author: data.author || 'BugBoom Team',
      tags: data.tags || tags,
      rawContent: fileContent
    };
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getBlogPost(slug: string): BlogPost | undefined {
  const posts = getAllBlogPosts();
  return posts.find(post => post.slug === slug);
}
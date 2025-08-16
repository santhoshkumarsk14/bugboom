// Import all blog markdown files
import BoomKitsContent from './blogs/BoomKits_The_Future_of_Household_BSF_Farming.md?raw';
import Chapter10Content from './blogs/Chapter_10_Current_Status_and_Future_Vision.md?raw';
import Chapter1Content from './blogs/Chapter_1_The_Foundation_KSIP_Victory_and_Early_Milestones.md?raw';
import Chapter2Content from './blogs/Chapter_2_Technical_Trials_TOGO_Equipment_and_BSF_Innovation.md?raw';
import Chapter3Content from './blogs/Chapter_3_Regulatory_Reality_Check_Navigating_the_Bureaucratic_Maze.md?raw';
import Chapter9Content from './blogs/Chapter_9_Financial_Milestones_and_Sustainability_Building_a_Business.md?raw';
import FacilityChallengesContent from './blogs/Facility_Challenges_and_Solutions_Vidacity_Experience.md?raw';
import MBSExhibitionContent from './blogs/MBS_Live_It_Up_Exhibition_Success_Story.md?raw';
import MiddleEastContent from './blogs/Middle_East_Expansion_Research_and_Strategy.md?raw';
import EducationalWorkshopsContent from './blogs/Scaling_Educational_Workshops_Singapore_Schools.md?raw';
import BugBoomChroniclesContent from './blogs/The_BugBoom_Chronicles_From_Larvae_to_Legacy.md?raw';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date?: string;
  author?: string;
  tags?: string[];
}

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
    } else if (line.startsWith('**') && (line.includes('look at') || line.includes('discover') || line.includes('follow'))) {
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

// Blog post data with imported content
const blogData = [
  { filename: 'BoomKits_The_Future_of_Household_BSF_Farming.md', content: BoomKitsContent },
  { filename: 'Chapter_10_Current_Status_and_Future_Vision.md', content: Chapter10Content },
  { filename: 'Chapter_1_The_Foundation_KSIP_Victory_and_Early_Milestones.md', content: Chapter1Content },
  { filename: 'Chapter_2_Technical_Trials_TOGO_Equipment_and_BSF_Innovation.md', content: Chapter2Content },
  { filename: 'Chapter_3_Regulatory_Reality_Check_Navigating_the_Bureaucratic_Maze.md', content: Chapter3Content },
  { filename: 'Chapter_9_Financial_Milestones_and_Sustainability_Building_a_Business.md', content: Chapter9Content },
  { filename: 'Facility_Challenges_and_Solutions_Vidacity_Experience.md', content: FacilityChallengesContent },
  { filename: 'MBS_Live_It_Up_Exhibition_Success_Story.md', content: MBSExhibitionContent },
  { filename: 'Middle_East_Expansion_Research_and_Strategy.md', content: MiddleEastContent },
  { filename: 'Scaling_Educational_Workshops_Singapore_Schools.md', content: EducationalWorkshopsContent },
  { filename: 'The_BugBoom_Chronicles_From_Larvae_to_Legacy.md', content: BugBoomChroniclesContent },
];

export const getAllBlogPosts = (): BlogPost[] => {
  const posts = blogData.map(({ filename, content }) => {
    const { title, description } = extractMetadataFromContent(content);
    const slug = createSlugFromFilename(filename);
    const tags = extractTagsFromContent(content);
    const date = extractDateFromContent(content, filename);
    
    return {
      slug,
      title,
      description,
      content,
      date,
      author: 'BugBoom Team',
      tags,
    };
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

export const getBlogPost = (slug: string): BlogPost | undefined => {
  const posts = getAllBlogPosts();
  return posts.find(post => post.slug === slug);
};
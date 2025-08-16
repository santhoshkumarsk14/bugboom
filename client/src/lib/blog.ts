export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date?: string;
  author?: string;
  tags?: string[];
}

export const getBlogPost = async (slug: string): Promise<BlogPost | undefined> => {
  try {
    const response = await fetch(`/api/blog/${slug}`);
    if (!response.ok) {
      return undefined;
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return undefined;
  }
};

export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch('/api/blog');
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};
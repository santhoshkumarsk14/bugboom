import { Link } from "wouter";
import { getAllBlogPosts, type BlogPost } from "@/lib/blog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavHeader } from "@/components/nav-header";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Search, Calendar, BookOpen, Tag, Filter, X, Beaker, Building2, Users, Globe, TrendingUp, Lightbulb, Settings, Award, Target } from "lucide-react";
import { motion } from "framer-motion";

// Function to get topic-related icons and colors
const getTopicIcon = (tags: string[] = []) => {
  const tagString = tags.join(' ').toLowerCase();
  
  if (tagString.includes('technical') || tagString.includes('technology')) {
    return { icon: Settings, color: 'text-blue-600', bg: 'bg-blue-100' };
  }
  if (tagString.includes('expansion') || tagString.includes('international')) {
    return { icon: Globe, color: 'text-purple-600', bg: 'bg-purple-100' };
  }
  if (tagString.includes('education') || tagString.includes('workshop')) {
    return { icon: Users, color: 'text-green-600', bg: 'bg-green-100' };
  }
  if (tagString.includes('startup') || tagString.includes('business')) {
    return { icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' };
  }
  if (tagString.includes('events') || tagString.includes('exhibition')) {
    return { icon: Award, color: 'text-yellow-600', bg: 'bg-yellow-100' };
  }
  if (tagString.includes('operations') || tagString.includes('facility')) {
    return { icon: Building2, color: 'text-gray-600', bg: 'bg-gray-100' };
  }
  if (tagString.includes('bsf') || tagString.includes('sustainability')) {
    return { icon: Beaker, color: 'text-emerald-600', bg: 'bg-emerald-100' };
  }
  
  // Default
  return { icon: Lightbulb, color: 'text-indigo-600', bg: 'bg-indigo-100' };
};

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: getAllBlogPosts,
  });

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts based on search and tag
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTag = selectedTag === null || post.tags?.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error loading blog posts</h1>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <NavHeader />
      <div className="container mx-auto px-4 py-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            BugBoom Chronicles
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Follow our journey in sustainable technology and black soldier fly farming - from startup challenges to global expansion
          </p>
          
          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-3xl font-bold text-gray-900">{posts.length}</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">Total Articles</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-center mb-2">
                <Tag className="h-6 w-6 text-blue-600 mr-2" />
                <span className="text-3xl font-bold text-gray-900">{allTags.length}</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">Topics Covered</p>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Tag Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filter by topic:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(null)}
                  className="text-xs"
                >
                  All Topics
                </Button>
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className="text-xs"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              {filteredPosts.length === posts.length 
                ? `Showing all ${posts.length} articles`
                : `Found ${filteredPosts.length} of ${posts.length} articles`
              }
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
        >
          {filteredPosts.map((post, index) => {
            const topicIcon = getTopicIcon(post.tags);
            const IconComponent = topicIcon.icon;
            
            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm border-gray-200 overflow-hidden">
                  {/* Topic Icon Header */}
                  <div className={`h-1 bg-gradient-to-r ${topicIcon.color.replace('text-', 'from-').replace('-600', '-400')} ${topicIcon.color.replace('text-', 'to-').replace('-600', '-600')}`}></div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-lg ${topicIcon.bg} flex-shrink-0`}>
                        <IconComponent className={`h-5 w-5 ${topicIcon.color}`} />
                      </div>
                      <div className="ml-3 flex-1">
                        <CardTitle className="line-clamp-2 text-lg leading-tight">
                          <Link href={`/blog/${post.slug}`} className="hover:text-green-600 transition-colors">
                            {post.title}
                          </Link>
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="line-clamp-3 text-gray-600">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                
                <CardContent className="flex-grow pb-3">
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs hover:bg-green-100 transition-colors">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="pt-0 border-t border-gray-100">
                  <div className="flex justify-between items-center w-full">
                    {post.date && (
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    )}
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-green-600 hover:text-green-800 font-medium text-sm hover:underline transition-colors"
                    >
                      Read more →
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
            );
          })}
        </motion.div>

        {/* No Results State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search terms or filter options</p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedTag(null);
              }}
              variant="outline"
            >
              Clear all filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
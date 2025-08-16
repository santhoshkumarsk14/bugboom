import { useRoute, Link } from "wouter";
import { getBlogPost, getAllBlogPosts, type BlogPost } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NavHeader } from "@/components/nav-header";
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useMemo } from "react";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', params?.slug],
    queryFn: () => params?.slug ? getBlogPost(params.slug) : Promise.resolve(undefined),
    enabled: !!params?.slug,
  });

  const { data: allPosts = [] } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: getAllBlogPosts,
  });

  // Get related posts based on shared tags
  const relatedPosts = useMemo(() => {
    if (!post || !allPosts.length) return [];
    
    const currentPostTags = post.tags || [];
    const related = allPosts
      .filter(p => p.slug !== post.slug)
      .map(p => ({
        ...p,
        sharedTags: (p.tags || []).filter(tag => currentPostTags.includes(tag)).length
      }))
      .filter(p => p.sharedTags > 0)
      .sort((a, b) => b.sharedTags - a.sharedTags)
      .slice(0, 3);
    
    return related;
  }, [post, allPosts]);

  // Estimate reading time
  const readingTime = useMemo(() => {
    if (!post?.content) return 0;
    const words = post.content.split(/\s+/).length;
    return Math.ceil(words / 200); // Assume 200 words per minute
  }, [post?.content]);

  if (!match || !params?.slug) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <NavHeader />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <NavHeader />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <NavHeader />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <NavHeader />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-5xl mx-auto">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link href="/blog">
              <Button variant="outline" className="mb-6 hover:bg-white/80 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Article Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-sm border mb-8"
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-600">
                  {post.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                  {post.author && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{readingTime} min read</span>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </div>
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="hover:bg-green-100 transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Description */}
                {post.description && (
                  <p className="text-lg text-gray-600 italic border-l-4 border-green-500 pl-4">
                    {post.description}
                  </p>
                )}
              </motion.div>
              
              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border overflow-hidden"
              >
                <div className="p-8 lg:p-12">
                  <div className="prose prose-lg lg:prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-green-600 hover:prose-a:text-green-800 prose-strong:text-gray-900 prose-blockquote:border-green-500 prose-blockquote:bg-green-50/50 prose-blockquote:p-4 prose-blockquote:rounded-lg prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100">
                    <ReactMarkdown>
                      {post.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </motion.div>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-12"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Card key={relatedPost.slug} className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base line-clamp-2">
                            <Link href={`/blog/${relatedPost.slug}`} className="hover:text-green-600 transition-colors">
                              {relatedPost.title}
                            </Link>
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {relatedPost.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            {relatedPost.date && (
                              <span className="text-sm text-gray-500">
                                {new Date(relatedPost.date).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            )}
                            <Link 
                              href={`/blog/${relatedPost.slug}`}
                              className="text-green-600 hover:text-green-800 text-sm font-medium"
                            >
                              Read →
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="sticky top-24 space-y-6"
              >
                {/* Table of Contents Placeholder */}
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Article Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reading time:</span>
                      <span className="font-medium">{readingTime} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Published:</span>
                      <span className="font-medium">
                        {post.date && new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    {post.tags && (
                      <div>
                        <span className="text-gray-600 block mb-2">Topics:</span>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Back to Blog CTA */}
                <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-gray-900 mb-2">Explore More Stories</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Discover more insights from our journey in sustainable technology
                    </p>
                    <Link href="/blog">
                      <Button className="w-full">
                        <BookOpen className="mr-2 h-4 w-4" />
                        View All Articles
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
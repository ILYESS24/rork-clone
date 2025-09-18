import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Eye, Download, Heart, ExternalLink, TrendingUp, Clock, Users, ShoppingCart, Crown, Zap, Award, Bookmark, Share2, MessageCircle, ThumbsUp, Tag, Calendar, ArrowUp } from 'lucide-react';

interface MarketplaceApp {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  tags: string[];
  likes: number;
  downloads: number;
  views: number;
  author: string;
  authorAvatar: string;
  price: number;
  isFree: boolean;
  rating: number;
  category: string;
  featured: boolean;
  trending: boolean;
  createdAt: string;
  updatedAt: string;
  premium: boolean;
  reviews: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  lastUpdated: string;
  version: string;
  compatibility: string[];
  support: boolean;
  documentation: boolean;
  sourceCode: boolean;
  customization: boolean;
  deployment: boolean;
}

export function RorkMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [priceFilter, setPriceFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [featureFilter, setFeatureFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', icon: '📦' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
    { id: 'portfolio', name: 'Portfolio', icon: '💼' },
    { id: 'blog', name: 'Blog & CMS', icon: '📝' },
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'landing', name: 'Landing Page', icon: '🚀' },
    { id: 'saas', name: 'SaaS', icon: '⚡' },
    { id: 'mobile', name: 'Mobile App', icon: '📱' }
  ];

  const [apps] = useState<MarketplaceApp[]>([
    {
      id: '1',
      name: 'Modern E-commerce Store',
      description: 'Complete online store with payment integration, inventory management, and admin dashboard',
      thumbnail: '/api/placeholder/400/250',
      tags: ['React', 'Stripe', 'Admin', 'Responsive'],
      likes: 1247,
      downloads: 892,
      views: 15680,
      author: 'DesignStudio Pro',
      authorAvatar: '/api/placeholder/40/40',
      price: 49,
      isFree: false,
      rating: 4.8,
      category: 'ecommerce',
      featured: true,
      trending: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      premium: true,
      reviews: 156,
      difficulty: 'Intermediate',
      estimatedTime: '2-3 hours',
      lastUpdated: '2024-01-20',
      version: '2.1.0',
      compatibility: ['React 18+', 'Node.js 16+', 'Modern Browsers'],
      support: true,
      documentation: true,
      sourceCode: true,
      customization: true,
      deployment: true
    },
    {
      id: '2',
      name: 'Portfolio Showcase',
      description: 'Elegant portfolio template with dark mode, animations, and contact form',
      thumbnail: '/api/placeholder/400/250',
      tags: ['Next.js', 'Tailwind', 'Animation', 'SEO'],
      likes: 892,
      downloads: 634,
      views: 12890,
      author: 'Creative Dev',
      authorAvatar: '/api/placeholder/40/40',
      price: 0,
      isFree: true,
      rating: 4.9,
      category: 'portfolio',
      featured: false,
      trending: true,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: '3',
      name: 'Analytics Dashboard',
      description: 'Professional dashboard with charts, tables, and real-time data visualization',
      thumbnail: '/api/placeholder/400/250',
      tags: ['Vue.js', 'Charts.js', 'Dashboard', 'Analytics'],
      likes: 2156,
      downloads: 1456,
      views: 23400,
      author: 'DataViz Studio',
      authorAvatar: '/api/placeholder/40/40',
      price: 79,
      isFree: false,
      rating: 4.7,
      category: 'dashboard',
      featured: true,
      trending: false,
      createdAt: '2024-01-08',
      updatedAt: '2024-01-22'
    },
    {
      id: '4',
      name: 'Startup Landing Page',
      description: 'High-converting landing page template perfect for SaaS startups',
      thumbnail: '/api/placeholder/400/250',
      tags: ['React', 'Landing', 'SaaS', 'Conversion'],
      likes: 743,
      downloads: 523,
      views: 9870,
      author: 'Startup Templates',
      authorAvatar: '/api/placeholder/40/40',
      price: 29,
      isFree: false,
      rating: 4.6,
      category: 'landing',
      featured: false,
      trending: true,
      createdAt: '2024-01-05',
      updatedAt: '2024-01-19'
    },
    {
      id: '5',
      name: 'Blog & CMS Platform',
      description: 'Headless CMS with markdown support, comments, and SEO optimization',
      thumbnail: '/api/placeholder/400/250',
      tags: ['Nuxt.js', 'CMS', 'Markdown', 'SEO'],
      likes: 634,
      downloads: 412,
      views: 8760,
      author: 'Content Creators',
      authorAvatar: '/api/placeholder/40/40',
      price: 39,
      isFree: false,
      rating: 4.5,
      category: 'blog',
      featured: false,
      trending: false,
      createdAt: '2024-01-03',
      updatedAt: '2024-01-17'
    },
    {
      id: '6',
      name: 'Task Management App',
      description: 'Kanban board with real-time collaboration and team management',
      thumbnail: '/api/placeholder/400/250',
      tags: ['React', 'Real-time', 'Collaboration', 'Tasks'],
      likes: 1456,
      downloads: 987,
      views: 18760,
      author: 'Productivity Co',
      authorAvatar: '/api/placeholder/40/40',
      price: 0,
      isFree: true,
      rating: 4.8,
      category: 'saas',
      featured: true,
      trending: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-21'
    }
  ]);

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'free' && app.isFree) ||
                        (priceFilter === 'paid' && !app.isFree);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedApps = [...filteredApps].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return b.downloads - a.downloads;
      case 'popular':
        return b.likes - a.likes;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">App Marketplace</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover and deploy pre-built applications created by our community. 
              Find the perfect template for your next project.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search apps, templates, or developers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Select category"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>

              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="free">Free Only</option>
                <option value="paid">Paid Only</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="trending">Trending</option>
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Apps</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedApps.filter(app => app.featured).map((app) => (
              <div key={app.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200">
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">🚀</div>
                  </div>
                  <div className="absolute top-3 left-3 flex space-x-2">
                    {app.featured && (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Featured
                      </span>
                    )}
                    {app.trending && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        Trending
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{app.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <img src={app.authorAvatar} alt={app.author} className="w-5 h-5 rounded-full" />
                        <span>{app.author}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {app.isFree ? 'Free' : `$${app.price}`}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {app.rating}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{app.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {app.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                    {app.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{app.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {app.views.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {app.downloads.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {app.likes.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium">
                      {app.isFree ? 'Use Template' : 'Buy Now'}
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Filters Section */}
      {showFilters && (
        <div className="px-6 py-4 bg-gray-50 border-t">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select 
                  value={difficultyFilter} 
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Features Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                <select 
                  value={featureFilter} 
                  onChange={(e) => setFeatureFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Features</option>
                  <option value="support">With Support</option>
                  <option value="documentation">With Documentation</option>
                  <option value="sourceCode">With Source Code</option>
                  <option value="deployment">With Deployment</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-end">
                <div className="flex bg-gray-200 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="flex items-end">
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                  <ShoppingCart className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    {cart.length} in cart
                  </span>
                  {cart.length > 0 && (
                    <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                      Checkout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Apps Section */}
      <div className="px-6 py-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900">All Apps</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-500">{sortedApps.length} apps found</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setFavorites([])}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>{favorites.length} saved</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedApps.map((app) => (
              <div key={app.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-200">
                {/* Thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl">🚀</div>
                  </div>
                  <div className="absolute top-2 left-2 flex space-x-1">
                    {app.trending && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        Trending
                      </span>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button 
                      onClick={() => {
                        if (favorites.includes(app.id)) {
                          setFavorites(favorites.filter(id => id !== app.id));
                        } else {
                          setFavorites([...favorites, app.id]);
                        }
                      }}
                      className={`p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors ${
                        favorites.includes(app.id) ? 'text-red-500' : 'text-gray-600'
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${favorites.includes(app.id) ? 'fill-current' : ''}`} />
                    </button>
                    {app.premium && (
                      <div className="p-1.5 bg-yellow-400/90 backdrop-blur-sm rounded-full">
                        <Crown className="w-3 h-3 text-yellow-800" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{app.name}</h3>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        {app.isFree ? 'Free' : `$${app.price}`}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{app.description}</p>
                  
                  {/* Author */}
                  <div className="flex items-center space-x-2 mb-3">
                    <img src={app.authorAvatar} alt={app.author} className="w-4 h-4 rounded-full" />
                    <span className="text-xs text-gray-500">{app.author}</span>
                    <div className="flex items-center text-xs text-gray-500">
                      <Star className="w-3 h-3 text-yellow-400 mr-1" />
                      {app.rating}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="flex items-center">
                      <Download className="w-3 h-3 mr-1" />
                      {app.downloads.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      {app.likes.toLocaleString()}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {app.support && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Support</span>}
                    {app.documentation && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Docs</span>}
                    {app.sourceCode && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Source</span>}
                    {app.deployment && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Deploy</span>}
                  </div>

                  {/* Difficulty & Time */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className={`px-2 py-1 rounded-full ${
                      app.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      app.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {app.difficulty}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {app.estimatedTime}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        if (cart.includes(app.id)) {
                          setCart(cart.filter(id => id !== app.id));
                        } else {
                          setCart([...cart, app.id]);
                        }
                      }}
                      className={`flex-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                        cart.includes(app.id) 
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                      }`}
                    >
                      {cart.includes(app.id) ? 'In Cart' : (app.isFree ? 'Use Template' : 'Add to Cart')}
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedApps.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No apps found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="px-6 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Marketplace Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Apps</p>
                  <p className="text-2xl font-bold text-gray-900">{apps.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>+12% this month</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Premium Apps</p>
                  <p className="text-2xl font-bold text-gray-900">{apps.filter(app => app.premium).length}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Crown className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>+8% this month</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Downloads</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {apps.reduce((sum, app) => sum + app.downloads, 0).toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Download className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>+24% this month</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Authors</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(apps.map(app => app.author)).size}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>+15% this month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 py-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {apps.slice(0, 5).map((app, index) => (
              <div key={app.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <div className="text-xl">🚀</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{app.name}</h4>
                  <p className="text-sm text-gray-600">by {app.author}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{app.downloads} downloads</p>
                  <p className="text-xs text-gray-500">{app.updatedAt}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{app.rating}</span>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

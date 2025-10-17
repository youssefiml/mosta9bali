import { useEffect, useState } from 'react';
import { Calendar, User, Tag, ArrowRight, BookOpen, X } from 'lucide-react';
import blogsData from '../data/blogs.json';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    setBlogs(blogsData);
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'Study Tips': 'bg-blue-100 text-blue-700',
      'Admissions': 'bg-green-100 text-green-700',
      'Career Planning': 'bg-purple-100 text-purple-700',
      'Wellness': 'bg-pink-100 text-pink-700',
      'International': 'bg-amber-100 text-amber-700',
      'Financial Aid': 'bg-teal-100 text-teal-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-100 text-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-center flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">Educational Blogs</h1>
            <p className="text-xl opacity-90">Expert insights and advice for your academic success</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getCategoryColor(blog.category)}`}>
                    {blog.category}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                  {blog.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {blog.preview}
                </p>

                <div className="flex flex-col gap-2 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedBlog(blog)}
                  className="flex items-center gap-2 text-blue-600 font-medium text-sm hover:gap-3 transition-all group"
                >
                  Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blog Details Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${getCategoryColor(selectedBlog.category)}`}>
                  {selectedBlog.category}
                </span>
                <button 
                  onClick={() => setSelectedBlog(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <h2 className="text-3xl font-bold text-gray-900">{selectedBlog.title}</h2>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{selectedBlog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(selectedBlog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {selectedBlog.preview}
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Takeaways</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Important point 1 about {selectedBlog.title}</li>
                  <li>Critical insight about {selectedBlog.category}</li>
                  <li>Practical advice for implementation</li>
                  <li>Additional resources and next steps</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-6 border-t border-gray-200">
                <Tag className="w-4 h-4 text-gray-400" />
                <div className="flex gap-2">
                  {['Education', 'Learning', selectedBlog.category, 'Tips'].map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import {
  MessageCircle,
  ThumbsUp,
  User,
  Clock,
  Users,
  Send,
  X,
  Plus,
  Tag as TagIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import communityData from '../data/community.json';

export default function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({
    topic: '',
    category: 'Academic Advice',
    message: '',
  });
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    setPosts(communityData);
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'Academic Advice': 'bg-blue-100 text-blue-700',
      'Study Groups': 'bg-green-100 text-green-700',
      'Resources': 'bg-purple-100 text-purple-700',
      'Social': 'bg-pink-100 text-pink-700',
      'Career': 'bg-amber-100 text-amber-700',
      'Grad School': 'bg-teal-100 text-teal-700',
      'Jobs': 'bg-orange-100 text-orange-700',
      'Wellness': 'bg-rose-100 text-rose-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-100 text-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-center flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4">Student Community</h1>
          <p className="text-xl opacity-90">Connect, share, and learn together with students worldwide</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button 
            onClick={() => setShowNewPost(true)}
            className="w-full px-6 py-4 bg-white border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-purple-400 hover:text-purple-600 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Start a New Discussion
          </button>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {post.avatar}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-gray-900">{post.username}</span>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeAgo(post.timestamp)}</span>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {post.topic}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {post.message}
                  </p>

                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors group">
                      <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{post.replies} replies</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-pink-600 transition-colors group">
                      <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{post.likes} likes</span>
                    </button>
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors ml-auto"
                    >
                      Join Discussion
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Start a New Discussion</h3>
                <button 
                  onClick={() => setShowNewPost(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                const newPostData = {
                  ...newPost,
                  id: Date.now(),
                  username: user?.name || 'Anonymous',
                  avatar: user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'A',
                  replies: 0,
                  likes: 0,
                  timestamp: new Date().toISOString(),
                };
                setPosts([newPostData, ...posts]);
                setShowNewPost(false);
                setNewPost({ topic: '', category: 'Academic Advice', message: '' });
              }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                  <input
                    type="text"
                    required
                    value={newPost.topic}
                    onChange={(e) => setNewPost(prev => ({ ...prev, topic: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option>Academic Advice</option>
                    <option>Study Groups</option>
                    <option>Resources</option>
                    <option>Social</option>
                    <option>Career</option>
                    <option>Grad School</option>
                    <option>Jobs</option>
                    <option>Wellness</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    required
                    value={newPost.message}
                    onChange={(e) => setNewPost(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Share your thoughts..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Post Discussion
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Discussion Details Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getCategoryColor(selectedPost.category)}`}>
                    {selectedPost.category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">{selectedPost.topic}</h2>
                </div>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {selectedPost.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{selectedPost.username}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{formatTimeAgo(selectedPost.timestamp)}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{selectedPost.message}</p>
                </div>
              </div>

              <div className="py-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Join the Discussion</h3>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'A'}
                    </div>
                  </div>
                  <form className="flex-1" onSubmit={(e) => {
                    e.preventDefault();
                    // Add comment logic here
                    setSelectedPost({
                      ...selectedPost,
                      replies: selectedPost.replies + 1
                    });
                    setNewComment('');
                  }}>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Add your comment..."
                      />
                      <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Sample comments */}
              <div className="pt-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    JD
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">John Doe</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-gray-600">Great discussion! I completely agree with your points.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

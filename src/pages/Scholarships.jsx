import { useEffect, useState } from 'react';
import { 
  MapPin, 
  GraduationCap, 
  DollarSign, 
  Calendar, 
  ExternalLink, 
  Award,
  FileText,
  Mail,
  User,
  Phone,
  X,
  Check
} from 'lucide-react';
import scholarshipsData from '../data/scholarships.json';

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    motivation: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setScholarships(scholarshipsData);
  }, []);

  const getLevelColor = (level) => {
    const colors = {
      'Graduate': 'bg-blue-100 text-blue-700',
      'Masters': 'bg-green-100 text-green-700',
      'PhD': 'bg-purple-100 text-purple-700',
      'Postdoc': 'bg-amber-100 text-amber-700',
      'Undergraduate': 'bg-pink-100 text-pink-700'
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
  };

  const isDeadlineSoon = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysUntil = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return daysUntil <= 60;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-100 text-black py-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-center flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4">Scholarship Opportunities</h1>
          <p className="text-xl opacity-90">Fund your academic dreams with scholarships from around the globe</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getLevelColor(scholarship.level)}`}>
                    {scholarship.level}
                  </span>
                  {isDeadlineSoon(scholarship.deadline) && (
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-700">
                      Deadline Soon
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {scholarship.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {scholarship.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>{scholarship.country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="font-medium">{scholarship.amount}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedScholarship(scholarship)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Apply Now <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scholarship Application Modal */}
      {selectedScholarship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              {!submitted ? (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${getLevelColor(selectedScholarship.level)}`}>
                        {selectedScholarship.level}
                      </span>
                      <h2 className="text-2xl font-bold text-gray-900 mt-2">{selectedScholarship.title}</h2>
                    </div>
                    <button 
                      onClick={() => setSelectedScholarship(null)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span>{selectedScholarship.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span>{selectedScholarship.amount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-purple-500" />
                      <span>{selectedScholarship.level}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-red-500" />
                      <span>Deadline: {new Date(selectedScholarship.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={applicationForm.fullName}
                          onChange={(e) => setApplicationForm(prev => ({ ...prev, fullName: e.target.value }))}
                          className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={applicationForm.email}
                          onChange={(e) => setApplicationForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          required
                          value={applicationForm.phone}
                          onChange={(e) => setApplicationForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Education Level</label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={applicationForm.education}
                          onChange={(e) => setApplicationForm(prev => ({ ...prev, education: e.target.value }))}
                          className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="e.g., Bachelor's in Computer Science"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Motivation Letter</label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <textarea
                          required
                          value={applicationForm.motivation}
                          onChange={(e) => setApplicationForm(prev => ({ ...prev, motivation: e.target.value }))}
                          rows={4}
                          className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="Tell us why you're applying for this scholarship..."
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      Submit Application
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for applying to {selectedScholarship.title}. We'll review your application and contact you soon.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedScholarship(null);
                      setSubmitted(false);
                      setApplicationForm({
                        fullName: '',
                        email: '',
                        phone: '',
                        education: '',
                        motivation: '',
                      });
                    }}
                    className="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

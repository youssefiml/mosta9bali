import { useEffect, useState } from 'react';
import { MapPin, GraduationCap, Mail, TrendingUp, Globe, Award, School, Users, X } from 'lucide-react';
// import schoolsData from '../data/schools.json';

export default function Schools() {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);

  useEffect(() => {
fetch('http://localhost:5000/api/schools')
    .then(res => res.json())
    .then(data => setSchools(data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-100 text-black py-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-center flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4">Top Universities Worldwide</h1>
          <p className="text-xl opacity-90">Discover leading institutions and find your perfect academic match</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {schools.map((school) => (
            <div
              key={school.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{school.name}</h2>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{school.city}, {school.country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-sm">{school.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-blue-600">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-2xl font-bold">{school.acceptance}</span>
                  </div>
                  <span className="text-xs text-gray-500">Acceptance Rate</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Popular Programs</h3>
                <div className="flex flex-wrap gap-2">
                  {school.programs.map((program, index) => (
                    <span
                      key={index}
                      className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200"
                    >
                      {program}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{school.contact}</span>
                </div>
                <button 
                  onClick={() => setSelectedSchool(school)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* School Details Modal */}
      {selectedSchool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <h2 className="text-3xl font-bold text-gray-900">{selectedSchool.name}</h2>
                <button 
                  onClick={() => setSelectedSchool(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Overview</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span>{selectedSchool.city}, {selectedSchool.country}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <School className="w-4 h-4 text-green-500" />
                        <span>{selectedSchool.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>Acceptance Rate: {selectedSchool.acceptance}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Popular Programs</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSchool.programs.map((program, index) => (
                        <span
                          key={index}
                          className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200"
                        >
                          {program}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4 text-blue-500" />
                        <a href={`mailto:${selectedSchool.contact}`} className="hover:text-blue-600">
                          {selectedSchool.contact}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Globe className="w-4 h-4 text-blue-500" />
                        <a href="#" className="hover:text-blue-600">Visit Website</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-600">Student Body</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-900">25,000+</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <GraduationCap className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">Graduation Rate</span>
                        </div>
                        <p className="text-2xl font-bold text-green-900">94%</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Campus Life</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Experience a vibrant campus community with state-of-the-art facilities, diverse student organizations,
                      and numerous opportunities for personal and professional growth. Our university offers modern
                      accommodation, extensive research facilities, and a supportive environment for academic excellence.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Process</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="font-medium">1.</span>
                        Submit online application
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium">2.</span>
                        Provide academic transcripts
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium">3.</span>
                        Submit standardized test scores
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-medium">4.</span>
                        Letters of recommendation
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Start Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

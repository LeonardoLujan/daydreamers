'use client';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { MakePostRequest } from '../../shared/http'

export default function login2() {


  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    
    try {

      let response = await MakePostRequest('/profile/profile/', formData);
      if(response.status != 201) {
        alert('Something went wrong!');
        return;
      }
      response = await response.json()

      router.push('/journal')
    } catch (error) {
      
    }

  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-display font-bold text-gray-900">
                    Create Your Character
                </h1>
                <p className="mt-2 text-gray-600">
                    Tell us about your story's protagonist
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                    {/* Protagonist Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Protagonist Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Ooogle Boogle"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                transition-all duration-200"
                            required
                        />
                    </div>

                    {/* Age Field */}
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                            Age
                        </label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            placeholder="25"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                transition-all duration-200"
                            required
                        />
                    </div>

                    {/* Appearance Field */}
                    <div>
                        <label htmlFor="appearance" className="block text-sm font-medium text-gray-700 mb-1">
                            Appearance
                        </label>
                        <input
                            type="text"
                            name="appearance"
                            id="appearance"
                            placeholder="Eg. Tall, black hair, wears glasses"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                transition-all duration-200"
                            required
                        />
                    </div>

                    {/* Interests Field */}
                    <div>
                        <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
                            Interests
                        </label>
                        <textarea
                            name="interests"
                            id="interests"
                            rows="4"
                            placeholder="Gaming, Fortnite, nature, Fall Season etc."
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 placeholder-gray-400
                                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                                transition-all duration-200 resize-none"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                            text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2
                            focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 font-medium"
                    >
                        Create Profile
                    </button>
                </div>
            </form>

            {/* Tips Section */}
            <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Tips for better stories:</h3>
                <ul className="text-xs text-gray-500 space-y-1">
                    <li className="flex items-center">
                        <svg className="h-3 w-3 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Be specific about appearance details
                    </li>
                    <li className="flex items-center">
                        <svg className="h-3 w-3 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Include unique personality traits
                    </li>
                </ul>
            </div>
        </div>
    </div>
)
}
'use client'

import { useRouter } from 'next/navigation'
import { SERVER_HOST } from '../../shared/const'

export default function Search() {
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = formData.get('name')
    
    try {
      let response = await fetch(SERVER_HOST + 'profile/password_less_login/' + name + '/', {
        method: 'POST',
        body: formData,
      })

      response = await response.json()
      const token = response.token
      localStorage.setItem("token", token)

      if(response.profile) {
        router.push('/journal')
      } else {
        router.push('/login2')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h1 className="text-center text-3xl font-display font-bold text-gray-900">
            Welcome to DayCanvas
          </h1>
          <p className="mt-3 text-center text-gray-600">
            Where your journal entries transform into visual stories
          </p>
          <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              ✨ AI-Powered Storytelling
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="name"
                name="name"
                type="text"
                required
                className="block w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 font-medium"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-purple-300 group-hover:text-purple-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Continue
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Experience the magic of AI-transformed journaling
            </p>
          </div>

          {/* Features Section */}
          <div className="pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600">Visual Stories</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600">AI Generated Art</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600">Daily Journaling</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-600">Personal Stories</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
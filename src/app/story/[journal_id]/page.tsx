'use client'
import { useParams, useRouter } from 'next/navigation';
import Header from "@/components/header";
import { useEffect, useState } from 'react';
import { MakeGetRequest } from '@/shared/http';
import Link from 'next/link';
import { SERVER_HOST } from '@/shared/const';

const FormattedDate = ({ date }) => {
    return (
        <p className="text-gray-600">
            Written on {new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}
        </p>
    )
}

export default function Story() {
    const router = useRouter()
    const params = useParams()
    const [journal, setJournal] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const result = await (await MakeGetRequest("/story/journal/" + params.journal_id + '/', null)).json();
                setJournal(result)
                setLoading(false)
            } catch (err: any) {
                setError(err.message)
                setLoading(false)
            }
        }

        if (params.journal_id) {
            fetchStory()
        }
    }, [params.journal_id])

    // Function for programmatic navigation
    //   const navigateToStory = (storyId) => {
    //     router.push(`/story/${storyId}`)
    //   }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="text-gray-600">Loading story...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6 text-red-500 bg-red-50 rounded-lg">
                <p>Error loading story: {error}</p>
            </div>
        )
    }

    if (!journal) {
        return (
            <div className="p-6 text-gray-600">
                <p>Story not found.</p>
                <Link
                    href="/story/journal"
                    className="text-blue-500 hover:underline mt-4 inline-block"
                >
                    Return to Stories
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 space-y-2">
                    <h1 className="text-4xl font-display font-bold text-gray-900">
                        Your Story
                    </h1>
                    <FormattedDate date={journal.date} />


                </div>
    
                {/* Summary Section */}
                {journal.storyline ? (
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                        <h2 className="text-2xl font-display font-semibold mb-4">Story Summary</h2>
                        <p className="text-gray-700 leading-relaxed">
                            {journal.storyline.summary}
                        </p>
                    </div>
                ) : (
                    <div className="bg-purple-50 rounded-xl p-6 mb-8 border border-purple-100">
                        <div className="flex items-center space-x-3">
                            <svg className="animate-spin h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="text-purple-700">AI is crafting your story...</p>
                        </div>
                    </div>
                )}
    
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Journal Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-display font-semibold mb-4">Journal Entry</h2>
                            <div className="prose prose-purple max-w-none">
                                <p className="whitespace-pre-line text-gray-700">
                                    {journal.journal}
                                </p>
                            </div>
                        </div>
                    </div>
    
                    {/* Story Frames Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-display font-semibold mb-6">Visual Story</h2>
                            
                            {journal.storyline ? (
                                <div className="space-y-8">
                                    {journal.storyline.frames.map((frame, index) => (
                                        <div key={frame.id} className="flex flex-col md:flex-row items-start gap-6 pb-8 border-b border-gray-100 last:border-0">
                                            <div className="md:w-1/2">
                                                <span className="text-xs font-medium text-purple-600 mb-2 block">
                                                    Scene {index + 1}
                                                </span>
                                                <p className="text-gray-700">
                                                    {frame.story}
                                                </p>
                                            </div>
                                            
                                            <div className="md:w-1/2">
                                                {frame.image ? (
                                                    <img
                                                        src={SERVER_HOST + '/' + frame.image}
                                                        alt={`Scene ${index + 1}`}
                                                        className="rounded-lg shadow-sm w-full"
                                                    />
                                                ) : (
                                                    <div className="bg-gray-50 rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
                                                        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <p className="text-gray-500 text-sm text-center">
                                                            Image generation in progress...
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    <p className="text-gray-500">Story generation in progress...</p>
                                    <p className="text-sm text-gray-400 mt-2">Please check back in a few moments</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
    
                <div className="flex justify-center mt-8">
                    <button 
                        onClick={() => router.push('/journal')}
                        className="px-6 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 text-gray-900 font-display font-semibold flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Journal
                    </button>
                </div>
            </div>
        </div>
    )
}
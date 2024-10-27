'use client'

import Header from "@/components/header"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MakeGetRequest } from "@/shared/http"

interface Frame {
    id: number
    story: string
    image_gen_prompt: string
    image: string | null
}

interface Storyline {
    id: number
    title: string
    summary: string
    frames: Frame[]
    frame_count: number
}

interface Story {
    id: number
    user: number
    date: string
    updated_on: string
    created_on: string
    journal: string
    journal_images: string[]
    storyline: Storyline | null
}

export default function Profile() {
    const router = useRouter()
    const [stories, setStories] = useState<Story[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const result = await (await MakeGetRequest("/story/journal/", null)).json()
                setStories(result)
                setLoading(false)
            } catch (err: any) {
                setError(err.message)
                setLoading(false)
            }
        }

        fetchStories()
    }, [])

    const StorylinePreview = ({ storyline }: { storyline: Storyline | null }) => {
        if (!storyline) {
            return (
                <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg p-6">
                    <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-gray-500 text-center">Story is being generated...</p>
                    <button 
                        className="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
                        onClick={() => window.location.reload()}
                    >
                        Refresh to check status
                    </button>
                </div>
            )
        }

        return (
            <div className="h-full bg-white rounded-lg p-6 space-y-4">
                <h3 className="font-display text-xl font-semibold">{storyline.title}</h3>
                <p className="text-gray-600 text-sm">{storyline.summary}</p>
                
                {/* {storyline.frames && storyline.frames.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {storyline.frames.map((frame, index) => (
                            <div key={frame.id} className="space-y-2">
                                {frame.image ? (
                                    <img 
                                        src={frame.image} 
                                        alt={`Frame ${index + 1}`}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <p className="text-gray-400 text-sm text-center">
                                            Image generating...
                                        </p>
                                    </div>
                                )}
                                <p className="text-sm text-gray-600 line-clamp-2">{frame.story}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-500 text-center">
                        Frames are being generated...
                    </div>
                )} */}
            </div>
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="flex items-center justify-center h-[calc(100vh-80px)]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-50 rounded-lg shadow-sm">
                    <p className="text-red-600 font-medium">Error loading stories: {error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-display font-bold text-gray-900">My Journal Entries</h1>
                    <button 
                        onClick={() => router.push('/journal/journalcomp')}
                        className="bg-black text-white font-display font-semibold px-6 py-3 rounded-lg
                            hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Create New Journal
                    </button>
                </div>

                {(!stories || stories.length === 0) && (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <p className="text-xl font-display text-gray-600">No journal entries yet.</p>
                        <p className="text-gray-500 mt-2">Start writing your first journal entry!</p>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-8">
                    {stories.map((story) => (
                        <div 
                            key={story.id}
                            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-gray-100 rounded-full p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <time className="font-display text-lg font-semibold text-gray-900">
                                            {new Date(story.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </time>
                                    </div>
                                    <button 
                                        onClick={() => router.push('/story/' + story.id)}
                                        className="text-black font-display font-semibold px-4 py-2 rounded-lg
                                            hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                                    >
                                        View Full Story
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h3 className="font-display font-semibold text-gray-900">Journal Entry</h3>
                                        <div className="prose prose-sm max-w-none">
                                            <p className="text-gray-600 line-clamp-6 whitespace-pre-line">
                                                {story.journal}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="font-display font-semibold text-gray-900">Generated Story</h3>
                                        <StorylinePreview storyline={story.storyline} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
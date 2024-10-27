'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Headerex from "@/components/headerex"
import TextArea from "./textarea"
import { MakeGetRequest, MakePostRequest } from '@/shared/http'

export default function JournalComp() {
    const router = useRouter()
    const [journalContent, setJournalContent] = useState('')
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
    const [isJournalSaved, setIsJournalSaved] = useState(false)
    const [journalId, setJournalId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState('')
    const [error, setError] = useState(null)

    const saveJournal = async () => {
        try {
            setLoading(true)
            setLoadingMessage('Saving journal...')
            
            const request = {
                journal: journalContent,
                date: selectedDate
            };
            var form_data = new FormData();

            for ( var key in request ) {
                form_data.append(key, (request as any)[key]);
            }
            
            const response = await (await MakePostRequest("/story/journal/", form_data)).json()

            setJournalId(response.id)
            setIsJournalSaved(true)
            setLoading(false)
            setError(null)
        } catch (err) {
            // setError('Failed to save journal: ' + err.message)
            setLoading(false)
        }
    }

    const generateImage = async () => {
        try {
            setLoading(true)
            setLoadingMessage('Generating story...')

            // First API call to generate story
            const storyResponse = await (await MakePostRequest(`/models/story/${journalId}/`, {})).json()
            const storyId = storyResponse.id

            setLoadingMessage('Initializing image generation...')
            
            // Second API call to start image generation
            const episodeResponse = await (await MakePostRequest(`/models/episode/${storyId}/`, {})).json()
            const batchId = episodeResponse.batch_id

            // Start polling for status
            startStatusPolling(batchId)
        } catch (err) {
            // setError('Failed to generate image: ' + err.message)
            setLoading(false)
        }
    }

    const startStatusPolling = (batchId: number) => {
        const pollInterval = setInterval(async () => {
            try {
                const statusResponse = await (await MakeGetRequest(`/models/episode/status/${batchId}/`, null)).json()
                
                setLoadingMessage(`Generating image... (${statusResponse.completed_count} completed)`)

                if (statusResponse.is_completed) {
                    clearInterval(pollInterval)
                    setLoading(false)
                    router.push(`/story/${journalId}`)
                }
            } catch (err) {
                clearInterval(pollInterval)
                // setError('Failed to check image status: ' + err.message)
                setLoading(false)
            }
        }, 5000) // Poll every 5 seconds
    }

    // Updated TextArea component with controlled input
    const TextAreaWithDate = () => {
        return (
            <div className="flex flex-col items-center gap-4">
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="p-2 rounded-md bg-blueGray-100 focus:outline-none"
                />
                <textarea rows={15}
                    value={journalContent}
                    onChange={(e) => setJournalContent(e.target.value)}
                    placeholder="Let your creative juices flow..."
                    className="text-base bg-blueGray-100 border-none w-1/2 max-h-96 rounded-md focus:outline-none focus:ring-0 resize-none h-64"
                    style={{ minHeight: '5px', height: 'auto' }}
                    onInput={(e) => {
                        (e.target as any).style.height = '5px';
                        (e.target as any).style.height = (e.target as any).scrollHeight + 'px'
                    }}
                />
            </div>
        )
    }

    return (
        <div>
            <Headerex/>
            
            <div className="my-10 text-4xl font-display font-semibold flex justify-center">
                Create your journal
            </div>

            <TextAreaWithDate/>

            {error && (
                <div className="text-red-500 text-center mt-4">
                    {error}
                </div>
            )}

            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-center">{loadingMessage}</p>
                    </div>
                </div>
            )}

            <div className="font-display font-semibold text-xl flex mt-8 mb-16 justify-center">
                <button
                    onClick={saveJournal}
                    disabled={loading || !journalContent.trim()}
                    className={`text-xl bg-white rounded-lg mx-8 px-4 py-2 
                        ${loading || !journalContent.trim() 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-yellow-50 hover:text-slate-400'}`}
                >
                    Save draft
                </button>

                {isJournalSaved && (
                    <button
                        onClick={generateImage}
                        disabled={loading}
                        className={`text-xl bg-white rounded-lg mx-8 px-4 py-2 
                            ${loading 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'hover:bg-yellow-50 hover:text-slate-400'}`}
                    >
                        Generate Image
                    </button>
                )}
            </div>
        </div>
    )
}
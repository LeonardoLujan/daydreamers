'use client'
import { useParams, useRouter } from 'next/navigation';
import Header from "@/components/header";
import { useEffect, useState } from 'react';
import { MakeGetRequest } from '@/shared/http';
import Link from 'next/link';
import { SERVER_HOST } from '@/shared/const';

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
        <div key={journal.id}>
            <Header />

            <div className="font-display mx-24 font-medium text-5xl">
                Your story
            </div>

            <div className="flex mx-24 my-10 justify-center bg-white rounded-xl">
                
                <div className="text-black border-solid border-black line-clamp-5">
                    { journal.storyline.summary }
                </div>
                <hr></hr>
            </div>

            <div className="flex ml-24">
                <div className="w-1/3 my-10">
                    <div className="font-display text-4xl font-medium mb-4">
                        Journal
                    </div>
                    <div className="">
                        {journal.journal}
                    </div>
                </div>


                <div className="w-2/3 my-10 ml-16">
                    <div className="mx-12 font-display text-4xl font-medium mb-4">
                        Story
                    </div>
                    
                    <div>   {  
                        journal.storyline.frames.map((frame) => {
                            return <div className='mx-12 my-4 w-80 flex inline-grid grid-cols-2 justify-end '>
                                <div className="mr-4 mb-3 mt-2 w-40 flex justify-center"><span>{frame.story}</span></div>
                                <div>{frame.image && <img width="300" src={SERVER_HOST + '/' + frame.image}></img> }</div>
                                
                            </div>
                        })
                        }
                    </div>
                </div>
            </div>

            <div className="flex justify-center rounded-xl">
                <button onClick={() => router.push('/journal')}>
                    <div className="font-display bg-white text-4xl font-bold rounded-xl">
                        Go back
                    </div>
                </button>
            </div>

        </div>
    )
}
"use client"

import Header from "@/components/header";
import Main from "@/app/journal/main"
import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import { MakeGetRequest, MakePostRequest } from "@/shared/http";

export interface Entry {
    isEntryActive: boolean;
    onShowEntry: () => void;
    unShowEntry: () => void;
}

export default function Profile() {
    const router = useRouter();
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
  
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
  
    if (loading) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="text-gray-600">Loading stories...</div>
        </div>
      )
    }
  
    if (error) {
      return (
        <div className="p-4 text-red-500 bg-red-50 rounded-lg">
          <p>Error loading stories: {error}</p>
        </div>
      )
    }
  
    if (!stories || stories.length === 0) {
      return (
        <div className="p-4 text-gray-600">
          <p>No journal stories found.</p>
        </div>
      )
    }
  

    

    return(

        <div>
            <Header/>
            <div className="justify-center flex font-display font-bold">
                <button className="justify-center flex" onClick={(() => router.push('/journal/journalcomp'))}>
                    Create Journal
                </button>
            </div> 
            <div>
                
            {stories.map((story) => (
                <div className="mx-96 mt-24 grid grid-cols-4 grid-rows-4 gap-4">
                    <div className="font-display text-xl font-semibold col-span-4">
                            Date: { story.date }
                    </div>
                    
                    <div className="col-span-2 bg-white rounded-xl">
                        <div className="text-black border-solid border-black line-clamp-5">
                            { story.journal }
                        </div>
                    </div>
                    <div className="col-span-2  bg-white rounded-xl">
                        <Main/>
                    </div>
                    <div className="text-xl">
                        <button onClick={() => router.push('/story/'+story.id)}>
                            <div className="font-semibold bg-white rounded-xl">View your story</div>
                        </button>
                    </div>
                    
                    
                </div>
                ))}

                {/* <div className="mx-96 my-12 grid grid-cols-4 grid-rows-4 gap-4">
                    <div className="font-display text-xl font-semibold col-span-4">
                            Date: 10/10
                    </div>
                    
                    <div className="col-span-2 bg-white rounded-xl">
                        <div className="text-black border-solid border-black line-clamp-5">
                            This is where the Journal Entry will be
                        </div>
                    </div>
                    <div className="col-span-2  bg-white rounded-xl">
                        <Main/>
                    </div>
                    
                    
                </div>

                <div className="mx-96 my-12 grid grid-cols-4 grid-rows-4 gap-4">
                    <div className="font-display text-xl font-semibold col-span-4">
                            Date: 10/10
                    </div>
                    
                    <div className="col-span-2 bg-white rounded-xl">
                        <div className="text-black border-solid border-black line-clamp-5">
                            This is where the Journal Entry will be
                        </div>
                    </div>
                    <div className="col-span-2  bg-white rounded-xl">
                        <Main/>
                    </div>
                    
                    
                </div> */}
            </div>



            

        </div>
    )
}
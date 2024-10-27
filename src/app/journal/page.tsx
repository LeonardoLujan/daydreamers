

import Header from "@/components/header";
import Main from "@/app/journal/main"

export default function Profile() {


    return(

        <div>
            <Header/>
            <div className="mx-96 my-24 grid grid-cols-4 grid-rows-4 gap-4">
                
                
                <div className="col-span-2 bg-white rounded-xl">
                    <div className="text-black border-solid border-black ">
                        This is where the Journal Entry will be
                    </div>
                </div>
                <div className="col-span-2">
                    <Main/>
                </div>
                
                
            </div>



            

        </div>
    )
}
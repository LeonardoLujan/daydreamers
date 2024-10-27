

import Header from "@/components/header";
import Main from "@/app/journal/main"

export default function Profile() {


    return(

        <div>
            <Header/>
            <div>
                

                <div className="mx-96 mt-24 grid grid-cols-4 grid-rows-4 gap-4">
                    <div className="font-display text-xl font-semibold col-span-4">
                            Date: 10/10
                    </div>
                    
                    <div className="col-span-2 bg-white rounded-xl">
                        <div className="text-black border-solid border-black line-clamp-5">
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
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
                        <div className="text-black border-solid border-black ">
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
                        <div className="text-black border-solid border-black ">
                            This is where the Journal Entry will be
                        </div>
                    </div>
                    <div className="col-span-2  bg-white rounded-xl">
                        <Main/>
                    </div>
                    
                    
                </div>
            </div>



            

        </div>
    )
}
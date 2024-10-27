//creating story
//creating image
//save draft
import Headerex from "@/components/headerex";
import TextArea from "./textarea";


export default function JournalComp() {

    return(
        <div>
            <Headerex/>
            <div className="my-10 text-4xl font-display font-semibold flex justify-center">
                Create your journal
            </div>
            
            <TextArea/>
            <div className="font-display font-semibold text-xl flex mt-8 mb-16 justify-center">
                <button className="text-xl bg-white rounded-lg mx-8 hover:bg-yellow-50 hover:text-slate-400">
                    Save draft
                </button>
                <button className="text-xl bg-white rounded-lg mx-8 hover:bg-yellow-50 hover:text-slate-400">
                    Submit
                </button>
                <button className="text-xl bg-white rounded-lg mx-8 hover:bg-yellow-50 hover:text-slate-400">
                    Generate Image
                </button>
            </div>
           

        </div>
            
            

            
        
    
    )
}
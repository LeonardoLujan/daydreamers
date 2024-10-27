'use client'
import { useRouter } from 'next/navigation';
import Header from "@/components/header";

export default function Story() {

    const router = useRouter();
    return(
        <div>
            <Header/>

            <div className="font-display mx-24 font-medium text-5xl">
                Your story

            </div>

            <div className="flex mx-24 my-10 justify-center bg-white rounded-xl">
                <div className="text-black border-solid border-black line-clamp-5">
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
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
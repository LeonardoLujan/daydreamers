'use client';

import TitleDD from "@/components/header/titleDD";
import { useRouter } from 'next/navigation';


export default function Headerex() {
    
    const router = useRouter();

    return(

        <div className= "ml-24 my-10 grid grid-cols-4 gap-4">
            <div> <TitleDD/> </div>
            <div></div>
            <div> <button onClick={() => router.push('/journal')}> Journal Entries</button></div>
            <div>About </div>

        </div>

    );
}
import TitleDD from "@/components/header/titleDD";

export default function Header() {

    return(

        <div className= "ml-24 p-10 grid grid-cols-4 gap-4">
            <div> <TitleDD/> </div>
            <div></div>
            <div></div>
            {/* <div>About </div> */}

        </div>

    );
}
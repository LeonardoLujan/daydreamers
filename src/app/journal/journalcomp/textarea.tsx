

export default function TextArea() {

    return(
        <div className="flex justify-center">

            <textarea x-data="{ resize: () => { $el.style.height = '5px'; $el.style.height = $el.scrollHeight + 'px' } }"
            x-init="resize()"
            placeholder="Let your creative juices flow..." 
            className="text-base bg-blueGray-100 border-none w-1/2 max-h-96  rounded-md  focus:outline-none focus:ring-0 resize-none h-64">


            </textarea>
        </div>
    )
}
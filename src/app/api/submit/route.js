

import { NextResponse } from "next/server";

//Handling POST request
export async function POST(req, res) {
    //Get the Form Data
    const Formdata = await req.formData();
    const name = Formdata.get('name');
    const age = Formdata.get('age');
    const appearance = Formdata.get('appearance');
    const interests = Formdata.get('interests');
    
    //Response 
    //
    
    return NextResponse.json({ name, age, appearance, interests })

}

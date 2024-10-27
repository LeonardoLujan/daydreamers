'use client';
import Form from 'next/form';
import Header from "@/components/header";
import { useRouter } from 'next/navigation';

const serv = "http://10.136.11.31:8000/";

export default function login2() {


  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    console.log(formData);
    const name = formData.get('protagonistName');
    const age = formData.get('age');
    const appearance = formData.get('appearance');
    const interests = formData.get('interests');

    console.log(event);
    
    try {
      let response = await fetch(serv + 'profile/password_less_login/profile/profile', {
        Host: serv + 'profile/profile',
        method: 'POST',
        body: formData,
      });

      response = await response.json()
      const token = response.token
      localStorage.setItem("token", token)

      if(!response){
        router.push('/journal')
      }


      alert(`${response.name}`)
    } catch (error) {
      // Handle error
      console.error('Error submitting form:', error);
    }

  };


    return (

        <div className="flex justify-start ml-56 text-2xl">
            
            <Form action="/search" onSubmit={handleSubmit}>
              <div>
                <div className="my-2">
                  <h1>Protagonist Name</h1>
                  <input className="rounded-lg" name="protagonistName" placeholder="Insert here"/>
                </div>
                <div className="my-2">
                  <h1>Age</h1>
                  <input className="rounded-lg" name="age" placeholder="Insert here"/>
                </div>
                <div className="my-2">
                  <h1>Appearance</h1>
                  <input className="rounded-lg" name="appearance" placeholder="Insert here"/>
                </div>
                <div className="my-2">
                  <h1>Interests</h1>
                  
                  <textarea name= "interests" className="resize rounded-md"/>
                  
                </div>
              </div>
              
              <div className="justify-center flex mt-10 font-semibold bg-white rounded-md">
                <button type="submit">Submit</button>
              </div>
    
            </Form>
        </div>
      )
}
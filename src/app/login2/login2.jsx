'use client';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { MakePostRequest } from '../../shared/http'

export default function login2() {


  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    
    try {

      let response = await MakePostRequest('/profile/profile/', formData);
      if(response.status != 201) {
        alert('Something went wrong!');
        return;
      }
      response = await response.json()

      router.push('/journal')
    } catch (error) {
      
    }

  };


    return (
        <div className="flex justify-start ml-56 text-2xl">
            
            <Form action="/search" onSubmit={handleSubmit}>
              <div>
                <div className="my-2">
                  <h1>Protagonist Name</h1>
                  <input className="rounded-lg" name="name" placeholder="Ooogle Boogle"/>
                </div>
                <div className="my-2">
                  <h1>Age</h1>
                  <input className="rounded-lg" name="age" placeholder="25"/>
                </div>
                <div className="my-2">
                  <h1>Appearance</h1>
                  <input className="rounded-lg" name="appearance" placeholder="Eg. Tall, black hair, wears glasses"/>
                </div>
                <div className="my-2">
                  <h1>Interests</h1>
                  
                  <textarea name= "interests" className="resize rounded-md" placeholder="Gaming, Fortnite, nature, Fall Season etc."/>
                  
                </div>
              </div>
              
              <div className="justify-center flex mt-10 font-semibold bg-white rounded-md">
                <button type="submit">Submit</button>
              </div>
    
            </Form>
        </div>
      )
}
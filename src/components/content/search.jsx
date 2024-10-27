'use client';

import Form from 'next/form';
import { useRouter } from 'next/navigation';

const serv = "http://10.136.11.31:8000/";


export default function Search() {
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    console.log(formData);
    const name = formData.get('name');
    // const age = formData.get('age');
    // const appearance = formData.get('appearance');
    // const interests = formData.get('interests');

    console.log(event);
    
    try {
      let response = await fetch(serv + 'profile/password_less_login/' + name + '/', {
        Host: serv + 'profile/password_less_login/' + name + '/',
        method: 'POST',
        body: formData,
      });

      response = await response.json()
      const token = response.token
      localStorage.setItem("token", token)

      if(!response){
        router.push('/journal')
      }

      else{
        router.push('/login2')
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
              <h1>Username</h1>
              <input className="rounded-lg" name="name" placeholder="Insert here"/>
            </div>
            
          </div>
          
          <div className="justify-center flex mt-10 font-semibold bg-white rounded-md">
            <button type="submit">Submit</button>
          </div>

        </Form>
    </div>
  )
}
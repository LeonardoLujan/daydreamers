'use client';

import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { SERVER_HOST } from '../../shared/const'


export default function Search() {
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    console.log(formData);
    const name = formData.get('name');
    
    try {
      let response = await fetch(SERVER_HOST + 'profile/password_less_login/' + name + '/', {
        method: 'POST',
        body: formData,
      });

      response = await response.json()
      const token = response.token
      localStorage.setItem("token", token)

      if(response.profile){
        router.push('/journal')
      } else{
        router.push('/login2')
      }
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
              <input className="rounded-lg" name="name" placeholder="Jhon Doe"/>
            </div>
          </div>
          
          <div className="justify-center flex mt-10 font-semibold bg-white rounded-md">
            <button type="submit">Submit</button>
          </div>

        </Form>
    </div>
  )
}
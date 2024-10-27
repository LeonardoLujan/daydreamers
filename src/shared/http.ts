import { SERVER_HOST } from "./const";

export async function MakePostRequest(path: string, formData: any) {
    const myHeaders = new Headers();

    if (localStorage.getItem('token')) {
        myHeaders.append("Authorization", "Bearer " + (localStorage.getItem('token') as string));
    }

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow"
    };

    let response = await fetch(SERVER_HOST + path, requestOptions);
    return response
}
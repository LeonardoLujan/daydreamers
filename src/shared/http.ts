import { SERVER_HOST } from "./const";

export async function MakePostRequest(path: string, formData: any) {
    return MakeRequest(path, formData, "POST")
}

export async function MakeGetRequest(path: string, params: any) {
    return MakeRequest(path, null, "GET")
}


export async function MakeRequest(path: string, formData: any, method: string) {

    const myHeaders = new Headers();

    if (localStorage.getItem('token')) {
        myHeaders.append("Authorization", "Bearer " + (localStorage.getItem('token') as string));
    }

    const requestOptions: RequestInit = {
        method: method,
        headers: myHeaders,
        body: formData,
        redirect: "follow"
    };

    let response = await fetch(SERVER_HOST + path, requestOptions);
    return response
}
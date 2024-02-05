/* TODO:
Complete the following API functions to fetch user's data and its unmasked phone number.
Each request should be authenticated with a Bearer token of 'WellTheoryCode2023'.
Use the default fetch API.
*/
import axios from 'axios'
import {toast} from "react-toastify";

let instance = axios.create()

instance.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer WellTheoryCode2023'
    return config
}, error => {
    return Promise.reject(error)
})

instance.interceptors.response.use(res => {
    return res
}, error => {
    return Promise.reject(error)
})

export const me = () => {
  // GET https://us-central1-internals-358114.cloudfunctions.net/react-challenge/me
    return new Promise((resolve, reject) => {
        instance.get('https://us-central1-internals-358114.cloudfunctions.net/react-challenge/me')
            .then(res=>{
            if(res && res.data){
                resolve(res.data)
            }else{
                console.log("something went wrong with 'me' data result")
                toast.error("Error retrieving user information. Try again later or contact an administrator.")
            }
        }).catch(err => {
            console.log("error getting 'me'", err)
            reject(err)
        })
    })
};

export const phone = () => {
  // GET https://us-central1-internals-358114.cloudfunctions.net/react-challenge/phone
    return new Promise((resolve, reject) => {
        instance.get('https://us-central1-internals-358114.cloudfunctions.net/react-challenge/phone')
            .then(res=>{
                if(res && res.data){
                    resolve(res.data)
                }else{
                    console.log("something went wrong with 'phone' data result")
                    toast.error("Error retrieving phone number. Try again later or contact an administrator.")
                }
            }).catch(err => {
            console.log("error getting 'phone'", err)
            reject(err)
        })
    })
};

export const createSupportTicket = (title, message) => {
  // POST https://us-central1-internals-358114.cloudfunctions.net/react-challenge/support-tickets
  // body: { title: string; message: string }
    const ticketPromise = new Promise((resolve, reject) => {
        instance.post('https://us-central1-internals-358114.cloudfunctions.net/react-challenge/support-tickets',
            {title: title, message: message})
            .then(res=>{
                if(res && res.data){
                    resolve(res.data)
                }else{
                    console.log("something went wrong with creating a support ticket")
                    toast.error("Error creating support ticket. Try again later or contact an administrator.")
                }
            }).catch(err => {
            console.log("error creating support ticket", err)
            reject(err)
        })
    })

    toast.promise(
        ticketPromise,
        {
            pending: 'Creating support ticket',
            success: 'Support ticket successfully created',
            error: 'Error creating support ticket'
        }
    )
};

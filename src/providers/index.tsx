import React, {Component, useContext} from 'react';
import * as API from '@api';
import Profile from "@routes/Profile";
import {toast} from "react-toastify";

/* TODO:
Complete the UserProvider to manage user data and phone number masking.
1. Fetch user data with API.me() on provider's mount.
2. Implement a function to toggle phone number masking (you can fetch unmasked phone number with API.phone()
3. Pass down the user data and the toggle function to the context value.
*/

const UserContext = React.createContext(null);

interface UserProviderProps {
    children: React.ReactNode;
};

interface UserInfo {
    name: string,
    email: string,
    address: string,
    phone: string,
    phoneMasked: string,
    phoneDisplay: string
}

export class UserProvider extends Component<any, UserInfo> {
    constructor(props: UserProviderProps) {
        super(props);
        this.state = {
            name: '',
            email: '',
            address: '',
            phone: '',
            phoneMasked: '',
            phoneDisplay: ''
        }
    }

    async componentDidMount() {
        API.me()
            .then((data: any) => {
                this.setState({
                    name: data.first_name + " " + data.last_name,
                    email: data.email,
                    address: data.address.line1 + " " + data.address.city + ", " + data.address.state + " " + data.address.postal_code,
                    phoneMasked: data.masked_phone,
                    phoneDisplay: data.masked_phone
                })
            })
            .catch((err: any)=>{
              let message = "Error retrieving phone number"
              if(err && err.response?.message) message += ". " + err.response.message
              toast.error(message)
            })
        API.phone()
            .then((data: any) => {
                this.setState({
                    phone: data.phone
                })
            })
            .catch((err: any) => {
                let message = "Error retrieving phone number"
                if (err && err.response?.message) message += ". " + err.response.message
                toast.error(message)
            })
    }

    togglePhoneMask = (checked) => {
        this.setState({
            phoneDisplay: checked ? this.state.phone : this.state.phoneMasked
        })
    }

    render() {
        return (
            <UserContext.Provider value={{state: this.state, togglePhoneMask: this.togglePhoneMask}}>
                <Profile/>
            </UserContext.Provider>
        )
    }
}

export const useUser = () => {
    return useContext(UserContext)
};

import React, {createContext, Dispatch, FC, SetStateAction, useState} from 'react';
import axios from "axios";


interface User {
    id: number;
    username: string;
}

interface UserContextType {
    currentUser: User | null;
    users: User[];
    getUsers: () => Promise<void>;
    createUser: (username: string) => Promise<void>;
    usersLoading: boolean
    usersError: string
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
    currentUser: null,
    users: [],
    getUsers: async () => {},
    createUser: async () => {},
    usersLoading: true,
    usersError: '',
    setCurrentUser: async() => {}
});

const baseUrl = 'https://lending-api.azurewebsites.net'

export const UserProvider: FC<{children: React.ReactNode}> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [usersLoading, setUsersLoading] = useState(true);
    const [usersError, setUsersError] = useState('');

    const getUsers = async () => {
        try {
            const result = await axios.get(`${baseUrl}/users`);
            setUsers(result.data);
        } catch(error: any) {
            setUsersError(error);
        } finally {
            setUsersLoading(false);
        }
    };

    const createUser = async (username: string) => {
        try {
            const result = await axios.post(`${baseUrl}/users`, {username: username})
            setUsers(result.data);
        } catch(error: any) {
            setUsersError(error);
        } finally {
            setUsersLoading(false);
        }
    };


    return (
        <UserContext.Provider value={{ currentUser, users, getUsers, createUser, usersLoading, usersError, setCurrentUser}}>
            {children}
        </UserContext.Provider>
    );
};
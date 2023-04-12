import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {CreateUserForm} from "./Components/CreateUserForm";
import {LoanTable} from "./Components/LoanTable";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>();

  useEffect(() => {
    setLoading(true);
    const url = `https://cors-anywhere.herokuapp.com/https://lending-api.azurewebsites.net/users`;
    axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
      }
    })
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch((e) => console.log(e))
  }, [])

  return (
      <div className="App">
        {data && data.map((user: any) => (
            <div>{user.username}</div>
        ))}

        <CreateUserForm />
        <LoanTable userId={1} />
      </div>
  );
}

export default App;

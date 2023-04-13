import React, {useEffect, useState} from 'react';
import './App.css';
import {CreateUserForm} from "./Components/CreateUserForm";
import {CircularProgress, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {LoanTable} from "./Components/LoanTable";
import axios, {AxiosResponse} from "axios";


interface User {
  id: number
  username: string
}

function App() {
  const [currentUserId, setCurrentUserId] = useState<number | undefined>();
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshData, setRefreshData] = useState(true);

  const makeRequest = async () => {
    try {
      const result = await axios.get('https://lending-api.azurewebsites.net/users');
      setResponse(result);
    } catch(error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (refreshData) {
      makeRequest().then()
      setRefreshData(false)
    }
  }, [refreshData]);

  const handleUserChange = (e: any, el: any) => {
    setCurrentUserId(el.props.value)
  }

  if (loading) return <CircularProgress />
  if (error) return <div>error :/</div>

  return (
      <div className="App">
        <FormControl fullWidth>
          <InputLabel id="user-select-label">User</InputLabel>
          <Select
              labelId="user-select-label"
              id="user-select"
              value={currentUserId}
              label="User"
              onChange={(e: any, a: any) => handleUserChange(e, a)}
          >
            {response?.data?.map((user: any) => (
                <MenuItem key={user.id} value={user.id}>{user.username}</MenuItem>
            ))}
          </Select>
        </FormControl>


        <CreateUserForm setRefreshData={setRefreshData}/>
        <LoanTable userId={currentUserId} />
      </div>
  );
}

export default App;

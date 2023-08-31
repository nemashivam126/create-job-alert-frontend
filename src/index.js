import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { JobForm } from './components/addJobForm';
import { DataFetching } from './components/jobDataFetch';
import { EditJob } from './components/editJob';
import { UserRegister } from './components/registerUser';
import { UserLogin } from './components/login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path='/' element={ <DataFetching /> } />
        <Route path='/add-job' element={ <JobForm /> } />
        <Route path='/edit-job/:id' element={ <EditJob /> } />
        <Route path='/register-user' element={ <UserRegister /> } />
        <Route path='/user-login' element={ <UserLogin /> } />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
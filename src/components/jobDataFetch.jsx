import { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from './jobList';

export const DataFetching = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/jobs')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Dynamic Table</h1>
      <DataTable data={data} />
    </div>
  );
};

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DataTable = ({ data }) => {
  const navigate = useNavigate();
  const [states] = useState([
    " ",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Gujarat",
    "Haryana",
    "Karnataka",
    "Madhya Pradesh",
    "Maharashtra",
    "Tamil Nadu",
    "Telangana",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal"
  ])

  const [cities] = useState([
    "",
    "Amaravati",
    "Itanagar",
    "Gandhinagar",
    "Chandigarh",
    "Bangalore",
    "Indore",
    "Mumbai",
    "Chennai",
    "Hyderabad",
    "Dehradun",
    "Lucknow",
    "Kolkata"
  ])

  const handleClick = () => {
    navigate('/add-job')
  }
  
  return (
    <div>
      <div className='container-fluid'>
        <div><button onClick={handleClick} className='btn btn-success bi bi-plus float-end'>Add Job</button></div>
        <TableContainer component={Paper}>
          <Table className="MuiTable-hoveringBlackTable">
            <TableHead>
              <TableRow >
                <TableCell>Job Id</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Experience Range</TableCell>
                <TableCell>Salary Range</TableCell>
                <TableCell>Job Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>State</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Posted On</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row._id}</TableCell>
                  <TableCell>{row.job_title}</TableCell>
                  <TableCell>{row.experience_range}</TableCell>
                  <TableCell>{row.salary_range}</TableCell>
                  <TableCell>{row.job_priority}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{states[row.state_id]}</TableCell>
                  <TableCell>{cities[row.city_id]}</TableCell>
                  <TableCell>{row.posted_on}</TableCell>
                  <TableCell><Link to={`/edit-job/${row._id}`} className='bi bi-pen btn btn-warning'></Link></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default DataTable;
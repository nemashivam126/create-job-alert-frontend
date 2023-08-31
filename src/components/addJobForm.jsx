import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';

export function JobForm() {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [errorMsg, setErrorMsg] = useState([]);
    const [isStateChange, setIsStateChange] = useState(true);
    const [jobData, setJobData] = useState({
        job_title: '',
        experience_range: '',
        salary_range: '',
        job_priority: '',
        status: '',
        state_id: '',
        city_id: ''
    });

    const validationSchema = Yup.object({
        job_title: Yup.string().required('Job Title is required, '),
        experience_range: Yup.string().required('Experience Range is required, '),
        salary_range: Yup.string().required('Salary Range is required, '),
        job_priority: Yup.string().required('Job Priority is required, '),
        status: Yup.string().required('Status is required, '),
        state_id: Yup.string().required('State is required, '),
        city_id: Yup.string().required('City is required')
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setJobData({
            ...jobData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(jobData, { abortEarly: false });
            const response = await 
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/add-job',
                    data: jobData
                });
            console.log('Job created successfully:', response.data);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                setErrorMsg(error.errors)
                console.error('Validation error:', error.errors);
            } else {
                console.error('Error creating job:', error.message);
            }
        }
    };

    const loadStates = () => {
        axios({
            method: "get",
            url: "http://localhost:5000/all-states"
        }).then(response => {
            setStates(response.data);
            // console.log(states);
        })
    }

    const loadCities = () => {
        axios({
            method: "get",
            url: "http://localhost:5000/cities"
        }).then(response => {
            setCities(response.data);
            // console.log(states);
        })
    }

    useEffect(() => {
        loadStates();
        loadCities();
    },[])

    const handleStateChange = async (e) => {
        const selectedStateId = e.target.value;
        try {
            axios({
                method: "get",
                url: `http://localhost:5000/cities/state/${selectedStateId}`
            }).then(res => {
                setCities(res.data)
            })
            setIsStateChange(false)
            setJobData({
                ...jobData,
                state_id: selectedStateId,
                city_id: '' // Reset city selection when state changes
            });
        } catch (error) {
            console.error('Error fetching cities:', error.message);
        }
    };
    

  return (
    <div>
    <h1 className='text-center'>Add Job</h1>
      <div className="container d-flex justify-content-center mt-5">
        <form className="form bg-success p-5 rounded-4 text-light" onSubmit={handleSubmit}>
          <dl>
            <div className='row'>
                <dt className='col'>Job Title</dt>
                <dd className='col'>
                    <input className='form-control' type="text" name="job_title" value={jobData.job_title} onChange={handleInputChange} />
                </dd>
            </div>
            <div className='row'>
                <dt className='col'>Experience Range</dt>
                <dd className='col'>
                    <input className='form-control' type="text" name="experience_range" value={jobData.experience_range} onChange={handleInputChange} />
                </dd>
            </div>
            <div className='row'>
                <dt className='col'>Salary Range</dt>
                <dd className='col'>
                    <input className='form-control' type="text" name="salary_range" value={jobData.salary_range} onChange={handleInputChange} />
                </dd>
            </div>
            <div className='row'>
                <dt className='col'>Job Priority</dt>
                <dd className='col'>
                    <input className='form-control' type="text" name="job_priority" value={jobData.job_priority} onChange={handleInputChange} />
                </dd>
            </div>
            <div className='row'>
                <dt className='col'>Posted On</dt>
                <dd className='col'>
                    <input className='form-control' type="text" value={formattedDate} readOnly />
                </dd>
            </div>
            <div className='row'>
                <dt className='col'>Status</dt>
                <dd className='col'>
                    <input className='form-control' type="text" name="status" value={jobData.status} onChange={handleInputChange} />
                </dd>
            </div>
            <div className='row'>
                <dt className='col'>State</dt>
                <dd className='col'>
                    <select className='form-select' onChange={handleStateChange} value={jobData.state_id} name="state_id">
                        {
                            states.map(state => (
                                <option key={state._id} value={state.id}>{state.state_name}</option>
                            ))
                        }
                    </select>
                </dd>
            </div>
            <div className='row'>
                <dt className='col'>City</dt>
                <dd className='col'>
                    <select className='form-select' disabled={isStateChange} onChange={handleInputChange} value={jobData.city_id} name="city_id">
                        {
                            cities.map(city => (
                                <option key={city._id} value={city.id}>{city.city_name}</option>
                            ))
                        }
                    </select>
                </dd>
            </div>
            <dd className='text-danger'><b>{errorMsg}</b></dd>
          </dl>
          <div className='text-center'><button className='btn btn-primary w-100' type="submit">Create Job</button></div>
        </form>
      </div>
    </div>
  );
}

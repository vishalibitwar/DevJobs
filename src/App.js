import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import JobBoardComponent from './components/jobBoardComponent'
import data from './assets/data.json'
function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);
  useEffect(() => {
    setJobs(data);
  }, []);

  const filterFunc = ({ role, level, tools, languages }) => {
    const tags = [role, level];
    if (languages)
      tags.push(...languages)
    if (tools)
      tags.push(...tools);
    if (filters.length === 0)
      return true;
    return filters.every(filter => tags.includes(filter));
  }
  const handleTagClick = (addtag) => {
    if (filters.includes(addtag)) return;
    setFilters([...filters, addtag]);
  }
  const filteredJobs = jobs.filter(filterFunc);

  const handleFilterClick = (passedFilter) => {
    setFilters(filters.filter(f => f !== passedFilter));
  }
  const clearFilters = () => {
    setFilters([]);
  }

  return (
    <Fragment>
      <header className="bg-teal-500  mb-12">
        <img src="./images/bg-header-desktop.svg" alt="bg-img-header" />
      </header>
      <div className="container m-auto">

        {
          filters.length > 0 &&
          <div className='flex flex-wrap inline-block cursor-pointer align-items-center bg-white shadow-lg  -my-20 mb-10 relative z-10 mx-6 p-6 rounded lg:flex-row '>
            {
              filters.map((filter, index) => <span key={index} className=" mr-2  mb-3 pl-3 pr-0 rounded text-teal-500 bg-teal-100 lg:mb-0" >{filter} <span onClick={() => handleFilterClick(filter)} className="text-white rounded py-1 px-2 text-xl self-center font-bold  bg-teal-500">×</span> </span>)
            }
            <button onClick={clearFilters} className="ml-auto  text-gray-600">Clear</button>
          </div>
        }

        {
          jobs.length === 0 ? <p>Loading...</p> : (
            filteredJobs.map(job => <JobBoardComponent handleTagClick={handleTagClick} key={job.id} job={job} />)
          )
        }
      </div>
    </Fragment>
  );
}
export default App;

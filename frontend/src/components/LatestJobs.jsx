import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-20 rounded-3xl p-8 shadow-2xl border-2 border-primary bg-gradient-to-br from-[#23263a] via-[#2d1e4a] to-[#181A20]'>
            <h1 className='text-4xl font-extrabold font-sans mb-8'>
                <span className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow'>Latest & Top</span>
                <span className='text-foreground'> Job Openings</span>
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-5'>
                {
                    allJobs.length <= 0 ? <span className='text-muted-foreground'>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs
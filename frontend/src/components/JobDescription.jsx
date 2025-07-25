import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl text-foreground'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-primary font-bold'} variant="ghost">{singleJob?.postion} Positions</Badge>
                        <Badge className={'text-accent font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-secondary font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-primary hover:bg-primary/80 text-primary-foreground'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-border font-semibold py-4 text-lg text-foreground'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1 text-foreground'>Role: <span className='pl-4 font-normal text-muted-foreground'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1 text-foreground'>Location: <span className='pl-4 font-normal text-muted-foreground'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1 text-foreground'>Description: <span className='pl-4 font-normal text-muted-foreground'>{singleJob?.description}</span></h1>
                <h1 className='font-bold my-1 text-foreground'>Experience: <span className='pl-4 font-normal text-muted-foreground'>{singleJob?.experience} yrs</span></h1>
                <h1 className='font-bold my-1 text-foreground'>Salary: <span className='pl-4 font-normal text-muted-foreground'>{singleJob?.salary}LPA</span></h1>
                <h1 className='font-bold my-1 text-foreground'>Total Applicants: <span className='pl-4 font-normal text-muted-foreground'>{singleJob?.applications?.length}</span></h1>
                <h1 className='font-bold my-1 text-foreground'>Posted Date: <span className='pl-4 font-normal text-muted-foreground'>{singleJob?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default JobDescription
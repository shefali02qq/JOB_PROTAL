import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <div className='relative p-6 rounded-2xl bg-[#181A20] border-l-8 border-primary shadow-[0_4px_32px_rgba(106,56,194,0.15)] overflow-hidden cursor-pointer transition-transform hover:scale-[1.03] hover:shadow-[0_4px_32px_rgba(248,48,2,0.25)] duration-200'>
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{background: 'linear-gradient(120deg, rgba(106,56,194,0.08) 0%, rgba(248,48,2,0.06) 100%)'}}></div>
            <div className='flex items-center justify-between relative z-10'>
                <p className='text-sm text-[#b0b3c6]'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full border-[#35386a] text-white" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex items-center gap-2 my-2 relative z-10'>
                <Button className="p-6 bg-[#23263a] border-none" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-bold text-lg text-white'>{job?.company?.name}</h1>
                    <p className='text-sm text-[#b0b3c6]'>India</p>
                </div>
            </div>

            <div className='relative z-10'>
                <h1 className='font-semibold text-xl text-primary mb-1'>{job?.title}</h1>
                <p className='text-sm text-[#b0b3c6] line-clamp-2'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-4 relative z-10'>
                <Badge className='bg-gradient-to-r from-primary to-accent text-white font-bold px-3 py-1 rounded-full shadow'>
                  {job?.position} Positions
                </Badge>
                <Badge className='bg-gradient-to-r from-accent to-secondary text-white font-bold px-3 py-1 rounded-full shadow'>
                  {job?.jobType}
                </Badge>
                <Badge className='bg-gradient-to-r from-secondary to-primary text-white font-bold px-3 py-1 rounded-full shadow'>
                  {job?.salary}LPA
                </Badge>
            </div>
            <div className='flex items-center gap-4 mt-4 relative z-10'>
                <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline" className="border-[#35386a] text-white font-bold">Details</Button>
                <Button className="bg-gradient-to-r from-primary to-accent text-white font-bold shadow">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job
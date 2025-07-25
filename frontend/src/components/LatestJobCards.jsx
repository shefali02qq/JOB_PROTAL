import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from './ui/avatar'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=> navigate(`/description/${job._id}`)} className='relative p-6 rounded-2xl bg-[#181A20] border-l-8 border-primary shadow-[0_4px_32px_rgba(106,56,194,0.15)] overflow-hidden cursor-pointer transition-transform hover:scale-[1.03] hover:shadow-[0_4px_32px_rgba(248,48,2,0.25)] duration-200'>
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{background: 'linear-gradient(120deg, rgba(106,56,194,0.08) 0%, rgba(248,48,2,0.06) 100%)'}}></div>
            <div className='mb-2 relative z-10 flex items-center gap-3'>
                <Avatar className="h-10 w-10">
                    <AvatarImage src={job?.company?.logo || 'https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg'} alt={job?.company?.name || 'Company Logo'} />
                </Avatar>
                <div>
                    <h1 className='font-bold text-lg text-white'>{job?.company?.name || 'Unknown Company'}</h1>
                    <p className='text-sm text-[#b0b3c6]'>India</p>
                </div>
            </div>
            <div className='mb-2 relative z-10'>
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
        </div>
    )
}

export default LatestJobCards
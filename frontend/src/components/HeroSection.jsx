import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center bg-gradient-to-br from-[#23263a] via-[#2d1e4a] to-[#181A20] py-16 rounded-3xl shadow-xl mb-12'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gradient-to-r from-[#ff7e5f] via-[#feb47b] to-[#6A38C2] text-white font-semibold tracking-wide shadow-lg'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-extrabold font-sans bg-gradient-to-r from-[#ffecd2] via-[#fcb69f] to-[#a1c4fd] bg-clip-text text-transparent drop-shadow'>Search, Apply & <br /> Get Your <span className='text-[#ffd700] drop-shadow'>Dream Jobs</span></h1>
                <p className='text-lg text-white font-medium drop-shadow'>Discover thousands of opportunities, connect with top companies, and take the next step in your career—all in one place.</p>
                <div className='flex w-full max-w-xl shadow-lg border-2 border-primary pl-3 rounded-full items-center gap-4 mx-auto bg-card'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full bg-transparent text-white placeholder:text-[#ffd700] font-medium'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
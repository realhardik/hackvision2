'use client';
import React from 'react';

const Prizes = ({ className = "" }) => {
    return (
        <section id='prizes' className={`min-h-screen pt-10 relative ${className} flex flex-col justify-between]`}>
            <div className='w-full h-max'>
                {/* Title */}
                <div className="p2p h-max flex flex-col justify-center items-center text-center relative z-10 mb-15 px-6 pt-14">
                    <h1 
                        className="bstroke3t text-[12vw]/[12vw] font-bold text-[#FFD700] uppercase pixeldigi-font"
                    >
                        Prizes
                    </h1>
                </div>

                {/* Prize Cards */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-18 pixeldigi-font relative z-10 mb-15">
                    {/* 2nd Place */}
                    <div className="text-center p-2 w-56">
                        <img src='/assets/prizes/silver.gif' alt="2nd Place" className="w-32 mx-auto mb-4 rotating-coin" />
                        <h2 className="bstroke text-3xl font-bold mb-2 text-[#FFD700]">2ND PLACE</h2>
                        <p className="bstrokeds text-white text-4xl">25,000 RS</p>
                    </div>

                    {/* 1st Place */}
                    <div className="text-center p-2 w-60">
                        <img src='/assets/prizes/gold.gif' alt="1st Place Winner" className="w-44 mx-auto mb-4" />
                        <h2 className="bstroke text-3xl mb-2 text-[#FFD700]">1ST PLACE</h2>
                        <p className="bstrokeds text-white text-4xl">50,000 RS</p>
                    </div>

                    {/* 3rd Place */}
                    <div className="text-center p-2 w-56">
                        <img src="/assets/prizes/bronze.gif" alt="3rd Place" className="w-32 mx-auto mb-4" />
                        <h2 className="bstroke text-3xl mb-2 text-[#FFD700]">3RD PLACE</h2>
                        <p className="bstrokeds text-white text-4xl">15,000 RS</p>
                    </div>
                </div>
                </div>
            <div className="relative z-0 pointer-events-none w-full h-auto max-h-[300px] object-cover">
                <img src="/assets/prizes/prizestrap.png" alt="traps" className="w-full h-full" />
            </div>
        </section>
    );
};

export default Prizes;

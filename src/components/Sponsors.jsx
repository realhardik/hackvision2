export default function Sponsors({ className = "" }) {
    // Sponsor card component
    const SponsorCard = ({ tier, index }) => {
        return (
            <div className="relative flex flex-col items-center">
                <div className="w-full h-auto shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)] hover:scale-105 transition-all duration-300 rounded-lg">
                    <img 
                        src="/assets/sponsors/sponsor1.png" 
                        alt={`${tier} Sponsor ${index + 1}`}
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>
        );
    };

    // Sponsor tier component
    const SponsorTier = ({ title, count, gridCols, cardSize }) => {
        return (
            <div className="w-full mb-16 relative z-10">
                <h2 className="text-center text-[#FF8C00] bstroke text-5xl md:text-6xl font-bold mb-8 pixeldigi-font uppercase">
                    {title}
                </h2>
                <div className={`grid ${gridCols} gap-6 md:gap-8 px-4 md:px-12 lg:px-20 max-w-7xl mx-auto`}>
                    {Array.from({ length: count }).map((_, index) => (
                        <div key={index} className={cardSize}>
                            <SponsorCard tier={title} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <section id='sponsors' className={`min-h-screen w-full -mt-2 relative flex flex-col pb-20 ${className}`}>
            <div className='w-full h-full'>
                {/* <div className="relative h-max">
                    <img src="/assets/sponsors/newbg.png" className="w-full h-full object-cover" alt="" />
                </div> */}
                
                {/* Title */}
                {/* <div className="p2p h-max flex flex-col justify-center items-center text-center relative z-10 mb-20 px-6 pt-14">
                    <h1 
                        className="text-wrapper bstroke3t text-[12vw]/[12vw] font-bold text-[var(--yellow)] uppercase pixeldigi-font"
                    >
                        Sponsors
                    </h1>
                </div> */}

                {/* Sponsors Content */}
                {/* <div className="relative z-10 space-y-8">
                    // Title Sponsor - 1 card, largest
                    <SponsorTier 
                        title="Title Sponsor" 
                        count={1} 
                        gridCols="grid-cols-1" 
                        cardSize="max-w-md mx-auto"
                    />

                    // Co-Title Sponsors - 2 cards
                    <SponsorTier 
                        title="Co-Title Sponsors" 
                        count={2} 
                        gridCols="grid-cols-1 md:grid-cols-2" 
                        cardSize="max-w-sm mx-auto"
                    />

                    // Platinum Sponsors - 4 cards
                    <SponsorTier 
                        title="Platinum Sponsors" 
                        count={4} 
                        gridCols="grid-cols-2 md:grid-cols-4" 
                        cardSize="max-w-xs mx-auto"
                    />

                    // Gold Sponsors - 6 cards
                    <SponsorTier 
                        title="Gold Sponsors" 
                        count={6} 
                        gridCols="grid-cols-2 md:grid-cols-3 lg:grid-cols-6" 
                        cardSize="max-w-[200px] mx-auto"
                    />

                    // Bronze Sponsors - 8 cards (6 in first row, 2 in second)
                    <div className="w-full mb-16 relative z-10">
                        <h2 className="text-center text-[#FF8C00] text-5xl md:text-6xl font-bold mb-8 pixeldigi-font uppercase">
                            Bronze Sponsors
                        </h2>
                        <div className="px-4 md:px-12 lg:px-20 max-w-7xl mx-auto">
                            // First row - 6 sponsors
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 mb-6 md:mb-8">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="max-w-[160px] mx-auto">
                                        <SponsorCard tier="Bronze" index={index} />
                                    </div>
                                ))}
                            </div>
                            // Second row - 2 sponsors centered
                            <div className="flex justify-center gap-6 md:gap-8">
                                {Array.from({ length: 2 }).map((_, index) => (
                                    <div key={index + 6} className="max-w-[160px]">
                                        <SponsorCard tier="Bronze" index={index + 6} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    )
}
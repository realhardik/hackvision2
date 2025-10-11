
export default function Tracks({ className = "" }) {
    return (
        <section id="tracks" className={`z-10 -mt-2 medodica relative w-full min-h-screen px-5 py-10 rounded-b-[64px] bg-[#f8e9ab] text-black ${className}`}>
            <div className="flex flex-col md:flex-row w-full h-screen">
                {/* Track 1 - Left half */}
                <div id="tracks-1" className="w-full md:w-1/2 h-full flex flex-col justify-center items-center pr-5">
                    <div className="">
                        <h2 className="text-[10vw] font-bold mb-4">Tracks</h2>
                    </div>
                </div>
                
                {/* Track 2 - Right half */}
                <div id="tracks-2" className="relative w-full md:w-1/2 h-full flex flex-col justify-center items-center pl-5 py-5">
                    <div className="relative flex flex-col justify-center items-center text-[5vw] translate-y-1/2">
                        <span>
                            <span>Web Development</span>
                        </span>
                        <span>
                            <span>Blockchain/Web3</span>
                        </span>
                        <span>
                            <span>AI/ML</span>
                        </span>
                        <span>
                            <span>Cybersecurity</span>
                        </span>
                        <span>
                            <span>I.O.T</span>
                        </span>
                        <span>
                            <span>Campus Solutions</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}
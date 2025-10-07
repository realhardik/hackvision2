export default function Navbar() {
    return (
        <div className="fixed top-0 left-0 w-full z-50">
            <div className="relative w-full h-auto">
                <div className="w-full mt-[-3.5vw]">
                    <picture>
                        <source srcSet="/assets/home/navmobile.png" media="(max-width: 640px)" />
                        <img src="/assets/home/nav2.png" alt="navbar" className="w-full h-full object-cover" />
                    </picture>
                </div>
                <div className="absolute w-full z-50 bottom-[3vw] flex justify-center items-center">
                    <div className="absolute left-0 w-[75px] mt-5 ml-5">
                        <img src="/assets/home/csi logo.png" alt="logo" className="w-full h-full" />
                    </div>
                    <div className="relative flex w-[80%] justify-evenly h-auto text-white p2p">
                        <a href="#">
                            <span>Prizes</span>
                        </a>
                        <a href="#">
                            <span>Tracks</span>
                        </a>
                        <a href="#">
                            <span>Sponsors</span>
                        </a>
                        <a href="#">
                            <span>Timeline</span>
                        </a>
                        <a href="#">
                            <span>FAQs</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
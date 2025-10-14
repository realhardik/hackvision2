export default function Footer() {
    return (
        <footer id="footer" className="relative bg-black text-white py-12 md:py-22 w-full h-auto px-4 md:px-14 pixeldigi-font">
            <div className="w-full flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-center md:items-stretch">
                <div className="w-full md:w-max flex flex-col justify-center md:justify-between items-center md:items-start mb-8 md:mb-0">
                    <div className="flex items-center justify-center md:justify-start mb-4">
                        <div className="w-4 h-4 mr-3 bg-white rounded-full"></div>
                        <span className="mr-2 text-sm md:text-base">CSI x TSDC</span>
                    </div>
                    <div>
                        <span className="text-center mt-4 medodica opacity-60 text-xs md:text-sm">© 2025 ALL RIGHTS RESERVED</span>
                    </div>
                </div>
                <div className="w-full md:w-[65%] flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-10">
                    <div className="text-center md:text-left">
                        <h3 className="text-base md:text-lg mb-6 md:mb-10">Quick Links</h3>
                        <ul className="space-y-2 text-sm md:text-base">
                            <li><a href="#" className="hover:underline">Sponsors</a></li>
                            <li><a href="#" className="hover:underline">CSI Webpage</a></li>
                            <li><a href="#" className="hover:underline">About us</a></li>
                            <li className="h-3"><a href="#" className=""></a></li>
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-base md:text-lg mb-6 md:mb-10">Contact</h3>
                        <ul className="space-y-2 text-sm md:text-base">
                            <li><span className="">Thakur Shyamnarayan Degree College,</span></li>
                            <li><span className="">Thakur Complex, Kandivali East,</span></li>
                            <li><span className="">Mumbai, 400 101</span></li>
                            <li className="h-3"><span className=""></span></li>
                            <li><span className="">contact@hackvision.dev</span></li>
                            <li><span className="">+91 12345 67890</span></li>
                        </ul>
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-base md:text-lg mb-6 md:mb-10">FOLLOW US</h3>
                        <div className="flex justify-center space-x-4">
                            <a href="#" className="text-lg md:text-xl hover:text-gray-300">&#xf16d;</a>
                            <a href="#" className="text-lg md:text-xl hover:text-gray-300">&#xf1be;</a> 
                            <a href="#" className="text-lg md:text-xl hover:text-gray-300">&#xf099;</a>
                            <a href="#" className="text-lg md:text-xl hover:text-gray-300">&#xf0e1;</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
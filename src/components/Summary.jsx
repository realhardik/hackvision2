import Image from 'next/image';
import BunnyHopper from './sub/BunnyHopper';
import PixelReveal from './sub/PixelReveal';

function MountainsStrip({ className = "", height = 52 }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height={height} preserveAspectRatio="none">
            <defs>
                <pattern id="mountainPattern" x="0" y="0" width="250" height="52" patternUnits="userSpaceOnUse">
                    <g transform="scale(1.2019230769,1)">
                        <path
                            d="M113.75 1.95V0H94.25v3.25h19.5V1.95ZM92.95 3.25H84.5v3.25h9.75V3.25ZM123.5 5.2V3.25h-9.75v3.25h9.75ZM83.2 6.5h-1.95v3.25h3.25V6.5ZM126.75 8.45V6.5H123.5v3.25h3.25ZM79.95 9.75h-5.2V13h6.5V9.75ZM133.25 11.7V9.75h-6.5V13h6.5ZM73.45 13h-5.2v3.25h6.5V13ZM139.75 14.95V13h-6.5v3.25h6.5ZM66.95 16.25H65v3.25h3.25v-3.25ZM143 18.2v-1.95h-3.25v3.25H143ZM63.7 19.5h-1.95v3.25H65V19.5ZM146.25 21.45V19.5H143v3.25h3.25ZM60.45 22.75H58.5V26h3.25v-3.25ZM149.5 24.7v-1.95h-3.25V26h3.25ZM57.2 26H52v3.25h6.5V26ZM207.35 26h-5.85v3.25H208V26ZM6.5 27.95V26H0v3.25h6.5V27.95ZM156 27.95V26h-6.5v3.25H156V27.95ZM50.7 29.25h-1.95v3.25H52v-3.25ZM200.2 29.25h-8.45v3.25h9.75v-3.25ZM16.25 31.2V29.25H6.5v3.25h9.75V31.2ZM159.25 31.2V29.25H156v3.25h3.25V31.2ZM47.45 32.5H39v3.25h9.75V32.5ZM190.45 32.5h-1.95v3.25h3.25V32.5ZM19.5 34.45V32.5h-3.25v3.25h3.25V34.45ZM169 34.45V32.5h-9.75v3.25H169V34.45ZM37.7 35.75h-5.2V39H39v-3.25ZM187.2 35.75H182V39h6.5v-3.25ZM26 37.7V35.75h-6.5V39H26V37.7ZM175.5 37.7V35.75H169V39h6.5V37.7ZM31.2 39H26v3.25h6.5V39ZM180.7 39h-5.2v3.25h6.5V39ZM24.7 42.25H19.5v3.25H26v-3.25ZM182 43.55v1.95h6.5v-3.25H182v1.3ZM18.2 45.5H13v3.25h6.5V45.5ZM188.5 46.8v1.95h6.5v-3.25h-6.5v1.3ZM11.7 48.75H6.5V52H13v-3.25ZM195 50.05V52h6.5v-3.25H195v1.3Z"
                            fill="black"
                        />
                    </g>
                </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height={height} fill="url(#mountainPattern)" />
        </svg>
    );
}

export default function Summary({ className = "" }) {
    return (
      <section id="summary" className={`relative w-full h-auto min-h-screen text-white pt-20 rounded-t-[64px] bg-[#65aef7] ${className}`}>
        <div className="relative w-full h-auto">
          <div className="w-full h-auto relative flex flex-col overflow-hidden mb-20 z-2">
            {/* Clouds Layer */}
            <div id="clouds" className="pointer-events-none absolute inset-0 z-2">
              {/* Animated clouds moving from right to left */}
              <Image
                src="/assets/summary/cloud1.png"
                alt="cloud"
                className="absolute top-[9vh] w-[30vw] sm:w-[22vw] md:w-[14vw] max-w-[220px] h-auto opacity-95 sm:top-[16vh] md:top-[18vh] cloud-animate"
                style={{ animationDelay: '0s' }}
                width={220}
                height={140}
                loading="eager"
                priority
              />
              <Image
                src="/assets/summary/cloud4.png"
                alt="cloud"
                className="z-1 hidden sm:block absolute top-[8vh] w-[14vw] md:w-[12vw] max-w-[200px] h-auto opacity-85 md:top-[8vh] cloud-animate-slow"
                style={{ animationDelay: '15s' }}
                width={200}
                height={120}
                loading="eager"
                priority
              />
              <Image
                src="/assets/summary/cloud2.png"
                alt="cloud"
                className="absolute top-[10vh] w-[26vw] sm:w-[18vw] md:w-[12vw] max-w-[200px] h-auto opacity-95 sm:top-[14vh] md:top-[16vh] cloud-animate-slow"
                style={{ animationDelay: '3s' }}
                width={200}
                height={120}
                loading="eager"
                priority
              />
              {/* Hide cloud3 on mobile for cleaner look */}
              <Image
                src="/assets/summary/cloud3.png"
                alt="cloud"
                className="hidden sm:block absolute bottom-[2.5vh] w-[24vw] md:w-[16vw] max-w-[240px] h-auto opacity-90 cloud-animate-fast"
                style={{ animationDelay: '6s' }}
                width={240}
                height={140}
                loading="eager"
                priority
              />
              <Image
                src="/assets/summary/cloud5.png"
                alt="cloud"
                className="z-1 absolute top-[5vh] w-[28vw] sm:w-[vw] md:w-[19vw] max-w-[210px] h-auto opacity-85 sm:top-[5vh] md:top-[5vh] cloud-animate-slow"
                style={{ animationDelay: '9s' }}
                width={210}
                height={130}
                loading="eager"
                priority
              />
              <Image
                src="/assets/summary/cloud1.png"
                alt="cloud"
                className="absolute top-[18vh] w-[28vw] sm:w-[20vw] md:w-[14vw] max-w-[220px] h-auto opacity-90 sm:top-[22vh] md:top-[24vh] cloud-animate"
                style={{ animationDelay: '12s' }}
                width={220}
                height={140}
                loading="eager"
                priority
              />
              <Image
                src="/assets/summary/cloud2.png"
                alt="cloud"
                className="absolute top-[22vh] w-[28vw] sm:w-[vw] md:w-[13vw] max-w-[210px] h-auto opacity-85 sm:top-[22vh] md:top-[24vh] cloud-animate-fast"
                style={{ animationDelay: '18s' }}
                width={210}
                height={130}
                loading="eager"
                priority
              />
            </div>

            {/* Mountains Strip at bottom */}
            <div className="w-full h-auto relative z-1 mt-[40vh]">
              <MountainsStrip className="w-full" height={52} />
            </div>
          </div>
          <div id='text1' className="cg font-medium text-black flex flex-col justify-center items-center text-[3.5vw] md:text-[3.33vw] mb-25">
              <span>
                <span>Lorem Ipsum is simply dummy text</span>
              </span>
              <span>
                <span>of the printing and typesetting industry. Lorem</span>
              </span>
              <span>
                <span>Ipsum has been the industry's standard dummy text ever</span>
              </span>
              <span>
                <span>since the 1500s, when an unknown printer took a galley.</span>
              </span>
          </div>
          <div className='relative'>
            <div className="relative w-full h-max mb-5 z-9">
              <div className="relative w-full px-5">
                {/* flowers */}
                <div className="relative w-full h-[450px]">
                  <div className="absolute w-[25px] top-[20vh] left-[30vw]">
                    <Image src="/assets/summary/forest/flower1.png" alt="" className="" width={25} height={25} loading="eager" priority />
                  </div>
                  <div className="absolute w-[25px] bottom-[11vh] left-[25vw]">
                    <Image src="/assets/summary/forest/flower3.png" alt="" className="" width={25} height={25} loading="eager" priority />
                  </div>
                  <div className="absolute w-[25px] bottom-[25%] right-[25%]">
                    <Image src="/assets/summary/forest/flower2.png" alt="" className="" width={25} height={25} loading="eager" priority />
                  </div>
                  <div className="absolute w-[25px] top-[25%] right-[30%]">
                    <Image src="/assets/summary/forest/flower1.png" alt="" className="" width={25} height={25} loading="eager" priority />
                  </div>
                  <div className="absolute w-[25px] top-1/2 right-[15%]">
                    <Image src="/assets/summary/forest/flower3.png" alt="" className="" width={25} height={25} loading="eager" priority />
                  </div>
                  <div className="absolute w-[35px] bottom-[3vh] right-[55%]">
                    <Image src="/assets/summary/forest/bush1.png" alt="" className="" width={35} height={35} loading="eager" priority />
                  </div>
                  <div className="absolute w-[15px] bottom-[18vh] right-[47vw] rotate-15">
                    <Image src="/assets/summary/forest/carrot.png" alt="" className="" width={35} height={35} loading="eager" priority />
                  </div>
                   <div className="absolute w-[15px] top-[8vh] left-[5vw] rotate-15 hidden lg:block">
                    <Image src="/assets/summary/forest/carrot.png" alt="" className="" width={35} height={35} loading="eager" priority />
                  </div>
                   <div className="absolute w-[25px] top-[14vh] left-[8vw] hidden lg:block">
                    <Image src="/assets/summary/forest/flower1.png" alt="" className="" width={25} height={25} loading="eager" priority />
                  </div>
                  <div className="absolute w-[25px] top-[18vh] left-[4vw] hidden lg:block">
                    <Image src="/assets/summary/forest/flower3.png" alt="" className="" width={25} height={25} loading="eager" priority />
                  </div>
                  <div className="absolute w-[25px] top-[40%] left-[50vw]">
                    <Image src="/assets/summary/forest/flower1.png" alt="" className="" width={25} height={25} loading="eager" priority />
                  </div>
                  <div className="absolute w-[25px] top-[45%] right-[55vw]">
                    <Image src="/assets/summary/forest/flower3.png" alt="" className="" width={25} height={25} loading="eager" priority />
                  </div>
                  <div className="absolute w-[25px] bottom-[30%] right-[40vw]">
                    <Image src="/assets/summary/forest/flower3.png" alt="" className="" width={25} height={25} loading="eager" priority />
                  </div>
                   <div className="absolute w-[25px] bottom-[6vh] left-[13vw]">
                    <Image src="/assets/summary/forest/flower2.png" alt="" className="" width={25} height={25} loading="eager" priority />
                  </div>
                  {/* <div className="absolute w-[15px] bottom-[17vh] left-[38vw] rotate-12">
                    <Image src="/assets/summary/forest/carrot.png" alt="" className="" width={35} height={35} loading="eager" priority />
                  </div> */}
                </div>
                {/* animals */}
                <div className="absolute top-0 left-0 w-full h-[450px]">
                  <BunnyHopper />
                  <BunnyHopper top="70%" left="25%"/>
                  <BunnyHopper bottom='15%' left='75%'/>
                  <BunnyHopper top='20%' right='25%'/>
                  </div>
                {/* trees */}
                <div className="absolute top-[3vh] left-[15vw]">
                  <Image className="h-[150px] w-auto" src="/assets/summary/forest/tree1.png" alt="" width={125} height={125} loading="eager" priority />
                </div>
                <div className="absolute top-[1vh] left-[60%]">
                  <Image className="h-[150px] w-auto" src="/assets/summary/forest/tree1.png" alt="" width={125} height={125} loading="eager" priority />
                </div>
                <div className="absolute top-0 left-[35vw] hidden md:block">
                  <Image className="h-[150px] w-auto" src="/assets/summary/forest/tree2.png" alt="" width={125} height={125} loading="eager" priority />
                </div>
                <div className="absolute top-[16vh] right-[18vw] hidden md:block">
                  <Image className="h-[150px] w-auto" src="/assets/summary/forest/tree3.png" alt="" width={125} height={125} loading="eager" priority />
                </div>
                <div className="absolute bottom-0 md:right-[35vw] right-[15vw]">
                  <Image className="h-[150px] w-auto" src="/assets/summary/forest/tree2.png" alt="" width={125} height={125} loading="eager" priority />
                </div>
                <div className="absolute bottom-0 left-[30vw] hidden md:block">
                  <Image className="h-[150px] w-auto" src="/assets/summary/forest/tree1.png" alt="" width={125} height={125} loading="eager" priority />
                </div>
                <div className="absolute bottom-[11vh] left-[14vw]">
                  <Image className="h-[150px] w-auto" src="/assets/summary/forest/tree1.png" alt="" width={125} height={125} loading="eager" priority />
                </div>
                <div className="absolute right-[13vw] bottom-0 hidden lg:block">
                  <Image className="h-[150px] w-auto" src="/assets/summary/forest/tree1.png" alt="" width={125} height={125} loading="eager" priority />
                </div>
                <div className="absolute top-0 right-[10vw] hidden lg:block">
                  <Image className="h-[130px] w-auto" src="/assets/summary/forest/tree2.png" alt="" width={125} height={125} loading="eager" priority />
                </div>
                <div className="absolute bottom-0 left-[3vw] hidden lg:block">
                  <Image className="h-[120px] w-auto" src="/assets/summary/forest/tree3.png" alt="" width={125} height={125} loading="eager" priority />
                </div>
              </div>
            </div>
            <PixelReveal className='-mt-[50%] z-10 absolute top-0 left-0' />
          </div>
          
        </div>
      </section>
  )
}
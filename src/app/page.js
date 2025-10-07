import PixelGridBackground from "@/components/PixelGridBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      <PixelGridBackground />
      <div className="relative z-10 mb-[8vh]">
        <img
          src="/assets/home/hackvisionlogo.svg"
          alt="HackVision logo"
          className="w-[90vw] sm:w-[90vw] md:w-[80vw] h-auto"
        />
      </div>
      <div className="relative flex z-10 space-x-10">
        <img
            src="/assets/home/start.png"
            alt="HackVision logo"
            className="w-[150px] md:w-[200px] h-auto cursor-pointer"
          />
          <img
            src="/assets/home/register.png"
            alt="HackVision logo"
            className="w-[150px] md:w-[200px] h-auto cursor-pointer"
          />
      </div>
    </main>
  );
}

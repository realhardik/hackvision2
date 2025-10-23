import Prizes from "./Prizes";
import Timeline from "./Timeline";

export default function PnT() {
  return (
    <section id="pnt" className="w-full h-auto relative -top-[100vh]">
      <div
        id="pnWrap"
        className="w-full h-auto relative"
      >
        <div className="absolute w-full h-full top-0 left-0 daybg -z-1" />
        <Prizes />
        <Timeline />
      </div>
    </section>
  );
}

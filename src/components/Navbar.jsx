function NavItem({ label }) {
  return (
    <a href="#" className={`glitch`} data-text={label}>
        {label}
    </a>
  );
}

export default function Navbar() {
  return (
   <div className="fixed top-0 left-0 w-full z-[99] flex px-10 py-4 p2p mix-blend-difference text-white">
      <div className="relative w-full flex justify-around [&>*]:px-4 [&>*]:py-4">
        <NavItem label="Prizes"/>
        <NavItem label="Tracks"/>
        <NavItem label="Sponsors"/>
        <NavItem label="Timeline"/>
        <NavItem label="FAQs"/>
       </div>
    </div>
  );
}

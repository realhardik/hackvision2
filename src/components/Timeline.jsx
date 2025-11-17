export default function Timeline({ className = "" }) {
    return (
        <section id="timeline" className={`min-h-screen w-full -mt-2 relative ${className}`}>
            <div className='w-full h-full'>
                <div className="relative h-max">
                    <img src="/assets/sponsors/newbg.png" className="w-full h-full object-cover" alt="" />
                </div>
            </div>
        </section>
    )
}
'use client';
import { useState } from 'react';

export default function FAQs({ className = "" }) {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is HackVision 2025?",
            answer: "HackVision is an epic 24-hour hackathon where developers, designers, and innovators come together to build amazing projects. Compete in multiple tracks, win prizes, and showcase your skills!"
        },
        {
            question: "Who can participate in this hackathon?",
            answer: "All students, developers, and tech enthusiasts are welcome! Whether you're a beginner or experienced coder, we encourage everyone to participate. Teams can have 2-4 members."
        },
        {
            question: "Do I need to pay to participate?",
            answer: "Absolutely not! HackVision is completely FREE to attend. We provide food, swag, mentorship, and an amazing venue. Just bring your laptop and creativity!"
        },
        {
            question: "What should I bring to the event?",
            answer: "Bring your laptop, chargers, student ID, and lots of energy! We'll provide the rest - including WiFi, food, drinks, and an awesome atmosphere to hack in."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section 
            id="faqs" 
            className={`relative w-full min-h-screen bg-[var(--green)] text-[var(--f2)] overflow-hidden -mt-2 pb-20 ${className}`}
        >
            {/* Title */}
            <div className="relative w-full h-max flex justify-center items-center pt-14 mb-12">
                <h1 className="pixeldigi-font text-[14vw] md:text-[12vw] font-bold uppercase text-[var(--f2)] bstroke select-none">
                    FAQs
                </h1>
            </div>

            {/* FAQ Container */}
            <div className="relative max-w-5xl mx-auto px-6 md:px-12">
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index}
                            className="bg-[var(--f2)] border-4 border-[var(--f2)] rounded-lg overflow-hidden hover:shadow-[8px_8px_0px_var(--yellow)] transition-all duration-200"
                        >
                            {/* Question Button */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-[var(--yellow)] transition-colors duration-200 group"
                            >
                                <span className="bn text-2xl md:text-3xl text-[var(--green)] group-hover:text-[var(--f2)] transition-colors duration-200 pr-4">
                                    {faq.question}
                                </span>
                                <span className={`bn text-4xl text-[var(--green)] group-hover:text-[var(--f2)] transition-all duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-45' : ''}`}>
                                    +
                                </span>
                            </button>

                            {/* Answer */}
                            <div 
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="px-6 pb-6 border-t-4 border-dotted border-[var(--green)] pt-4">
                                    <p className="p2p text-lg md:text-xl text-[var(--f1)] leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom decoration */}
                <div className="mt-16 text-center">
                    <p className="bn text-2xl md:text-3xl text-[var(--f2)] bstroke">
                        STILL HAVE QUESTIONS?
                    </p>
                    <p className="p2p text-lg md:text-xl text-[var(--f2)] mt-4">
                        Reach out to us on Discord or Email!
                    </p>
                </div>
            </div>
        </section>
    );
}
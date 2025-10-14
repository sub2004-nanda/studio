
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] border-4 border-blue-200/50 rounded-full animate-[spin_40s_linear_infinite]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] border-4 border-blue-200/50 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute top-20 right-40 w-4 h-4 bg-blue-300 rounded-full opacity-50 animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-blue-400 rounded-full opacity-60 animate-[bounce_5s_infinite]" />
        <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-blue-500 rounded-full opacity-70 animate-blob" />
        <div className="absolute bottom-16 left-1/3 w-5 h-5 bg-pink-400 rounded-full opacity-60 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-purple-300 rounded-full opacity-50 animate-pulse" />


        <div className="absolute top-0 left-0 w-full h-full bg-white/20 backdrop-blur-sm" />

        <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 tracking-tighter">
                ProductPlus <br /> E-Government Platform
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Streamlined Services for Efficient Governance
            </p>
        </div>

        <div className="absolute bottom-10 z-10 flex items-center space-x-8 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-lg px-8 py-3">
            <Link href="#" className="text-gray-700 font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="#" className="text-gray-700 font-medium hover:text-primary transition-colors">Services</Link>
            <Link href="#" className="text-gray-700 font-medium hover:text-primary transition-colors">About</Link>
            <Link href="#" className="text-gray-700 font-medium hover:text-primary transition-colors">Contact</Link>
        </div>
    </section>
  );
};

export default Hero;

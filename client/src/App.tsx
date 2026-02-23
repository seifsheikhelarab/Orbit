import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function Landing() {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[150px] mix-blend-screen pointer-events-none" />

            <main className="relative z-10 container mx-auto px-6 py-12 flex flex-col items-center text-center mt-12">
                <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md mb-8">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium tracking-widest uppercase text-primary/90">
                        Premium Experience
                    </span>
                </div>

                <h1 className="animate-slide-up bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-6 max-w-4xl max-w-text-balance">
                    Elevate Your Digital Space with{" "}
                    <span className="gold-gradient italic">
                        Uncompromising Elegance
                    </span>
                </h1>

                <p className="animate-slide-up [animation-delay:200ms] text-muted-foreground text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed text-balance">
                    Experience the intersection of high-performance engineering
                    and meticulous design. The new standard for modern web
                    architecture.
                </p>

                <div className="animate-slide-up [animation-delay:400ms] flex flex-col sm:flex-row gap-5 items-center">
                    <Link to="/register" className="w-full sm:w-auto">
                        <Button
                            variant="luxury"
                            size="lg"
                            className="w-full group"
                        >
                            Start Exploring
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                    <Link to="/login" className="w-full sm:w-auto">
                        <Button variant="outline" size="lg" className="w-full">
                            Already have an account?
                        </Button>
                    </Link>
                </div>

                <div className="animate-slide-up [animation-delay:600ms] mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                    {[
                        {
                            icon: <Zap className="w-6 h-6 text-primary" />,
                            title: "Lightning Fast",
                            desc: "Powered by Vite and Bun for instantaneous feedback.",
                        },
                        {
                            icon: <Shield className="w-6 h-6 text-primary" />,
                            title: "Unbreakable Core",
                            desc: "Strict TypeScript configurations alongside rigorous safety.",
                        },
                        {
                            icon: <Sparkles className="w-6 h-6 text-primary" />,
                            title: "Tailwind v4 Setup",
                            desc: "First-class CSS configurations and fluid modern layouts.",
                        },
                    ].map((feature, idx) => (
                        <div
                            key={idx}
                            className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300"
                        >
                            <div className="mb-4 p-3 rounded-full bg-primary/10 border border-primary/20">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-medium mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    );
}

export default App;

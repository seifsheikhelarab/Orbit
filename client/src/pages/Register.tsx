import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Loader2, ArrowRight } from "lucide-react";

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        await signUp.email({
            name,
            email,
            password,
            fetchOptions: {
                onSuccess: () => {
                    navigate("/dashboard");
                },
                onError: (ctx) => {
                    setError(
                        ctx.error.message ||
                            "Registration failed. Please check your inputs.",
                    );
                    setLoading(false);
                },
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-16 px-6 relative overflow-hidden">
            <div className="w-full max-w-md animate-fade-in relative z-10">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-[80px] pointer-events-none" />

                <div className="glass-panel p-8 sm:p-12 rounded-3xl relative w-full overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-semibold mb-2">
                            Join Orbit
                        </h1>
                        <p className="text-muted-foreground text-sm font-light">
                            Create an account to begin tracking
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                            />
                            <p className="text-[10px] text-muted-foreground mt-1">
                                Must be at least 8 characters.
                            </p>
                        </div>

                        {error && (
                            <p className="text-sm text-destructive font-medium text-center animate-fade-in">
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            variant="luxury"
                            className="w-full group py-6 mt-4"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Create Account{" "}
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-primary hover:text-white transition-colors ml-1"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

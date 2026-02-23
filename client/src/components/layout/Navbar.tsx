import { Link } from "react-router-dom";
import { useSession, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Sparkles, LayoutDashboard, LogOut, Loader2 } from "lucide-react";

export function Navbar() {
    const { data: session, isPending } = useSession();

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/50 backdrop-blur-xl">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo Area */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20 transition-transform group-hover:scale-110">
                        <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-semibold text-lg tracking-wide gold-gradient">
                        Orbit
                    </span>
                </Link>

                {/* Navigation Actions */}
                <div className="flex items-center gap-4">
                    {isPending ? (
                        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    ) : session ? (
                        <>
                            <Link
                                to="/dashboard"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:flex items-center gap-2"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </Link>
                            <div className="w-px h-4 bg-white/10 mx-2 hidden sm:block"></div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-foreground">
                                    {session.user.name}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={async () => {
                                        await signOut();
                                        window.location.href = "/";
                                    }}
                                    title="Sign out"
                                >
                                    <LogOut className="w-4 h-4 text-muted-foreground hover:text-destructive transition-colors" />
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="hidden sm:inline-flex"
                                >
                                    Sign In
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="luxury" size="sm">
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

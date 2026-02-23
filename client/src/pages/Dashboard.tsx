import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth";
import { Navigate } from "react-router-dom";
import {
    Loader2,
    ExternalLink,
    MapPin,
    Building2,
    Briefcase,
} from "lucide-react";

interface Application {
    id: string;
    companyName: string;
    jobTitle: string;
    jobType: string;
    location: string;
    applicationStatus: string;
    priority: string;
    jobURL?: string;
    createdAt: string;
}

export default function Dashboard() {
    const { data: session, isPending } = useSession();
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!session?.user) return;

        const fetchApplications = async () => {
            try {
                const res = await fetch("/api/applications?page=1&limit=20");
                if (!res.ok) throw new Error("Failed to fetch applications");
                const json = await res.json();
                if (json.success && json.data) {
                    setApplications(json.data);
                } else {
                    throw new Error(json.message || "Failed to fetch");
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [session]);

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session?.user) {
        return <Navigate to="/login" replace />;
    }

    const getStatusColor = (status: string) => {
        const map: Record<string, string> = {
            applied: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            saved: "bg-white/5 text-white/70 border-white/10",
            interviewing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
            offer: "bg-green-500/10 text-green-400 border-green-500/20",
            rejected: "bg-red-500/10 text-red-400 border-red-500/20",
        };
        return map[status.toLowerCase()] || map["saved"];
    };

    return (
        <div className="min-h-screen pt-24 px-6 pb-12">
            <div className="container mx-auto max-w-6xl animate-fade-in relative z-10">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-4xl font-semibold mb-2 tracking-tight">
                            Your Portfolio
                        </h1>
                        <p className="text-muted-foreground font-light text-balance text-lg">
                            Manage your career trajectory and active
                            candidacies.
                        </p>
                    </div>
                </header>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
                    </div>
                ) : error ? (
                    <div className="glass-panel text-center p-12 text-destructive">
                        {error}
                    </div>
                ) : applications.length === 0 ? (
                    <div className="glass-panel text-center p-20 rounded-3xl border-dashed border-2 border-white/10 bg-black/20">
                        <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                        <h3 className="text-xl font-medium mb-2">
                            No Active Applications
                        </h3>
                        <p className="text-muted-foreground">
                            Your career portfolio is currently empty.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {applications.map((app, idx) => (
                            <div
                                key={app.id}
                                className="glass-panel p-6 rounded-2xl hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden animate-slide-up"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex justify-between items-start mb-4">
                                    <div
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase border backdrop-blur-md ${getStatusColor(app.applicationStatus)}`}
                                    >
                                        {app.applicationStatus}
                                    </div>
                                    {app.jobURL && (
                                        <a
                                            href={app.jobURL}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-muted-foreground hover:text-white transition-colors p-1"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>

                                <h3 className="text-xl font-medium mb-1 truncate group-hover:text-primary transition-colors">
                                    {app.jobTitle}
                                </h3>

                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center text-sm text-muted-foreground/80">
                                        <Building2 className="w-4 h-4 mr-2 opacity-70" />
                                        <span className="truncate text-foreground/90 font-medium">
                                            {app.companyName}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <MapPin className="w-3.5 h-3.5 mr-2 opacity-70" />
                                        <span className="capitalize">
                                            {app.location}
                                        </span>
                                        <span className="mx-2 opacity-30">
                                            •
                                        </span>
                                        <span className="capitalize">
                                            {app.jobType}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

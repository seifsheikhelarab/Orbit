import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <input
                    type={type}
                    className={cn(
                        "flex h-11 w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-foreground shadow-inner backdrop-blur-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
                        error &&
                            "border-destructive focus-visible:ring-destructive",
                        className,
                    )}
                    ref={ref}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${props.id}-error` : undefined}
                    {...props}
                />
                {error && (
                    <p
                        id={`${props.id}-error`}
                        className="mt-1.5 text-xs font-medium text-destructive animate-fade-in"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    },
);
Input.displayName = "Input";

export const Label = React.forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
    return (
        <label
            ref={ref}
            className={cn(
                "text-sm font-medium leading-none tracking-wide text-foreground/90 disabled:cursor-not-allowed disabled:opacity-70",
                className,
            )}
            {...props}
        />
    );
});
Label.displayName = "Label";

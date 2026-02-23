import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn, focusRing, disabled } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-out " +
        focusRing +
        " " +
        disabled,
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-primary/20",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-border bg-transparent hover:border-primary/50 hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                luxury: "bg-surface border border-white/10 text-white hover:border-primary/50 hover:bg-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 rounded-md px-4 text-xs",
                lg: "h-14 rounded-md px-10 text-lg",
                icon: "h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
    extends
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

export { Button, buttonVariants };

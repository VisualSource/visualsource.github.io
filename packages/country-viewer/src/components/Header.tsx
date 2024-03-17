import { Moon, Sun } from 'lucide-react';
import { useState } from "react";
import { Button } from "./ui/button";

const Header: React.FC = () => {
    const [mode, setMode] = useState<"dark" | "light">(localStorage.getItem("theme") ?? window.matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark");

    return (
        <header className="flex justify-between items-center min-h-16 h-16 px-4 md:px-16 shadow bg-card">
            <h1 className="scroll-m-20 text-md md:text-2xl font-extrabold tracking-tight">Where in the world?</h1>
            <Button variant="ghost" className="inline-flex items-center font-semibold" onClick={() => {
                document.body.classList.toggle("dark");
                const theme = document.body.classList.contains("dark") ? "light" : "dark";
                localStorage.setItem("theme", theme);
                setMode(theme);
            }}>{
                    mode === "light" ? (
                        <><Sun className="mr-2" /> Light Mode</>
                    ) : (
                        <><Moon className="mr-2" /> Dark Mode</>
                    )
                }</Button>
        </header>
    );
}

export default Header;
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const AppLayout: React.FC = () => {
    return (
        <>
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
        </>
    );
}

export default AppLayout;
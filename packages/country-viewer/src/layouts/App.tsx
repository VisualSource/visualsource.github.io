import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;

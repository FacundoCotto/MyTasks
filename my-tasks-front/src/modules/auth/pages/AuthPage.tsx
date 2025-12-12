import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import { Card } from "../../../ui/components/Card";
import { Btn } from "../../../ui/components/Btn";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import VerifyCodeForm from "../components/VerifyCodeForm";
import { authOptions } from "../constants/auth.constants";

function AuthPage() {
  const [activeView, setActiveView] = useState<string>(authOptions[0].key);

  let viewContent = null;
  if (activeView === authOptions[0].key) {
    viewContent = <RegisterForm />;
  } else if (activeView === authOptions[1].key) {
    viewContent = <LoginForm />;
  } else if (activeView === authOptions[2].key) {
    viewContent = <VerifyCodeForm />;
  }

  return (
    <main className="w-full h-screen overflow-hidden bg-linear-to-tl from-white via-white/80 to-blue-200 relative">
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-violet-600 hover:text-violet-800 font-semibold text-lg transition-colors duration-300 z-20 p-2 bg-white/50 rounded-full hover:bg-white/80 backdrop-blur-sm shadow-sm"
      >
        <FaHome className="text-xl" />
        <span>Home</span>
      </Link>
      <div className="w-full h-screen m-auto py-[60px] flex flex-col justify-center items-center ">
        <Card
          title="My Tasks"
          subtitle="Create, organize, and manage your tasks effortlessly."
          className="w-full max-w-md"
        >
          <div className="mt-6 mb-6 flex items-center justify-center gap-2 w-full">
            {authOptions.map((option) => (
              <Btn
                key={option.key}
                variant={activeView === option.key ? "auth_active" : "auth_inactive"}
                {...{
                  onClick: () => setActiveView(option.key),
                  type: "button",
                }}
              >
                {option.label}
              </Btn>
            ))}
          </div>
          {viewContent}
        </Card>
      </div>
    </main>
  );
}

export default AuthPage;

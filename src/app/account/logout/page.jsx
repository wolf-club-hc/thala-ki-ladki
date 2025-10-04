import useAuth from "@/utils/useAuth";
import { LogOut, Sparkles } from "lucide-react";

function MainComponent() {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 flex items-center justify-center p-4">
      {/* Floating emoji background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-bounce">😊</div>
        <div className="absolute top-20 right-20 text-3xl animate-pulse">🎉</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce" style={{animationDelay: '0.5s'}}>✨</div>
        <div className="absolute bottom-10 right-10 text-4xl animate-pulse" style={{animationDelay: '1s'}}>🚀</div>
        <div className="absolute top-1/2 left-5 text-3xl animate-bounce" style={{animationDelay: '1.5s'}}>🎨</div>
        <div className="absolute top-1/3 right-5 text-4xl animate-pulse" style={{animationDelay: '2s'}}>🌟</div>
      </div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            See You Soon!
          </h1>
          <p className="text-gray-600">Thanks for using Thala ki Ladki</p>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default MainComponent;
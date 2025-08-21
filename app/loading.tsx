export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex flex-col items-center space-y-8">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>

          <div className="absolute top-2 left-2 w-16 h-16 border-4 border-slate-100 border-b-purple-500 rounded-full animate-spin animation-delay-150"></div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
        </div>

        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce animation-delay-100"></div>
          <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce animation-delay-200"></div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-slate-700 animate-pulse">
            Loading Scheduler
          </h2>
          <p className="text-slate-500 animate-pulse animation-delay-300">
            Preparing your tasks...
          </p>
        </div>

        <div className="w-64 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-pulse rounded-full"></div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-100 rounded-full opacity-20 animate-float animation-delay-200"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-indigo-100 rounded-full opacity-20 animate-float animation-delay-400"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-slate-100 rounded-full opacity-20 animate-float animation-delay-600"></div>
      </div>

      <style jsx>{`
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-150 {
          animation-delay: 0.15s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) rotate(240deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

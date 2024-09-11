import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa"; // Using React Icons for a Google icon
const AccessDeniedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-teal-800 dark:bg-teal-900 text-white">
      {/* Illustration at the top */}

      {/* Main Heading */}
      <h1 className="text-5xl font-extrabold mb-4 text-center">
        Welcome to Serenity
      </h1>

      {/* Subtitle */}
      <p className="text-2xl mb-6 text-center">
        Your journey to mental wellness starts here
      </p>

      {/* Description */}
      <p className="text-lg mb-8 text-center max-w-md">
        Sign in to access personalized mental health resources and our
        interactive chatbot to help you through your day.
      </p>

      {/* Google Sign-in Button */}
      <button
        onClick={() => signIn("google")}
        className="flex items-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
      >
        <FaGoogle className="mr-2" /> Sign In with Google
      </button>

      {/* Additional Motivational Text */}
      <div className="mt-10 text-center">
        <p className="text-xl italic">
          Your mental health represents the foundation of your life&apos;s
          strength strength
        </p>

        <p className="mt-4 text-md text-gray-200">
          Serenity is here to guide and support you, every step of the way.
        </p>
      </div>
    </div>
  );
};

export default AccessDeniedPage;

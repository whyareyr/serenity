import { signIn } from "next-auth/react";

const AccessDeniedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-teal-800 dark:bg-teal-900 text-white">
      <h1 className="text-4xl font-extrabold mb-4">Serenity</h1>
      <p className="text-xl mb-6">Join Now To</p>
      <p className="mb-8 text-center">
        You need to be signed in to access the chatbot. Please sign in to
        continue.
      </p>
      <button
        onClick={() => signIn("google")}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default AccessDeniedPage;

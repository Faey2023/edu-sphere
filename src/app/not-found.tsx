import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-lg">Oops! Page not found.</p>
      <Link href="/" className="text-blue-500 underline mt-4">
        Go back home
      </Link>
    </div>
  );
};
export default NotFound;

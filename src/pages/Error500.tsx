import { Button } from "@heroui/button";
import NavbarComponent from "@src/components/Navbar";
import { useNavigate } from "react-router-dom";

const Error500 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
        <h2 className="text-2xl font-semibold mb-2">Internal Server Error</h2>
        <p className="mb-6 text-gray-600 max-w-md">
          Something went wrong on our end. Please try again later or go back to the homepage.
        </p>
        <Button color="primary" onPress={handleBack}>
          Back to Home
        </Button>
      </div>
    </>
  );
};

export default Error500;

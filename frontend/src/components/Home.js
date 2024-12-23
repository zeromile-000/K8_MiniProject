import React from "react";

const Home = () => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gray-800">Welcome to Trip Organizer</h2>
      <p className="mt-4 text-lg text-gray-600">
        Plan and organize your trips effortlessly with our platform.
      </p>
      <div className="mt-8">
        <button className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;

export const Button = ({ children, onClick, disabled, color = "green" }) => {
  const baseClasses =
    "py-2 px-4 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";
  const colorClasses = {
    green: `${
      disabled
        ? "bg-green-200 text-green-700 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500"
    }`,
    gray: `${
      disabled
        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
        : "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500"
    }`,
    // Add more color options as needed
  };

  return (
    <button
      className={`${baseClasses} ${colorClasses[color]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

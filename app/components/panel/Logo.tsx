const Logo: React.FC = () => {
  return (
    <>
      <div className="relative p-2 mb-10">
        <h1 className="uppercase italic text-center text-white font-medium text-2xl">
          Linear
        </h1>
        <p
          className="uppercase italic text-blue-500 font-medium text-2xl absolute top-1/2 left-1/2"
          style={{
            transform: "translate(calc(-50% + 20px), calc(-50% + 20px))",
          }}
        >
          Linear
        </p>
      </div>
    </>
  );
};

export default Logo;

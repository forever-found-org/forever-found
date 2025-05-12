import bgimg from "../images/bgimg.png";
//import login_signup from "./components/login_signup";
function Hero({ onGetStartedClick }) {
  return (
    <section
      className="h-screen w-full bg-cover"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="text-left bg-black bg-opacity-50 pt-40 pl-10 text-white">
        <p className="text-5xl font-bold">Welcome To</p>
        <p className="text-5xl font-bold opacity-80">Forever Found</p>
        <br />
        <p className="text-3xl opacity-70">
          Every child deserves a loving home. Join us in giving them a future!
        </p>
        <div className="p-4">
          <button className="p-2 bg-blue-500 rounded-lg text-md border-2 hover:bg-blue-700 hover:border-4" onClick={onGetStartedClick}>
            Get Started
          </button>
          <button className="p-2 ml-3 mb-2 bg-transparent rounded-lg text-md border-2 hover:bg-blue-700 hover:text-white hover:border-4">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
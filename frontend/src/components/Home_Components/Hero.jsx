import Image_hero from "../../images/Image_hero.png";

function Hero({
  onGetStartedClick,
  onLearnMoreClick,
  title = "Welcome To",
  subtitle = "Forever Found",
  description = "Every child deserves a loving home. Join us in giving them a future!",
  backgroundImage = Image_hero,
}) {
  return (
    <section
      className="h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="text-left bg-black bg-opacity-50 pt-40 pl-10 text-white min-h-screen">
        <p className="text-6xl font-bold">{title}</p>
        <p className="text-6xl font-bold opacity-80">{subtitle}</p>

        <br />

        <p className="text-3xl opacity-70 max-w-3xl">
          {description}
        </p>

        <div className="p-4">
          <button
            className="p-2 bg-blue-500 rounded-lg text-md border-2 hover:bg-blue-700 hover:border-4 transition"
            onClick={onGetStartedClick}
          >
            Get Started
          </button>

          <button
            onClick={onLearnMoreClick}
            className="p-2 ml-3 mb-2 bg-transparent rounded-lg text-md border-2 hover:bg-blue-700 hover:text-white hover:border-4 transition"
          >
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;

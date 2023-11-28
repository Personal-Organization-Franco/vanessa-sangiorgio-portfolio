import { useHeaderHero } from "hooks/useHeaderHero";

const HomePageHero = () => {
  const { heroLinks, heroText } = useHeaderHero();
  return (
    <>
      <div className="max-w-4xl">
        <h1 className="py-20 text-grey-1 text-xl sm:text-[54px] leading-tight font-normal">
          {heroText}
        </h1>
      </div>
      <nav className="mb-6 sm:mb-32 sm:gap-16 gap-4 flex flex-col sm:flex-row">
        {heroLinks.map(link => (
          <a
            className="text-sm sm:text-xl font-normal text-grey-2"
            href={link?.href ?? ""}
            target="_blank"
            key={link?.name}
          >
            {link?.name ?? ""}
          </a>
        ))}
      </nav>
    </>
  );
};

export default HomePageHero;

import { useHeaderHero } from "hooks/useHeaderHero";

const HomePageHero = () => {
  const { heroLinks, heroText } = useHeaderHero();
  return (
    <>
      <div className="max-w-4xl">
        <h1 className="py-20 text-grey-1 text-[54px] leading-tight font-normal">
          {heroText}
        </h1>
      </div>
      <nav className="mb-32">
        {heroLinks.map(link => (
          <a
            className="text-xl font-normal text-grey-2 pr-[4.375rem]"
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

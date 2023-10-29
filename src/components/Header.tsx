import { Link } from "gatsby";

import { useHeaderData } from "hooks/useHeaderData";

const Header = () => {
  const { logoText, navbar } = useHeaderData();

  return (
    <header className="flex justify-between pb-4">
      <div className="text-[32px] font-medium text-grey-1">{logoText}</div>
      <nav className="flex gap-8 items-center">
        {navbar.map(item => {
          return (
            <Link
              to={item?.to ?? "/"}
              activeClassName="active:font-bold visited:font-bold active:text-grey-1 visited:text-grey-1"
              className="font-normal text-grey-2 text-xl"
              key={item?.name}
            >
              {item?.name ?? ""}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;

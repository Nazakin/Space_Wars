import Head from "next/head";
import CustomLink from "./CustomLink";
import Search from "./Search";

const MainContainer = ({ children, keywords, title_name }) => {
  return (
    <div className="flex flex-col items-center h-screen">
      <Head>
        <meta
          name="keywords"
          content={"starwars, StarWars, Test project" + keywords}
        />
        <title>{title_name}</title>
      </Head>
      <div className="bg-black w-full px-5 py-5 flex flex-row gap-10 items-center">
        <CustomLink href="/people" text="Home" />
        <Search />
      </div>
      {children}
    </div>
  );
};

export default MainContainer;

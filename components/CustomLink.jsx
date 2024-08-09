import Link from "next/link";

const CustomLink = ({ text, href }) => {
  return (
    <Link
      href={href}
      className={
        "no-underline flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
      }
    >
      {text}
    </Link>
  );
};

export default CustomLink;

import { useRouter } from "next/navigation";

const PersonCard = ({ person }) => {
  const { name, id, height, mass, films } = person;
  const router = useRouter();

  return (
    <li onClick={() => router.push(`people/${id}`)} className="mb-4">
      <div className="border border-gray-400 bg-black w-80 h-24 opacity-90 rounded flex flex-col items-center justify-center cursor-pointer gap-3 transition-all duration-500 ease-in-out transform hover:scale-105 hover:border-yellow-500 hover:opacity-100">
        <p className="text-white text-lg font-semibold">
          {id}. {name}
        </p>
        <div className="flex flex-row gap-6">
          <p className="text-white text-xs">Height: {height}</p>
          <p className="text-white text-xs">Weight: {mass}</p>
          <p className="text-white text-xs">Films: {films.length}</p>
        </div>
      </div>
    </li>
  );
};

export default PersonCard;

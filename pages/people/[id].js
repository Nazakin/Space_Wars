import axios from "axios";
import MainContainer from "../../components/MainContainer";
import { useEffect, useState } from "react";
import Flow from "../../components/Flow";
import { useRouter } from "next/navigation";


export default function Person({ person }) {
    const [films, setFilms] = useState([]);
    const [starships, setStarships] = useState([]);
    const router = useRouter()

    const personNode = {
        id: '1',
        position: { x: (films.length * 100) / 2, y: 0 },
        data: { label: person.name },
        
    };

    const filmsNodes = films.map((film, index) => ({
        id: (index + 2).toString(),
        position: { x: (index * 100) * 2, y: 150 },
        data: { label: film.title },
    }));

    const starshipsNodes = starships.map((starship, index) => ({
        id: (index + films.length + 2).toString(),
        position: { x: (index * 100) * 2, y: 300 },
        data: { label: starship.name },
    }));

    const nodes = [
        personNode,
        ...filmsNodes,
        ...starshipsNodes
    ];

        const filmEdges = filmsNodes.map(filmNode => ({
        id: `e1-${filmNode.id}`,
        source: '1',
        target: filmNode.id,
    }));

    const starshipEdges = filmsNodes.flatMap((filmNode) => 
        starshipsNodes.map(starshipNode => ({
            id: `e${filmNode.id}-${starshipNode.id}`,
            source: filmNode.id,
            target: starshipNode.id,
        }))
    );

    const edges = [
        ...filmEdges,
        ...starshipEdges
    ];

    useEffect(() => {
        async function fetchData() {
            if (person) {
                const filmPromises = person.films.map(film => axios.get(`https://sw-api.starnavi.io/films/${film}`));
                const starshipPromises = person.starships.map(starship => axios.get(`https://sw-api.starnavi.io/starships/${starship}`));

                try {
                    const filmsResponse = await Promise.all(filmPromises);
                    const starshipsResponse = await Promise.all(starshipPromises);

                    const filmsData = filmsResponse.map(response => response.data);
                    const starshipsData = starshipsResponse.map(response => response.data);
                    setFilms(filmsData);
                    setStarships(starshipsData);

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }

        fetchData();
    }, [person]);

    const handleGoBack = () => {
        router.back()
    }
    return (
        <MainContainer title_name={person.name}>
            
            <div className="flex justify-center border border-gray bg-black opacity-80 rounded p-2 my-10">
                <h1 className="text-white text-4xl">{person.name}</h1>
            </div>
            <Flow initialNodes={nodes} initialEdges={edges} />
            <button
                className="no-underline mt-10 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded justify-self-start"
                onClick={handleGoBack}
            >Go back</button>
        </MainContainer>
    );
}

export const getServerSideProps = async ({ query }) => {
    const id = query.id;

    const res = await axios.get(`https://sw-api.starnavi.io/people/${id}`);
    const person = res.data;
    return {
        props: {
            person,
        },
    };
};

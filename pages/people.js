import MainContainer from "../components/MainContainer";
import axios from "axios";
import ItemList from "../components/ItemList";
import Pagination from '../components/Pagination'
import { useEffect, useState } from "react";

const PeoplePage = ({ initialPeople, initialPage }) => {
  const [data, setData] = useState(initialPeople.results);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(initialPeople.count / 10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://sw-api.starnavi.io/people?page=${currentPage}`);
        const people = res.data;
        setData(people.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (currentPage !== initialPage) {
      fetchData();
    }
  }, [currentPage, initialPage]);

  return (
    <MainContainer>
      <ItemList people={data} />
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} category={'people'}/>
    </MainContainer>
  );
};

export default PeoplePage;

export const getServerSideProps = async ({ query }) => {
  const page = query.page || 1;
  const res = await axios.get(`https://sw-api.starnavi.io/people`);
  const people = res.data;
  return {
    props: {
      initialPeople: people,
      initialPage: parseInt(page),
    },
  };
};

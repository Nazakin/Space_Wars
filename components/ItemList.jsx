import React from "react";
import PersonCard from "./PersonCard";

const ItemList = ({ people }) => {
  return (
    <>
      <ul className="flex flex-row flex-wrap gap-10 justify-center mt-5">
        {people.map((person) => (
          <PersonCard person={person} key={person.id} />
        ))}
      </ul>
    </>
  );
};

export default ItemList;

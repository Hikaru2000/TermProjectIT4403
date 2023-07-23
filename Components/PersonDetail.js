// components/PersonDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPersonDetails } from "../services/api";

const PersonDetail = () => {
  const { id } = useParams();
  const [personDetails, setPersonDetails] = useState({});

  useEffect(() => {
    const fetchPersonDetails = async () => {
      const details = await getPersonDetails(id);
      setPersonDetails(details);
    };

    fetchPersonDetails();
  }, [id]);

  return (
    <div>
      <h2>{personDetails.name}</h2>
      <img src={`https://image.tmdb.org/t/p/w300${personDetails.profile_path}`} alt={personDetails.name} />
      <p>Known for: {personDetails.known_for_department}</p>
      <p>Biography: {personDetails.biography}</p>
    </div>
  );
};

export default PersonDetail;


import React, { useEffect, useState } from 'react'
import ModalComponent from '../Components/ModalComponent'
import Buildings from "../Assets/buildings.png";
import { apiUrl, buildingNameToId } from "../variables";
import axios from 'axios';
import { connect } from 'react-redux';
import { loginReducer } from "../reducers/login";


const TownHall = ({ empireDetails,login }) => {

  const [requirements, setRequirements] = useState({});
  const  Town_Hall  = buildingNameToId['Town Hall'];
    
  const level = empireDetails.buildings.filter((item) => item.buildingId === Town_Hall)[0].leve;
    
    
    useEffect(() => {
      const fetchRequirements = async (id) => {
        const { data } = await axios.get(`${apiUrl}/buildings/${Town_Hall}`, {
          headers: { token: login.token, empireId: empireDetails.empireId },
        });
        setRequirements(data);
      };

      fetchRequirements();
    }, []);
  
  return (
    <>
      {Object.keys(requirements).length && (
        <ModalComponent
          name="Town Hall"
          level={level}
          image={Buildings}
          resources={empireDetails.resources}
          resourceRequirements={requirements.constructionCost}
          constructionTime={requirements.constructionTime}
          position="0% 0%"
          buildings={empireDetails.buildings.filter(b=>b.buildingId!==Town_Hall)}
          empireName={empireDetails.name}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: loginReducer(state),
  };
};

export default connect(mapStateToProps) (TownHall);
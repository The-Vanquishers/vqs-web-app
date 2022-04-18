import React, { useEffect, useState } from 'react'
import ModalComponent from '../Components/ModalComponent'
import Buildings from "../Assets/buildings.png";
import { apiUrl, buildingNameToId } from "../variables";
import axios from 'axios';
import { connect } from 'react-redux';
import { loginReducer } from "../reducers/login";
import { empireReducer } from '../reducers/empire';


const TownHall = ({login,empire}) => {

  const [requirements, setRequirements] = useState({});
  const Town_Hall = buildingNameToId['Town Hall'];
  const [belowBuildings, setBelowBuildings] = useState([{}]);
  const belowBuildingsHeader = ["Buildings", "Requirements", "Time", "Upgrade"];
  const gridSize = [2, 6, 2, 2];
  const level = empire.buildings.filter((item) => item.buildingId === Town_Hall)[0].leve;
    
    
  useEffect(() => {
    const fetchRequirements = async (id) => {
      const { data } = await axios.get(`${apiUrl}/buildings/${Town_Hall}`, {
        headers: { token: login.token, empireId: empire.empireId },
      });
      setRequirements(data);
    };
    fetchRequirements();
  }, []);

  useEffect(() => {
    const fetchRequirements = async (id) => {
      const { data } = await axios.get(`${apiUrl}/buildings/${id}`, {
        headers: { token: login.token, empireId: empire.empireId },
      });
      setBelowBuildings(oldArray=>[
        ...oldArray,
        {
          buildingId: data.buildingId,
          constructionCost: data.constructionCost,
          constructionTime: data.constructionTime,
          currentLevel: data.level,
        },
      ]);
    };

    empire.buildings.filter((b) => b.buildingId !== Town_Hall).map(item => fetchRequirements(item.buildingId));

  }, []);
  
 
  
  return (
    <>
      {Object.keys(requirements).length && (
        <ModalComponent
          name="Town Hall"
          level={level}
          image={Buildings}
          resources={empire.resources}
          resourceRequirements={requirements.constructionCost}
          constructionTime={requirements.constructionTime}
          position="0% 0%"
          belowBuildings={belowBuildings}
          belowBuildingsHeader={belowBuildingsHeader}
          empireName={empire.empireName}
          gridSize={gridSize}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    login: loginReducer(state),
    empire: empireReducer(state),
  };
};

export default connect(mapStateToProps) (TownHall);
import React, { useEffect, useState } from 'react'
import ModalComponent from '../Components/ModalComponent'
import Buildings from "../Assets/buildings.png";
import { apiUrl, buildingNameToId } from "../variables";
import axios from 'axios';
import { connect } from 'react-redux';
import { loginReducer } from "../reducers/login";
import { empireReducer } from '../reducers/empire';


const TownHall = ({login,empire}) => {

  const Town_Hall = buildingNameToId['Town Hall'];
  const [buildings, setBuildings] = useState([{}]);
  const [ok, setOk] = useState(false);
  const belowBuildingsHeader = ["Buildings", "Requirements", "Time", "Upgrade"];
  const gridSize = [2, 6, 2, 2];
  const level = empire.buildings.filter((item) => item.buildingId === Town_Hall)[0].leve;
    

  useEffect(() => {
    const fetchRequirements = async (id) => {
      const { data } = await axios.get(`${apiUrl}/buildings/${id}`, {
        headers: { token: login.token, empireId: empire.empireId },
      });
      setBuildings((oldArray) => [
        ...oldArray,
        {
          buildingId: data.buildingId,
          constructionCost: data.constructionCost,
          constructionTime: data.constructionTime,
          currentLevel: data.level,
        },
      ]);
    };

    empire.buildings.map((item,indx) => {
      fetchRequirements(item.buildingId)
      if (indx === empire.buildings.length-1) {
        setOk(true);
      }
    });

  }, []);

  return (
    <>
      {ok && (
        <ModalComponent
          name="Town Hall"
          level={level}
          image={Buildings}
          position="65% 16%"
          belowBuildings={buildings}
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
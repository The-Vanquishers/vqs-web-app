import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { mine } from "../actions/mine";
import { empireReducer } from '../reducers/empire';
import { loginReducer } from '../reducers/login';
import { mineReducer } from '../reducers/mine';


const Mine = (props) => {
    const { token } = props.login;
    const { empireId } = props.empire;
    const [mineBuilding, setMineBuilding] = useState({});

    console.log(props);
    useEffect(() => {
        if (!props.mine.isFetching && !props.mine.isFetched) {
            props.dispatch(mine(token, empireId))
        }
        if (props.mine.isFetched) {
            setMineBuilding({
                level: props.mine.level
            })

        }

    }, [props, token, empireId]);

    return (
        <>
            {/* <MineModal
                name="Mine"
                level={mineBuilding.level}
                image={Buildings}
                position={buildingPosition.Mine}
                //gridSize={gridSize}
            /> */}

        </>
    );
};

const mapStateToProps = state => {
    return {
        mine: mineReducer(state),
        login: loginReducer(state),
        empire: empireReducer(state)
    }
}

export default connect(mapStateToProps)(Mine);
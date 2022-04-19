import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { logging } from '../actions/logging';
import { empireReducer } from '../reducers/empire';
import { loggingReducer } from '../reducers/logging';
import { loginReducer } from '../reducers/login';

const LoggingModal = (props) => {
  const { token } = props.login;
  const {empireId} = props.empire;


  useEffect(() => {
    if(token && empireId){
      props.dispatch(logging(token,empireId))
    }
    if(props.logging.isFetched){
      
    }
    
  },[props,token,empireId]);

    return (
        <div>
          { window.alert("dsjkfjdks")}
        </div>
    );
};

const mapStateToProps = state => {
  return {
    logging:loggingReducer(state),
    login:loginReducer(state),
    empire:empireReducer(state)
  }
}

export default connect(mapStateToProps)(LoggingModal);
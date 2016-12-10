import constants from '../constants/map';

const initialState = {
  center            : [-77.2, 38.85],
  bounds            : [],
  zoom              : 12,
};

function mapReducer(state = initialState, action = {}) {
  switch (action.type) {
    case constants.MAP_UPDATE:
      return { ...state, hello: action.doSomething };
    default:
      return state;
  }
}

export default mapReducer

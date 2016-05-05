const initialState = {
  text: 'FROM THE INITIAL STATE'
};

export default function nav(state = initialState, action) {
  switch (action.type) {
    case 'change text':
      return Object.assign({}, state, {
        text: action.text
      })
    default:
      return state
  }
}

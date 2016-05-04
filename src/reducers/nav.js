const initialState = {
  title: 'UNKNOWN'
};

export default function nav(state = initialState, action) {
  switch (action.type) {
    case 'change title':
      return Object.assign({}, state, {
        title: action.title
      })
    default:
      return state
  }
}

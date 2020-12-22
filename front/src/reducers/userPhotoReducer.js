export default function (state = '', action) {
    switch (action.type) {
        case 'ADD_PHOTO':
          localStorage.setItem('photo',JSON.stringify(action.payload)  )
            // console.log('>>>>>',action.payload)
            return action.payload

        default:
            return state
    }
}
import React from 'react';
import {useSelector} from "react-redux";

const Invitation = () => {

    const [invite, setInvite] = React.useState()
    const user = useSelector(state => state.auth.user)
    // const email = useSelector(state => state.auth.user.email)

    React.useEffect(() =>{
        if(user){
            fetch(`/api/addmember/email/${user.email}`)
                .then(res => res.json())
                .then(inviteParty => setInvite(inviteParty))
        }
    },[])

    // const acceptInvite = (e) => {
    //     e.preventDefault()
    // if(email){
    //     fetch('/api/addmember/invite', {
    //         method: 'PUT',
    //         headers: {'Content-Type' : 'application/json'},
    //         body: JSON.stringify({
    //             email,
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(name => console.log(name))
    // }
    // }

    return (
        <>
            <h1>Inviting your party!!!</h1>
            {invite?.map(el =>(
                <>
                    <button type="submit">Agree</button><button>Disagree</button>
                    <div> Party name:{el.partyName}</div>
                    <div>When: {el.partyDate}</div>
                </>
            ))}
        </>
    );
};

export default Invitation;
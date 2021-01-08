import React from 'react';
import {useSelector} from "react-redux";

const Invitation = () => {

    const [invite, setInvite] = React.useState()
    const user = useSelector(state => state.auth.user)

    React.useEffect(() =>{
        if(user){
            fetch(`/api/member/email/${user.email}`)
                .then(res => res.json())
                .then(inviteParty => {
                  setInvite(inviteParty)
                })
        }
    },[])

    const deleteInvite = () => {
        return fetch(`/api/invite/${user.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}
        })
    }

    return (
        <>
            <h1>Inviting your party!!!</h1>
            {invite?.map(el =>(
                <>
                    <form>
                        <button type="submit" >Agree</button>
                    </form>
                    <form >
                        <button>Disagree</button>
                    </form>
                    <div> Party name:{el.partyName}</div>
                    <div>When: {el.partyDate}</div>
                </>
            ))}
        </>
    );
};

export default Invitation;

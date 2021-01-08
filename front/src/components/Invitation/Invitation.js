import React from 'react';
import {useSelector} from "react-redux";
import { useHistory } from "react-router-dom";


const Invitation = () => {
    const history = useHistory()
    const [invite, setInvite] = React.useState()
    const user = useSelector(state => state.auth.user)
    // console.log(user.email)
    React.useEffect(() =>{
        if(user){
            fetch(`/api/member/email/${user.email}`)
            fetch(`/api/invite/${user.email}`)
                .then(res => res.json())
                .then(inviteParty => {
                  setInvite(inviteParty)
                })
        }
    },[])

    const deleteInvite = () => {
        if(user){
            return fetch(`/api/invite/${user._id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'}
            })
                .then(res => history.push('/invitation'))
        }

    }

    return (
        <>
            <h1>Inviting your party!!!</h1>
            {invite?.map(el =>(
                <>
                    <form>
                        <button type="submit" >Agree</button>
                    </form>
                    <form onSubmit={deleteInvite} >
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

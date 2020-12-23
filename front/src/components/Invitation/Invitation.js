import React from 'react';
import {useSelector} from "react-redux";

const Invitation = () => {

    const [invite, setInvite] = React.useState()
    const user = useSelector(state => state.auth.user)

    React.useEffect(() =>{
        if(user){
            fetch(`/api/addmember/email/${user.email}`)
                .then(res => res.json())
                .then(inviteParty => setInvite(inviteParty))
        }
    },[])


    // const acceptInvite = (e) => {
    //     e.preventDefault()
    //     if(user.email){
    //         fetch('/api/invite',
    //             {
    //             method: 'PUT',
    //             headers: {'Content-Type' : 'application/json'},
    //             body: JSON.stringify({
    //                 email: user.email,
    //             })
    //         })
    //             .then(res => res.json())
    //             .then(name => console.log(name))
    //     }
    // }

    const deleteInvite = () => {
        return fetch(`/api/invite/${user.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}
        })
            // .then(res => history.push('/invitation'))
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
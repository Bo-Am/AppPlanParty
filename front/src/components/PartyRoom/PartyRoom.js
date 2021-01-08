import React, { useEffect, useState } from "react";
import { useSelector, useStore, useDispatch } from "react-redux";
import { Link, useHistory, useParams,useRouteMatch } from "react-router-dom";
import  ChatPage  from "../ChatPage/ChatPage"
import { INIT_ROOM} from '../../actions/types'
const PartyRoom = ()=> {
  const dispatch = useDispatch()

  const user = useSelector((user) => user.auth.user);

  const [party, setParty] = useState([]);

  const [partyMembers, setPartyMembers] = useState();
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/member/${id}`)
      .then((res) => res.json())
      .then((data) => setPartyMembers(data));
  }, []);


  useEffect(() => {
    fetch(`/api/partyroom/${id}`)
      .then((res) => res.json())
      .then((data) => setParty(data));
      dispatch({
        type: INIT_ROOM,
        payload: {room: id, user}
      })

  }, []);

  const deleteParty = () => {
    return fetch(`/api/partyroom/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((res) => history.push("/myparties"));
  };

  const delMember = (e) => {
    e.preventDefault();
    const name = e.target.name;
    fetch("/api/member", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, id }),
    })
    .then((res) => res.json())
    .then((partyMember) => {
      setPartyMembers([...partyMember.members])
      setParty(partyMember)
    });
  };

  const addMember = (e) => {
    e.preventDefault();
    const {
      email: { value: email },
    } = e.target;
    fetch("/api/member", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        id,
      }),
    })
      .then((res) => res.json())
      .then((partyMember) => {
        setPartyMembers([...partyMember.members])
        setParty(partyMember)
        e.target.children[0].children[0].value = ''
      });
  };

  const author = party.author;

  const buttons = (
    <div className="btns-group">
      <button className="btn btn-primary" onClick={deleteParty}>
        <i className="fa fa-trash"></i>
      </button>
      <button
        className="btn btn-primary"
        onClick={() => history.push(`/editform/${id}`)}
      >
        <i className="fa fa-edit"></i>
      </button>
      <br />
    </div>
  );

  const partyData = (
    <>
      <div className="text-box-left">
        <div>{party.partyName}</div>
        <div><span>Adress:</span> {party.partyPlace}</div>
        <div>Date: {party.partyDate}</div>
        <div>Time: {party.partyTime}</div>
        <div>Price: {party.partyPrice}</div>
        <div>Share money: {party.partyRemainder}</div>
      </div>
    </>
  );

  const admin = (
    <>
      <p className="lead">Members</p>
      <ul>
        {partyMembers?.map((el) => (
          <li>
            <button
              onClick={delMember}
              key={el.avatar}
              name={el._id}
              className="fa fa-trash"
            />
            {el.name}
          </li>
        ))}
      </ul>
    </>
  );

  const members = (
    <>
      <p className="lead">Members</p>
      <ul>
        {partyMembers?.map((el) => (
          <li key={el.email}>{el.name}</li>
        ))}
      </ul>
    </>
  );

  const addMemberInput = (
    <>
      <form className="form" onSubmit={addMember}>
        <div className="members">
          <input placeholder=" enter user email" name="email" />
          <button className="btn">
            <i className="fi fas fa-plus-circle"></i>
          </button>
        </div>
      </form>
    </>
  );

  return (
    <>
      <div className="partyRoom">
        <div className="partyInfo">
          {user && partyData}
          {user && author === user._id ? buttons : null}
        </div>
        <ChatPage/>
        <div className="membersStyle">
          {user && author === user._id ? addMemberInput : null}

          {user && author === user._id ? admin : members}
        </div>
      </div>
    </>
  );
}
export default PartyRoom

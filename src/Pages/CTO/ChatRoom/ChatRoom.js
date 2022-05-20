import React from 'react';
import useAuth from '../../../hooks/useAuth';
import userImage from '../../../Images/user-demo.png'
import './ChatRoom.css'

const ChatRoom = () => {

    const { user } = useAuth();

    return (
        <div>
            <h6 className="page-header">Chat Room</h6>

            <div className="chat-box  mt-3">

                <div className="chat-header bg-primary p-2">
                    <div>
                        <h5>{user.displayName}</h5>
                        <p>Active now</p>
                    </div>
                </div>



                <div className="received-msg d-flex align-items-center">
                    <img className="msg-img" src={userImage} alt="" />
                    <p className="msg-received">Hello !! how the works going ? <br />
                        everything okay ?
                    </p>
                </div>


                <div className="send-msg d-flex align-items-center justify-content-end bg-primary text-light">
                    <p className="msg-send"> Hi!! going well <br />
                        Yes! everything is under control
                    </p>
                </div>

                <div className="received-msg d-flex align-items-center">
                    <img className="msg-img" src={userImage} alt="" />
                    <p className="msg-received">okay cool <br />
                    </p>
                </div>


                <div className="msg-type">

                    <form action="">

                        <input type="text" className="input-field msg-text-box" placeholder="type message here" ></input>
                        <button type="submit" className="send-btn btn btn-primary">Send</button>
                    </form>

                </div>






            </div>




        </div >
    );
};

export default ChatRoom;
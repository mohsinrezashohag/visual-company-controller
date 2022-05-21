import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MyWorks = () => {
    const { user } = useAuth();

    const [myWorks, setMyWorks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/myAssignedWorks')
            .then(res => res.json())
            .then(data => setMyWorks(data))
    }, [])

    const userName = user.displayName;






    // const [ownWorks, setOwnWorks] = useState([]);
    // useEffect(() => {
    //     fetch(`http://localhost:5000/check/${user.displayName}`)
    //         .then(res => res.json())
    //         .then(data => setOwnWorks(data))
    // }, [])
    // console.log("this line : ", ownWorks);







    return (
        <div>
            <h6 className="page-header">My Works</h6>

            {myWorks.map(work => <div key={work._id}>

                {/* <p>{work.title}</p> */}

                {work.userName ? <p> Hello</p> : <p>Nai</p>}


            </div>)
            }
        </div >
    );
};

export default MyWorks;
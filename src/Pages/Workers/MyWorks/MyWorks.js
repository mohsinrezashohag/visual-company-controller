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
    console.log(typeof userName);
    const check = myWorks.filter(element => element.sharif === true);
    console.log(check);

    for (let i = 0; i < myWorks.length; i++) {

        console.log(myWorks[i]);

        if (myWorks[i].userName === true) {

            console.log(myWorks[i]);
        }

    }








    // console.log("this is my works", myWorks);
    // const [ownWorks, setOwnWorks] = useState([]);
    // useEffect(() => {
    //     fetch(`http://localhost:5000/check/${user.displayName}`)
    //         .then(res => res.json())
    //         .then(data => setOwnWorks(data))
    // }, [])
    // console.log("this line : ", ownWorks);




    // console.log(userName);
    // const myAssignedWorks = myWorks.filter(work => {

    //     if (work.userName === true) {
    //         return works
    //     }

    // });
    // console.log(myAssignedWorks);




    return (
        <div>
            <h6 className="page-header">My Works</h6>

            {myWorks.map(work => <div key={work._id}>

                {/* <p>{work.title}</p> */}

                {`work.${userName}` ? <p> Hello</p> : <p>Nai</p>}


            </div>)
            }
        </div >
    );
};

export default MyWorks;
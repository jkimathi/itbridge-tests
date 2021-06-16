import React, { useEffect } from 'react'

const Logout = (props: any) => {

    useEffect(() => {
        sessionStorage.clear();

        props.history.push("/");

    }, []);
    return (
        <div>
            <h3 >Logging out...</h3>
        </div>
    )
}

export default Logout
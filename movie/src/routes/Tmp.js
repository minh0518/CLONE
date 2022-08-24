import React, { useEffect } from 'react';

const Tmp = () => {

    useEffect(()=>{
        console.log('a')
    })

    console.log('b')

    useEffect(()=>{
        console.log('c')    
    })
    return (
        <div>
            aa
        </div>
    );
};

export default Tmp;
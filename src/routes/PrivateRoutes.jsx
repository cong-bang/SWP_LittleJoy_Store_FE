import React, { useEffect } from 'react'
import { Route } from 'react-router-dom';

const PrivateRoutes = (props) => {

    useEffect(() => {

    }, [])

  return (
    <>
        <Route path={props.path} component={props.component}/>
    </>
  )
}
export default PrivateRoutes;
import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import {NavigationActions} from 'react-navigation';

const NavigationContainer = props => {
    // If token true of false 
    const navRef = useRef();
    const isAuth = useSelector(state => !!state.auth.token);

    // UseEfect 
    useEffect(() => {
        if(!isAuth) {
            navRef.current.dispatch(NavigationActions.navigate({
                routeName: 'Auth'
            }))
        }
    }, [isAuth]);

    
}
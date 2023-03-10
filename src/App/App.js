import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

import HomePage from '../pages/homepage/homepage.component';
import ShopPage from '../pages/shop/shop.component';
import SignInAndSignUpPage from '../pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { default as CheckoutPage } from '../pages/checkout/checkout.container';
import { default as Header }  from '../components/header/header.container';

import { auth, createUserProfileDocument } from '../firebase/firebase.utils';
import { onSnapshot } from 'firebase/firestore'

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop/*' element={<ShopPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path="/signin" element={
            this.props.currentUser
              ? <Navigate to="/"/>
              : <SignInAndSignUpPage/>
          }/>
        </Routes>
      </div>
    );
  }
};

export default App;

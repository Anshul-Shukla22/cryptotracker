import { Avatar, Button, Drawer } from '@mui/material';
import { signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { CryptoState } from '../../CryptoContext';
import { auth, db } from '../../firebase';
import { AiFillDelete } from 'react-icons/ai';
import './UserSidebar.css';
import { BiArrowBack } from 'react-icons/bi';
import { numberWithCommas } from '../../Pages/CoinPage';
const UserSidebar = () => {
    const [state, setState] = useState({
      right: false,
    });
    const { user, setAlert, watchlist, coins, symbol } = CryptoState();
  
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const logOut = () => {
      signOut(auth);
      setAlert({
        open: true,
        type: "success",
        message: "Logout Successfull !",
      });
  
      toggleDrawer();
    };
  
    const removeFromWatchlist = async (coin) => {
      const coinRef = doc(db, "watchlist", user.uid);
      try {
        await setDoc(
          coinRef,
          { coins: watchlist.filter((wish) => wish !== coin?.id) },
          { merge: true }
        );
  
        setAlert({
          open: true,
          message: `${coin.name} Removed from the Watchlist !`,
          type: "success",
        });
      } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      }
    };
  return (
    <div>
       {["right"].map((anchor) => (
        <div key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className='usercontainer'>
            <div>
            <BiArrowBack
            fontSize={25}
            onClick={toggleDrawer(anchor, false)}
            style={{cursor: "pointer"}}
            />
              </div>
              <div className='userprofile'>
                <Avatar
                  className='userpicture'
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className='watchlist'>
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" ,backgroundColor:"grey"}}>
                    Watchlist
                  </span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div className='usercoin'>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <></>;
                  })}
                </div>
              </div>
              <Button
                variant="contained"
                className='logout'
                onClick={logOut}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </div>
      ))}
    </div>
  );
}

export default UserSidebar;

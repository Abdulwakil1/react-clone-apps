import React, { useState } from "react";
import "../Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Importing the location icon
import { useStateValue } from "./StateProvider";
import { useIntl } from "react-intl";
import LanguageIcon from "@mui/icons-material/Language";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { auth } from "../firebase";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function Header({ locale, setLocale }) {
  const [{ basket, user, userAddress, name }, dispatch] = useStateValue(); // Accessing userAddress from state
  const [showDropdown, setShowDropdown] = useState(false);
  const intl = useIntl();
  console.log("Header basket:", basket);

  // Fetches and updates user address and name from Firestore if a user is logged in
  useEffect(() => {
    const fetchUserAddress = async () => {
      if (user) {
        try {
          const userDoc = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDoc);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            dispatch({
              type: "SET_USER_ADDRESS",
              address: userData.address || "Your City 00000",
            });
            // Optionally update the user name based on fetched data
            dispatch({
              type: "SET_USER_NAME",
              name: userData.name || user.email, // Fallback to email if name doesn't exist
            });
            // console.log("Fetched Address:", userData.address);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user address:", error);
        }
      }
    };

    fetchUserAddress();
  }, [user, dispatch]); // Re-run if 'user' or 'dispatch' changes

  const changeLanguage = (lang) => {
    setLocale(lang);
  };

  // Signs out the user and clears user data from the state.
  const handleAuthentication = async () => {
    if (user) {
      try {
        await auth.signOut();
        dispatch({
          type: "CLEAR_USER", // Clear user data on sign-out
        });
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  };

  // Display personalized greeting based on user name, email, or default to "Guest".
  const displayName = name
    ? intl.formatMessage({ id: "greeting" }, { name })
    : user?.email
    ? intl.formatMessage({ id: "greeting" }, { name: user.email })
    : intl.formatMessage(
        { id: "greeting" },
        { name: intl.formatMessage({ id: "guest" }) }
      );

  return (
    <nav className="header">
      {/* Left Section */}
      {/* <div className="header__left"> */}
      {/* Logo */}
      <Link to="/">
        <img
          className="header__logo header__logo--hoverEffect"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
        />
      </Link>

      {/* Address Group */}
      <div className="header__addressGroup">
        <LocationOnIcon className="header__locationIcon" />
        <div className="header__addressText">
          <span className="header__optionLineOne">
            {intl.formatMessage(
              { id: "deliveringTo" },
              { address: userAddress || "Your City 00000" }
            )}
          </span>
          <span className="header__optionLineTwo">
            {intl.formatMessage({ id: "updateLocation" })}
          </span>
        </div>
      </div>
      {/* </div> */}

      {/* Middle Section */}
      <div className="header__middle">
        <div className="header__search">
          <input
            type="text"
            placeholder="Search Amazon"
            className="header__searchInput"
          />
          <SearchIcon className="header__searchIcon" />
        </div>
      </div>

      {/* Right Section */}
      <div className="header__right">
        <div
          className="header__languageSwitcher"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="header__languageCurrent">
            <LanguageIcon className="header__languageIcon" />
            <span className="header__languageText">
              {locale === "en" ? "EN" : "ES"}
            </span>
            <span className="header__dropdownIcon">▼</span>
          </div>

          {showDropdown && (
            <div className="header__dropdownWrapper">
              <div className="header__dropdownArrow"></div>
              <div className="header__dropdown">
                <div
                  className="header__dropdownOption"
                  onClick={() => changeLanguage("en")}
                >
                  {locale === "en" ? (
                    <RadioButtonCheckedIcon style={{ color: "#f57f2c" }} />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                  <span className="header__dropdownOptionText">
                    English - EN
                  </span>
                </div>
                <hr />
                <div
                  className="header__dropdownOption"
                  onClick={() => changeLanguage("es")}
                >
                  {locale === "es" ? (
                    <RadioButtonCheckedIcon style={{ color: "#f57f2c" }} />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                  <span className="header__dropdownOptionText">
                    Español - ES
                  </span>
                </div>
                <div className="header__dropdownOption link">Learn more</div>
                <hr />
                <div className="header__dropdownOption">
                  You are shopping on Amazon.com
                </div>
                <div className="header__dropdownOption link">
                  Change country/region
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="header__nav">
          <Link to={!user && "/login"} className="header__link">
            <div onClick={handleAuthentication} className="header__option">
              <span className="header__optionLineOne">{displayName}</span>
              <span className="header__optionLineTwo">
                {user
                  ? intl.formatMessage({ id: "signOut" })
                  : intl.formatMessage({ id: "signIn" })}
              </span>
            </div>
          </Link>

          <Link to="/" className="header__link">
            <div className="header__option">
              <span className="header__optionLineOne">
                {intl.formatMessage({ id: "returns" })}
              </span>
              <span className="header__optionLineTwo">
                {intl.formatMessage({ id: "orders" })}
              </span>
            </div>
          </Link>

          <Link to="/" className="header__link">
            <div className="header__option">
              <span className="header__optionLineOne">
                {intl.formatMessage({ id: "yourPrime" })}
              </span>
              <span className="header__optionLineTwo">Prime</span>
            </div>
          </Link>

          <Link to="/checkout" className="header__link">
            <div className="header__optionBasketGroup">
              <div className="header__optionBasket">
                <ShoppingBasketIcon />
                <span className="header__optionLineTwo header__basketCount">
                  {intl.formatMessage(
                    { id: "basketCount" },
                    { itemCount: basket?.length || 0 }
                  )}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;

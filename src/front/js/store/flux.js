const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: null,
      exoticWeapons: [],
      singleExoticWeapon: [],
      legendaryWeapons: [],
      singleLegendaryWeapons: [],
      rareWeapons: [],
      singleRareWeapons: [],
      uncommonWeapons: [],
      singleUncommonWeapons: [],
      starRating: [],
    },
    actions: {
      getData: () => {
        fetch(process.env.BACKEND_URL + "/api/legendary", {
          // FIGURING OUT HOW TO GET THE RIGHT END TO THE URL TO SHOW US ALL THE INFO IN A LIST
          method: "GET",
          redirect: "follow",
        })
          .then((res) => res.json())
          .then((data) => setStore({ legendaryWeapons: data }))
          .catch((error) => console.log("error", error));
        // let url = fetch().map() +
      },
      pullExotic: () => {
        fetch(process.env.BACKEND_URL + `/api/exotics`, {
          method: "GET",
          redirect: "follow",
          // mode: "no-cors",
        })
          .then((res) => res.json())
          .then((data) => setStore({ exoticWeapons: data }))
          .catch((err) => console.log("err", err));
      },
      singleExoticWeapon: (id) => {
        fetch(process.env.BACKEND_URL + `/api/exotics/${id}`, {
          method: "GET",
          redirect: "follow",
        })
          .then((res) => res.json())
          .then((data) => setStore({ singleExoticWeapon: data }))
          .catch((error) => console.log("error", error));
      },
      pullLegendary: () => {
        fetch(process.env.BACKEND_URL + `/api/legendary`, {
          method: "GET",
          redirect: "follow",
          // mode: "no-cors",
        })
          .then((res) => res.json())
          .then((data) => setStore({ legendaryWeapons: data }))
          .catch((err) => console.log("err", err));
      },
      singleLegendaryWeapon: (id) => {
        fetch(process.env.BACKEND_URL + `/api/legendary/${id}`, {
          method: "GET",
          redirect: "follow",
        })
          .then((res) => res.json())
          .then((data) => setStore({ singleLegendaryWeapon: data }))
          .catch((error) => console.log("error", error));
      },
      pullRare: () => {
        fetch(process.env.BACKEND_URL + `/api/rare`, {
          method: "GET",
          redirect: "follow",
          // mode: "no-cors",
        })
          .then((res) => res.json())
          .then((data) => setStore({ rareWeapons: data }))
          .catch((err) => console.log("err", err));
      },
      singleRareWeapon: (id) => {
        fetch(process.env.BACKEND_URL + `/api/rare/${id}`, {
          method: "GET",
          redirect: "follow",
        })
          .then((res) => res.json())
          .then((data) => setStore({ singleRareWeapon: data }))
          .catch((error) => console.log("error", error));
      },
      pullUncommon: () => {
        fetch(process.env.BACKEND_URL + `/api/uncommon`, {
          method: "GET",
          redirect: "follow",
          // mode: "no-cors",
        })
          .then((res) => res.json())
          .then((data) => setStore({ uncommonWeapons: data }))
          .catch((err) => console.log("err", err));
      },
      singleUncommonWeapon: (id) => {
        fetch(process.env.BACKEND_URL + `/api/uncommon/${id}`, {
          method: "GET",
          redirect: "follow",
        })
          .then((res) => res.json())
          .then((data) => setStore({ singleUncommonWeapon: data }))
          .catch((error) => console.log("error", error));
      },

      signUp: (new_user) => {
        fetch(process.env.BACKEND_URL + "/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(new_user),
          // redirect: "follow",
        })
          .then((response) => response.json())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      },
      signIn: (email, password) => {
        const user = {
          email: email,
          password: password,
        };
        fetch(process.env.BACKEND_URL + "/api/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
          redirect: "follow",
        })
          .then((response) => response.json())
          .then((result) => getActions().verifyUser(result.access_token))
          .catch((error) => console.log("error", error));
      },

      verifyUser: (token) => {
        fetch(process.env.BACKEND_URL + "/api/protected", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          redirect: "follow",
        })
          .then((response) => response.json())
          .then((result) => setStore({ user: result }))
          .catch((error) => console.log("error", error));
        // localStorage.setItem("token", token);
      },
      logout: () => {
        setStore({ user: null });
      },
    },
  };
};
export default getState;

import axios from "axios";
import { useState, useEffect } from "react";

function UserData(props) {
  const [name, setName] = useState("");
  const [userFound, setUserFound] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data && res.data.user) {
            setName(res.data.user.firstName + " " + res.data.user.lastName);
            setUserFound(true);
          } else {
            setName("");
            setUserFound(false);
          }
        })
        .catch((err) => {
          console.error("Request failed:", err.response?.data || err.message);
          setName("");
          setUserFound(false);
        });
    } else {
      setName("");
      setUserFound(false);
    }
  }, [token]);

  return (
    <div className="absolute right-0 flex items-center cursor-pointer mr-2">
      <img
        className="rounded-full w-[50px] h-[50px]"
        src={props.imageLink}
        alt="User avatar"
      />
      <span className="text-white ml-[5px] text-xl">{name}</span>
      {userFound && (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setName("");
            setUserFound(false);
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default UserData;

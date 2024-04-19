import { axiosPrivate } from "../api/axios";
import { useState, useEffect } from "react";

const useData = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      try {
        const response = await axiosPrivate.get(url, {
          headers: {
            "authorization": `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
        !ignore && setData(response);
      } catch (err) {
        console.error(err.message);
      }
    }
    getData();
    return () => {
      ignore = true;
    }
  }, [url]);
  return data;
}

export default useData;

import { useState, useEffect } from "react";
import axios from "axios";

export const useResource = (baseUrl) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getAll = async () => {
      try {
        const result = await axios.get(baseUrl);
        setData(result.data);
      } catch (err) {
        setData([]);
      }
    };
    getAll();
  }, [baseUrl]);
  const services = {
    create: async (resource) => {
      try {
        console.log(resource);
        const result = await axios.post(baseUrl, resource);
        setData(data.concat(result.data));
      } catch (err) {
        console.log(err);
      }
    },
  };

  return [data, services];
};

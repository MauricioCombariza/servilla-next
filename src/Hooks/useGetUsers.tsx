import React from "react";

const useGetUsers = async (API: string) => {
  const [usuarios, setUsuarios] = React.useState([]);
  const res = await fetch(API);
  const data = await res.json();
  setUsuarios(data);
  return usuarios;
};

export { useGetUsers };
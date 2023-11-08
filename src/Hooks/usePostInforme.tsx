
export interface InformeType {
    API: string
    mensajero: string,
}

const usePostInforme = async (loginData: InformeType) => {
  const res = await fetch(loginData.API, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `mensajero=${loginData.mensajero}`,
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  const answer = data["detail"];
  return answer;
};

export { usePostInforme };

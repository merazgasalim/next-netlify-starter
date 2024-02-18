const KEY = process.env.Server_Api_Key;

//Add new device MAG
export const addNewDevice = async (
  type, // mag , m3u
  sub, //1,3,6,12
  pack,
  mac = "", //MAC address
  country = "",
  notes = ""
) => {
  const res = await fetch(
    `https://ipnetwork.tv/api/api.php?action=new&type=${type}&user=${mac}&sub=${sub}&pack=${pack}&country=${country}&notes=${notes}&api_key=${KEY}`
  );
  const ans = await res.json();
  return ans;
};

//Add new device MAG
export const reNewDevice = async (
  type, // mag , m3u
  userid,
  sub //1,3,6,12
) => {
  const res = await fetch(
    `https://ipnetwork.tv/api/api.php?action=renew&type=${type}&id=${userid}&sub=${sub}&api_key=${KEY}`
  );
  const ans = await res.json();
  return ans;
};

//List all custom bouquet user added in panel
export const getAllCustomBouguet = async () => {
  const res = await fetch(
    `https://ipnetwork.tv/api/api.php?action=bouquet&api_key=${KEY}`
  );
  const ans = await res.json();
  return ans;
};

//Reseller information
export const getResellerInformation = async () => {
  const res = await fetch(
    `https://ipnetwork.tv/api/api.php?action=reseller&api_key=${KEY}`
  );
  const ans = await res.json();
  return ans;
};

//Device information
export const getDeviceInformation = async (userid) => {
  const res = await fetch(
    `https://ipnetwork.tv/api/api.php?action=device_info&id=${userid}&api_key=${KEY}`
  );
  const ans = await res.json();
  return ans;
};

//Set Device information
export const setDeviceStatus = async (
  userid,
  status //enable/disable
) => {
  const res = await fetch(
    `https://ipnetwork.tv/api/api.php?action=device_status&status=${status}&id=${userid}&pi_key=${KEY}`
  );
  const ans = await res.json();
  return ans;
};

export function openPopup(url: string) {
  const features = {
    popup: "yes",
    width: 1000,
    height: 800,
    top: "auto",
    left: "auto",
    toolbar: "no",
    menubar: "no",
  };

  const strWindowsFeatures = Object.entries(features)
    .reduce((str, [key, value]) => {
      if (value == "auto") {
        if (key === "top") {
          const v = Math.round(window.innerHeight / 2 - features.height / 2);
          str += `top=${v},`;
        } else if (key === "left") {
          const v = Math.round(window.innerWidth / 2 - features.width / 2);
          str += `left=${v},`;
        }
        return str;
      }

      str += `${key}=${value},`;
      return str;
    }, "")
    .slice(0, -1);

  window.open(url, "_blank", strWindowsFeatures);
}


export async function getSessionToken() {
  const response = await fetch("http://localhost:5000/oem/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      ttl: 1800,
      data: {
        email: "omeed@spud.com",
      },
    }),
  });

  const json = await response.json();

  return json.token
}
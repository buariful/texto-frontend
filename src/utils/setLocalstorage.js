export default function setLocalStorage(token) {
  localStorage.setItem("auth", JSON.stringify(token));
}

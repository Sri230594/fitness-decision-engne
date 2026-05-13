import "./Loading.css";

function Loading({ message }) {
  return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <p>{message || "Loading..."}</p>
    </div>
  );
}

export default Loading;

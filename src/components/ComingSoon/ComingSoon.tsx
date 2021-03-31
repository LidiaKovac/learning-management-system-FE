import WIP from "../../assets/wip.png";

export const ComingSoon = () => {
  return (
    <span
      style={{
        width: "100%",
        height: "200px",
        fontWeight: "bold",
        textAlign: "center",
        paddingLeft: "60px",
        fontSize: "22pt",
        color: "#00B4FF",
      }}
    >
      Coming soon! <img src={WIP} style={{ width: "25px" }} alt='wip' />
    </span>
  );
};

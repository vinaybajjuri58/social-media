import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 80px 80px;
  border-color: blue;
`;
const color = "blue";
export const LoadingComponent = ({ apiCallStatus }) => {
  return (
    <BeatLoader
      color={color}
      loading={apiCallStatus}
      css={override}
      size={15}
    />
  );
};

export const CircleLoading = () => {
  return <ClipLoader color="white" loading={true} size={25} />;
};

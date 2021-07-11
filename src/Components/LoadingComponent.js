import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
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

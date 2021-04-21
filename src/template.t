import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Icon from "../icon";

const Svg = styled(Icon)`
  width: 24px;
  height: 24px;
`;

interface IProps {
  color: ColorSpaceConversion;
  path: string;
  viewBox: string;
}

export const <----Nametemplate---->: FunctionComponent<IProps> = ({
  color,
  path,
  viewBox = "0 0 24 24",
  ...otherProps
}) => (
  <Svg {...otherProps} viewBox={viewBox} color={color}>
    <----Svgtemplate---->
  </Svg>
);

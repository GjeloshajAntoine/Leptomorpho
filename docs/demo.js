import { createElement, Component } from "https://cdn.skypack.dev/react";
import { render } from "https://cdn.skypack.dev/react-dom";
import htm from "https://cdn.skypack.dev/htm";
import styled from "https://cdn.skypack.dev/styled-components";

const html = htm.bind(createElement);
const ControlBox = styled.div`
  background-color: #eae7e3;
  width: 35vw;
  height: 35vh;
  margin: 0 auto;
  margin-top: 25vh;
  padding: 5px;
`;
const StyledButton = styled.button`
  border: 1px solid #a9a9a9; // not color ?
  border-radius: 1em;
  transition: all 0.1s;
  &:active {
    // transform: rotateY(15deg) rotateX(15deg);
    // transform: rotate3d(0, 15, 0, 1deg);
    background: linear-gradient(
        0deg,
        rgb(191 191 191 / 44%) 0%,
        rgb(197 197 197 / 0%) 100%
      );
    backdrop-filter: hue-rotate(174deg) invert(70%);

    &:before {
      /* content: ""; */
      position: absolute;
      /* background-color: rgb(255 255 255 / 0%); */
      background: linear-gradient(
        0deg,
        rgb(191 191 191 / 44%) 0%,
        rgb(197 197 197 / 0%) 100%
      );
      height: 20px;
      width: 65px;
      border-radius: 1em;
      backdrop-filter: hue-rotate(174deg) invert(70%);
      // top: 170px;
      // left: 625px;
    }
  }
`;

const app = html`
      <${ControlBox}>
        <p>Hello World!___</p>
        <${StyledButton}>Click me!</${StyledButton}>
      </${ControlBox}>
      `;
render(app, document.body);

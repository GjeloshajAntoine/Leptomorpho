import { createElement, Component, useState,useRef } from "https://cdn.skypack.dev/react";
import { render } from "https://cdn.skypack.dev/react-dom";
import htm from "https://cdn.skypack.dev/htm";
import styled from "https://cdn.skypack.dev/styled-components";
import {ShareApple} from "https://cdn.skypack.dev/@styled-icons/evil"
import color from 'https://cdn.skypack.dev/color';
import useToggle from "https://cdn.skypack.dev/@react-hook/toggle"
import useSize from "https://cdn.skypack.dev/@react-hook/size"

const html = htm.bind(createElement);
const ControlBox = styled.div`
  background-color: #eae7e3;
  width: 65vw;
  height: 35vh;
  margin: 0 auto;
  margin-top: 25vh;
  padding: 5px;
`;
const StyledButton = styled.button`
  background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;

  border: 1px solid #a9a9a9; // not color ?
  border-radius: 1em;
  transition: all 0.1s;
  padding: 3px;
  font-size: 12px;
  min-width: 25px;
  min-height: 25px; 

  &:active {
    background: linear-gradient(
        0deg,
        rgb(191 191 191 / 44%) 0%,
        rgb(197 197 197 / 0%) 100%
      );
    backdrop-filter: hue-rotate(174deg) invert(70%);

    &:before {
      position: absolute;

      background: linear-gradient(
        0deg,
        rgb(191 191 191 / 44%) 0%,
        rgb(197 197 197 / 0%) 100%
      );
      height: 20px;
      width: 65px;
      border-radius: 1em;
      backdrop-filter: hue-rotate(174deg) invert(70%);
    }
  }
`;


const DropDownMenu = ({children}) => {
  return children
}


const StyledPanel = styled.div`
  position:absolute;
  /* display:none; */
`

const MenuPanel = ({children}) => {
  return html`
  <${StyledPanel}>
    ${children}
  </${StyledPanel}>
  `
}

const FloatingTo = ({children})=> {
  const ref = useRef(null)
  const [x,y] = useSize(ref)
  return html ``
}

const MenuItem = ({name,children}) => {
  const [isOpen, onToggle] = useToggle(false);

  return html`<span 
                style=${{
                  fontSize:'12px',
                  fontFamily:'-apple-system'
              }}
                onClick=${onToggle}
              >
                  ${name}
                  ${isOpen ? html`
                    <${MenuPanel}>
                      ${children}
                    </${MenuPanel}>`
            :null}
              </span>`
}
const app = html`
      <${ControlBox}>
        <p>Hello World!___</p>
        <${StyledButton}>Click me!</${StyledButton}>
        <${StyledButton}> <${ShareApple}/> </${StyledButton}>
        <br/>
        <${DropDownMenu}>
          <${MenuItem}
            name=${html`<span> File</span>`}
          > 
            <${MenuItem} name="Open" />
           </${MenuItem} name="New">
          <${MenuItem} name='Edit'> 
            <${MenuItem} name="Open" />
          </${MenuItem}>
        </${DropDownMenu}>
        <br>
        "test un trc"^
      </${ControlBox}>
      `;
render(app, document.body);
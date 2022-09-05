import React, { createElement, Component, useState, useMemo,useRef, useEffect, useCallback } from "https://cdn.skypack.dev/react";
import { render } from "https://cdn.skypack.dev/react-dom";
import htm from "https://cdn.skypack.dev/htm";
import styled, { createGlobalStyle } from "https://cdn.skypack.dev/styled-components";
import { ShareApple } from "https://cdn.skypack.dev/@styled-icons/evil"
import { ArrowDropRight } from "https://cdn.skypack.dev/@styled-icons/remix-fill/ArrowDropRight"
import color from 'https://cdn.skypack.dev/color';
import useToggle from "https://cdn.skypack.dev/@react-hook/toggle"
import useWindowSize from 'https://cdn.skypack.dev/@rehooks/window-size';
import useOnclickOutside from 'https://cdn.skypack.dev/react-cool-onclickoutside';
import hotkeys from 'https://cdn.skypack.dev/hotkeys-js';


mobileConsole.show()

// const html = htm.bind((type,props,...children)=>{/*console.log(type);*/return createElement(type,props,...children)});
const html = htm.bind(createElement);

const TheHTML = createGlobalStyle`
  html,body {
    overscroll-behavior-y: none;
    position: fixed;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }

`;

const ControlBox = styled.div`
  background-color: #eae7e3;
  width: 65vw;
  height: 45vh;
  margin: 0 auto;
  /* margin-top: 15vh; */
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


const directionToFlex = ({ direction }) => ({ horizontal: 'row', vertical: 'column' }[direction] ?? 'row')

const StyledDopDownMenu = styled.div`
  display: flex;
  flex-direction :${directionToFlex};
  gap : 3px;

`


const StyledPanel = styled.div`
  position:absolute;
  background-color: white;
  z-index: 1;
  top:${({ top }) => top}px;
  left:${({ left }) => left}px;
  visibility: ${({ visibility }) => visibility ? 'visible' : 'hidden'};
  width: auto;
`

const DropDownMenu = ({ children, className, direction = 'horizontal', openHeaderItemOn = 'click', triggerItemOn = 'MouseUp', search, zIndex }) => {
  const [mouseIsOn, setmouseIsOn] = useState(false);
  const [openPath, setOpenPath] = useState([])
  const dropDownRef = useRef(null)

  useOnclickOutside(() => {
    console.log('useOnclickOutside');
    setOpenPath([]) 
  },{disabled: !openPath.length ,refs:[dropDownRef]});

  useMemo(()=> { 
    hotkeys.unbind(); 
    const extractPropsChildrenAllLevel = Array.from(children).map(function Fla({props:{children,shortCut,onAction}={}}){return [children ? Array.from(children).map(child=>Fla(child)): [{onAction,shortCut}]]}).flat(Infinity).filter(u=>!!u.shortCut)
    extractPropsChildrenAllLevel.map(({shortCut,onAction})=>hotkeys(shortCut,onAction))
  },[children])

  const onHeaderItemClick = (e, Item,idx) => {
    e.preventDefault()
    e.stopPropagation()

    openPath[0] === idx && !mouseIsOn ? setOpenPath([]) : setOpenPath([idx])
    setmouseIsOn(true)
  }

  const onMouseUpItem = (e, Item, idx, currentPath) => {
    e.stopPropagation();
    e.preventDefault();

    const slicedOpenPath = openPath.slice(0,currentPath.length);
    const { props: { children } } = Item
    children ? setOpenPath([...slicedOpenPath,idx]) : setOpenPath([])
    setmouseIsOn(false)
    Item.props.onAction?.();
  }

  function onMouseOver(e,c,idx,currentPath) {
    e.stopPropagation()
    e.preventDefault()

    const slicedOpenPath = openPath.slice(0,currentPath.length);
    setOpenPath([...slicedOpenPath,idx])
  }

  const onTouchMoveItem = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const { touches,touches:[{clientX,clientY}={}]=[] } = e;

    if (!openPath.length && !mouseIsOn) return;
    if (touches) {
      const newTarget = document.elementFromPoint(clientX,clientY);
      newTarget.dispatchEvent(new Event('mouseover',{bubbles: true,}))
    }
  }
  
  const onTouchEndItem = (e) => {
    const { target, touches,changedTouches:[{clientX,clientY}={}]=[] } = e;
    
    const newTarget = document.elementFromPoint(clientX,clientY);
    if (touches && newTarget !== target) {
      newTarget.dispatchEvent(new Event('mouseup',{bubbles: true,}))
    }
  }


  function AddCallBackToItems(children,[pathidx,...restPath],currentPath=[]) {
    
    const childrenWithCb = children.map((c,idx)=>React.cloneElement(c,{
      idx,
      onMouseOver: !!openPath.length ? e=> onMouseOver(e,c,idx,currentPath) : null,
      onMouseDown : !currentPath.length && !('ontouchstart' in window) ? e => onHeaderItemClick(e,c,idx,currentPath) : e => e.stopPropagation(),
      onTouchStart: !currentPath.length ? e => onHeaderItemClick(e,c,idx,currentPath, openPath) : e => e.preventDefault(),
      onMouseUp: !!currentPath.length ? e=> onMouseUpItem(e,c,idx,currentPath) : ()=> setmouseIsOn(false),
      onTouchMove: e => onTouchMoveItem(e,c,idx,currentPath),
      onTouchEnd: e => onTouchEndItem(e,c),
      isOpen:idx === pathidx,
      isTopLevel: currentPath.length === 0,
      ...c.props,
    },idx === pathidx ? AddCallBackToItems(React.Children.toArray(c.props.children),restPath,[...currentPath,pathidx]) : c.props.children))
    return childrenWithCb;
  }

  return html`
    <${StyledDopDownMenu} className=${className} ref=${dropDownRef} direction=${direction}>
      ${AddCallBackToItems(React.Children.toArray(children),openPath)}
    </${StyledDopDownMenu}>
  
  `
}


const StyledItem = styled.div`
  font-size: 25px;
  font-family:'-apple-system';
  display: flex;
  width: 100;
  cursor: default;
  user-select: none;
  position: relative;
  white-space: nowrap;

  ${({isTopLevel})=>isTopLevel? `
    background-color: #eae7e3;
    width: fit-content; 
  `:`
    width: 100%;
    background-color: white;
    font-weight:bold;
    justify-content: space-between;
  `};
  
  filter:${({isOpen})=>isOpen?`invert(100%)`:null}; 

  ${({isTopLevel})=>!isTopLevel? `
    &:hover, &:active{
      filter:invert(100%);
    }
  `:null}

  gap : 12px;
  gap: 18px;
  &.active {
    background-color: pink;
  }
`

const MenuItem = React.forwardRef(({ name, className, children, isTopLevel,key,shortCut,isOpen, ...restProps },refBefore) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(()=>{
    setIsVisible(true)
  },[ref])

  const { top, bottom, height, left, right, width} = ref?.current?.getBoundingClientRect?.() ?? {}

  return html`
              <${StyledItem} 
                className=${className}
                direction=${isTopLevel ? 'horizontal' : 'vertical'}
                ...${restProps}
                ref=${ref}
                key=${key}
                isTopLevel=${isTopLevel}
                isOpen=${isOpen}
              >
                  ${name ?? null}
                  ${shortCut ? html`<span>${shortCut.replaceAll('+',' ')}</span>` :null}
                  ${!isTopLevel && children?.length ? html`<${ArrowDropRight} size='12' />`:null}
                  ${isOpen? 
                    html`
                      <${StyledPanel} top=${isTopLevel ? height : undefined} left=${!isTopLevel ? width + 2 : undefined} visibility=${isVisible} >
                       ${children}
                      </${StyledPanel}> 
                    `
                    : null}
              </${StyledItem}>
              `
})
MenuItem.displayName = 'MenuItem'

function MenuSearch() {
  return html`<input style=${{width:'80%',minWidth:'100px'}} type="text"/>`
}

const App = () => html`
      <${React.Fragment}>
      <${TheHTML}/>
      <${ControlBox}>
        <p>Hello World!___</p>
        <${StyledButton}>Click me!</${StyledButton}>
        <${StyledButton}> <${ShareApple}/> </${StyledButton}>
        <br/>
        <br/>
        <br/>
        <${DropDownMenu} direction='horizontal' multipleOpen=${false} zIndex=${1}>
          <${MenuItem}   name=${html`<span> File</span>`}> 
            <${MenuItem} name="Open" />
            <${MenuItem} name="New" />
          </${MenuItem}/>

          <${MenuItem} name='Edit'> 
            <${MenuItem} name="Undo" onAction=${(a)=>console.log('shortcut_',a)} shortCut=${'ctrl+z'}/>
            <${MenuItem} name="Redo" />
            <${MenuItem} name="Copy" />
            <${MenuItem} name="Past" />
            <${MenuItem} name="Truc" shortCut="ctrl+truc" />
            <${MenuItem} name="Sub menu" ref=${(node)=>console.log('1st node',node)}> 
              <${MenuItem} name="Sub item A">
                <${MenuItem} name="Copy" onAction=${()=>console.log('sub copy')} />
                <${MenuItem} name="Past" />
                <${MenuItem} name="mais encore">
                  <${MenuItem} name="Past" />
                  <${MenuItem} name="Copy" />
                </>
              </${MenuItem}>
              <${MenuItem} name="Sub item B"/>
            </${MenuItem}>
            <${MenuItem} name="Sub Next"> 
              <${MenuItem} name="TRUC" onAction=${()=>alert('Truc')}/>
              <${MenuItem} name="OPOPO"/>
            </${MenuItem}>
          </${MenuItem}>

          <${MenuItem} name='Show'> 
            <${MenuItem} name="By List" />
            <${MenuItem} name="By Grid" />
          </${MenuItem}>

          <${MenuItem} name='help'>
            <${MenuItem} name="By List" />
            <${MenuSearch} />
          </${MenuItem}>

        </${DropDownMenu}>
        <br/>
        "test un trc"
      </${ControlBox}>
      <//>
      `;

render(html`<${App}/>`, document.getElementById('app'));

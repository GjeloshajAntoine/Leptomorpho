import React, { createElement, Component, useState, useMemo,useRef, useEffect } from "https://cdn.skypack.dev/react";
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

// const html = htm.bind((type,props,...children)=>{/*console.log(type);*/return createElement(type,props,...children)});
const html = htm.bind(createElement);

const TheHTML = createGlobalStyle`
  html,body {
    overscroll-behavior-y: none;
    position: fixed;
    overflow: hidden;
    width: 100vw;
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
  overflow: hidden;
  position: fixed;
  z-index: 1;
  top:${({ top }) => top}px;
  left:${({ left }) => left}px;
  visibility: ${({ visibility }) => visibility ? visibility : 'hidden'};
`


const FloatingTo = ({ children, to, toComponent, direction }) => {
  const [props, setProps] = useState({ visibility: 'hidden' })
  const { innerWidth, innerHeight } = useWindowSize()
  
  // useEffect(() => {
  //   if (!toComponent.getBoundingClientRect) return;
  //   if(!to.getBoundingClientRect) return;

  //   const { top, bottom, left, right } = to.getBoundingClientRect();
  //   if (direction === 'vertical') {
  //     setProps({ top: bottom, left, visibility: 'visible' })
  //   } else {
  //     setProps({ top, left: right, visibility: 'visible' })
  //   } 
  // }, [children, to, innerWidth, innerHeight])

  // useEffect(async ()=>{
  //   if(!toComponent?.then) return;
  //   if(!'then' in to) return;

  //   const ref = await to;
  //   const { top, bottom, left, right } = ref.getBoundingClientRect();
  //     if (direction === 'vertical') {
  //       setProps({ top: bottom, left, visibility: 'visible' })
  //     } else {
  //       setProps({ top, left: right, visibility: 'visible' })
  //     }
  // }, [children, to, innerWidth, innerHeight])

  useEffect(()=> {
    const oldRef = toComponent.props.ref;
    toComponent.props.ref = node=> {
      if(!node) return;
      console.log('called ref',node);
      // oldRef?.props.ref?.(node);
      const { top, bottom, left, right } = node.getBoundingClientRect();
      console.log('coord',top, bottom, left, right);
      console.log('ch',children);
      if (direction === 'vertical') {
        setProps({ top: bottom, left, visibility: 'visible' })
      } else {
        setProps({ top, left: right, visibility: 'visible' })
      }
    }
  }, [children, to, innerWidth, innerHeight])
 
  return React.cloneElement(children, props)
}


const insertCallback = (inserted, origin, elem, instertedFirst = true, ...args) => (evt) => {
  if (instertedFirst) {
    inserted?.(evt, elem, ...args);
    return origin?.(evt, elem, ...args);
  } else {
    origin?.(evt, elem)
    insterted?.(evt, elem)
  }

}
const CloneSertCb = (elem, cbProp, ...args) => {
  const propsInterCB = Object.fromEntries(Object.entries(cbProp).filter(([key,cb])=>typeof cb === "function" && key.startsWith('on')).map(([key, cb]) => [key, insertCallback(cb, elem.props?.[key], elem, true, ...args)]))
  return React.cloneElement(elem, { ...elem.props,...cbProp, ...propsInterCB }, elem.props.children)
}

const DropDownMenu = ({ children, className, direction = 'horizontal', openHeaderItemOn = 'click', triggerItemOn = 'MouseUp', search, zIndex }) => {
  const [openHeader, setOpenHeader] = useState([])//[{openBy:Element,openItems:{_react}]
  const [mouseIsOn, setmouseIsOn] = useState(false);
  const dropDownRef = useRef(null)
  useOnclickOutside(() => {
    setOpenHeader([]) 
  },{refs:[dropDownRef]});

  useMemo(()=> { 
    hotkeys.unbind(); 
    const extractPropsChildrenAllLevel = Array.from(children).map(function Fla({props:{children,shortCut,onAction}={}}){return [children ? Array.from(children).map(child=>Fla(child)): [{onAction,shortCut}]]}).flat(Infinity).filter(u=>!!u.shortCut)
    extractPropsChildrenAllLevel.map(({shortCut,onAction})=>hotkeys(shortCut,onAction))
  },[children])

  const onHeaderItemClick = ({ target, type = '', }, Item) => {
    if(type.startsWith('mouse') && !!('ontouchstart' in window)) return // filter out mouse event in touch context
    openHeader[0]?.openBy === target && !mouseIsOn ?
     setOpenHeader([]) : setOpenHeader([{ openBy: target, openings: Item.props.children,Item }]);
    setmouseIsOn(true)

  }

  const onMouseUpItem = ({ target }, Item) => {
    const { props: { children } } = Item
    children ? setOpenHeader([...openHeader, { openBy: target, openings: children, Item}]) : setOpenHeader([])
    setmouseIsOn(false)
  }

  const onHoverItem = ({ target,type,touches,touches:[{clientX,clientY}={}]=[] }, Item, idx) => {
    console.log('onHoverItem',type);
    if (!openHeader.length && !mouseIsOn) return;
    if (touches) {
      const newTarget = document.elementFromPoint(clientX,clientY);
      return newTarget.dispatchEvent(new Event('mouseover',{bubbles: true,}))
    }

    const { props: { children } } = Item
    children ? setOpenHeader([...openHeader.slice(0, idx + 1), { openBy: target, openings: children,Item }]) : null
  }

  function displayPathOfIndexes(indexes=[]) {
    const openHeaderState= indexes.reduce((acc,index,idx,here)=>{
      const Item =  !!idx? Array.from(acc[idx-1].Item.props.children)[index]: Array.from(children)[index];
      const previousRef = Item.props.ref
      const refOfOpenerItem = new Promise(resolve=>
        Item.props.ref = node =>{if(node) resolve(node); previousRef?.(node)}
      )
      return [...acc,{openBy:refOfOpenerItem,openings:Item.props.children,Item}];
      
    },[])
    return openHeaderState;
  }


  useEffect(()=>  setOpenHeader(displayPathOfIndexes([1,5,0,2])),[children])

  return html`
    <${StyledDopDownMenu} className=${className} ref=${dropDownRef} direction=${direction} >
      ${children?.map(HeaderItem => React.cloneElement(HeaderItem, {
                                                                ...HeaderItem.props,
                                                                // onTouchStart: (e)=>onHeaderItemClick(e,HeaderItem),
                                                                // onMouseDown:  (e)=>onHeaderItemClick(e,HeaderItem),
                                                                onClick:(e)=> onHeaderItemClick(e,HeaderItem),
                                                                onTouchEnd: () => setmouseIsOn(false),
                                                                onMouseUp: !('ontouchstart' in window)? () => setmouseIsOn(false):null, 
                                                                onMouseOver:(e)=>onHoverItem(e,HeaderItem),
                                                                onTouchMove:(e)=>onHoverItem(e,HeaderItem),
                                                                isTopLevel:true,
                                                                isOpen:HeaderItem.props.children === openHeader?.[0]?.openings,
                                                             
  },HeaderItem.props.children))}

      ${openHeader.length ? openHeader.map(({ openBy, openings, Item }, idx) =>
    html`
        <${FloatingTo} key=${idx} to=${openBy} toComponent=${Item} direction=${!idx && direction == 'horizontal' ? 'vertical' : 'horizontal'}>
          <${StyledPanel} shift=${idx} style=${{ zIndex }} onDetach=${()=>{}} }>
            ${React.Children.toArray(openings).map((openItems,oIdx) => React.cloneElement(openItems, { 
                                                                                                        ...openItems.props,
                                                                                                        onMouseUp: (e)=>onMouseUpItem(e,openItems,idx), 
                                                                                                        onMouseOver: (e)=>onHoverItem(e,openItems,idx),
                                                                                                        onTouchMove:(e)=>onHoverItem(e,openItems,idx), 
                                                                                                        onTouchEnd: (e)=>onMouseUpItem(e,openItems,idx),
                                                                                                        key:oIdx,
                                                                                                        // ref: node =>{console.log('lol',node,openItems.props.ref);openItems.props.ref?.(node)},
                                                                                                         },openItems.props.children))}
          </${StyledPanel}>
        </${FloatingTo}>
        `)
      : null}
    </${StyledDopDownMenu}>
  `
}


const StyledItem = styled.div`
  font-size: 12px;
  font-family:'-apple-system';
  display: flex;
  width: 100;
  cursor: default;
  user-select: none;
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

const MenuItem = React.forwardRef(({ name, className, children, isTopLevel,key,shortCut, ...restProps },ref) => {

  return html`
              <${StyledItem} 
                className=${className}
                direction=${isTopLevel ? 'horizontal' : 'vertical'}
                ref=${ref}
                key=${key}
                ...${restProps}
                isTopLevel=${isTopLevel}
              >
                  ${name ?? null}
                  ${shortCut ? html`<span>${shortCut.replaceAll('+',' ')}</span>` :null}
                  ${!isTopLevel && children ? html`<${ArrowDropRight} size='12' />`:null}
              </${StyledItem}>
              `
})
MenuItem.displayName = 'MenuItem'

function MenuSearch() {
  return html`<input style=${{width:'80%'}} type="text"/>`
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
            <${MenuItem} name="Undo" onAction=${(a)=>console.log('shortcut',a)} shortCut=${'ctrl+z'}/>
            <${MenuItem} name="Redo" />
            <${MenuItem} name="Copy" />
            <${MenuItem} name="Past" />
            <${MenuItem} name="Truc" shortCut="ctrl+truc" />
            <${MenuItem} name="Sub menu" ref=${(node)=>console.log('1st node',node)}> 
              <${MenuItem} name="Sub item A">
                <${MenuItem} name="Copy" />
                <${MenuItem} name="Past" />
                <${MenuItem} name="mais encore">
                  <${MenuItem} name="Past" />
                  <${MenuItem} name="Copy" />
                </>
              </${MenuItem}>
              <${MenuItem} name="Sub item B"/>
            </${MenuItem}>
            <${MenuItem} name="Sub Next"> 
              <${MenuItem} name="TRUC"/>
              <${MenuItem} name="OPOPO"/>
            </${MenuItem}>
          </${MenuItem}>

          <${MenuItem} name='Show'> 
            <${MenuItem} name="By List" />
            <${MenuItem} name="By Grid" />
          </${MenuItem}>
          <${MenuItem} name="help">
            <${MenuSearch} />
          </${MenuItem}>
        </${DropDownMenu}>
        <br/>
        "test un trc"
      </${ControlBox}>
      <//>
      `;

render(html`<${App}/>`, document.body);

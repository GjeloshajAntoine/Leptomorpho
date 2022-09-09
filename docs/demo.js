import React, { createElement, Component, useState, useMemo,useRef, useEffect, useCallback } from "https://cdn.skypack.dev/react?min";
import { render } from "https://cdn.skypack.dev/react-dom?min";
import htm from "https://cdn.skypack.dev/htm?min";
import styled, { createGlobalStyle } from "https://cdn.skypack.dev/styled-components?min";
import { ShareApple } from "https://cdn.skypack.dev/@styled-icons/evil?min"
import { ArrowDropRight } from "https://cdn.skypack.dev/@styled-icons/remix-fill/ArrowDropRight?min"
import color from 'https://cdn.skypack.dev/color';
import useToggle from "https://cdn.skypack.dev/@react-hook/toggle"
import useWindowSize from 'https://cdn.skypack.dev/@rehooks/window-size';
import useOnclickOutside from 'https://cdn.skypack.dev/react-cool-onclickoutside?min';
import hotkeys from 'https://cdn.skypack.dev/hotkeys-js?min';


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

const FloatTo = ({children, direction}) => {
  const [props, setProps] = useState({ visibility: 'hidden' })
  const [ref, setRef] = useState(null)
  const ClonedTo = React.cloneElement(children[0],{ref: (node => {children[0].props.ref?.(node);setRef(node)})},children[0].props.children)
  const CloneFloating = children[1]? React.cloneElement(children[1],{...props,...children[1].props}, children[1].props.children) : null
 console.log('CloneFloating',CloneFloating);
  useEffect(()=> {
    if (!ref) return
    const { top, bottom, height, left, right, width} = ref.getBoundingClientRect()
    if (direction==="horizontal") {
      setProps({visibility: 'visible', x:left,y:top})
    } else if (direction === "vertical") {
      setProps({visibility: 'visible', x:right,y:bottom})

    }
    
  },[ref])

  return html`
    ${ClonedTo}
    ${CloneFloating}
  `

}

const StyledDopDownMenuPanel = styled.div`
  display: flex;
  flex-direction :${directionToFlex};
  gap : 3px;
  background-color: white;
  z-index: 1;
  ${({x,y}) => x === null || y === null ? '' :'position:fixed;' };
  top:${({ y }) => y}px;
  left:${({ x }) => x}px;
  visibility: ${({ visibility }) => visibility };
  width: auto;
  ${({isTopLevel})=>isTopLevel? `
    background-color: #eae7e3;
    width: fit-content; 
  `:`
    width: auto;
    background-color: white;
    font-weight:bold;
    justify-content: space-between;
    filter: invert(1);
  `};
`

const DropDownMenu = ({children, direction = 'vertical', multiOpen = false, subSetmouseIsOn, x= null,y=null }) => { //Menu And Panel combined, nestable
  const [mouseIsOn, setmouseIsOn] = useState(false);
  const [openItem, setOpenItem] = useState([]); // Array because you can optionaly open many menu item of the same level : props.multiOpen
  const [flashPath, setFlashPath] = useState([])
  const dropDownRef = useRef(null)
  const isTopLevel = x === null && y === null // Is Top level DropDownMenu if not depedent of higher DropDownMenu (related position) or binded callback
  console.log('top children',children);
  useOnclickOutside(() => {
    setOpenItem([]) 
  },{disabled: !openItem.length ,refs:[dropDownRef]});

  const onHeaderItemClick = (e, Item,idx) => {
    e.preventDefault()
    e.stopPropagation()

    openItem.includes(idx) && !mouseIsOn ? setOpenItem([]) : setOpenItem([idx])
    setmouseIsOn(true)
  }

  const onMouseUpItem = (e, Item, idx,) => {
    e.stopPropagation();
    e.preventDefault();

    const { props: { children } } = Item
    children ? setOpenItem([idx]) : setOpenItem([])
    setmouseIsOn(false)
    Item.props.onAction?.();
  }

  const addCallbacktoChildren = (childs) => {
    return React.Children.toArray(childs).map((c,idx)=> {
      const ClonedItem =  React.cloneElement(c,{
        onMouseDown :isTopLevel && !('ontouchstart' in window) ? e => onHeaderItemClick(e,c,idx) : e=> e.stopPropagation(),
        onTouchStart: isTopLevel ? e => onHeaderItemClick(e,c,idx,currentPath, openPath) : null,
        onMouseUp: !isTopLevel ? e=> onMouseUpItem(e,c,idx) : ()=> setmouseIsOn(false),
        isTopLevel,
        isOpen: openItem.includes(idx),
        hasSubMenu : !!c.props?.children?.length,
      },c.props.children);
      //  <!--x,y position <will be filled by floatTo component upon cloning -->
      return html`
        <${FloatTo} direction=${direction}>
          ${ClonedItem}
          ${!!c.props.children && openItem.includes(idx) ?
             html`<${DropDownMenu} direction="vertical" subSetmouseIsOn=${setmouseIsOn}>
                    ${c.props.children} 
                  </${DropDownMenu}>`
             : null}
        </${FloatTo}>
     `

    })
  }

  const ChildWithCallback = addCallbacktoChildren(children)

  return html`
    <${StyledDopDownMenuPanel} direction=${direction} isTopLevel=${isTopLevel} visibility=${isTopLevel} x=${x} y=${y}>
      ${ChildWithCallback}
    </${StyledDopDownMenuPanel}>
  `

  const OpenTree = html`<${DropDownMenu} />`; 
}



const StyledMenuItem = styled.div`
  font-size: 12px;
  font-family:'-apple-system';
  display: flex;
  width: 100;
  user-select: none;
  position: relative;
  white-space: nowrap;

`

const MenuItem = React.forwardRef(({name,hasSubMenu,isTopLevel,shortCut, ...props},reref)=>{

  return html`
    <${StyledMenuItem} ref=${reref} ...${props}>
      ${name}
      ${shortCut ? html`<span>${shortCut.replaceAll('+',' ')}</span>` :null}
      ${!isTopLevel && hasSubMenu ? html`<${ArrowDropRight} size='12' />`:null}

    </${StyledMenuItem}>
  `

})

const StyledPanel = styled.div`
  position:absolute;
  background-color: white;
  z-index: 1;
  top:${({ top }) => top}px;
  left:${({ left }) => left}px;
  visibility: ${({ visibility }) => visibility ? 'visible' : 'hidden'};
  width: auto;
`

StyledPanel.displayName = "StyledPanel"

const GlobalMenu = ({ children, className, direction = 'horizontal', openHeaderItemOn = 'click', triggerItemOn = 'MouseUp', search, zIndex }) => {
  const [mouseIsOn, setmouseIsOn] = useState(false);
  const [openPath, setOpenPath] = useState([])
  const [flashPath, setFlashPath] = useState([])
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


  useEffect(()=>{
    if (openPath.length) {
      window.addEventListener('keydown',onKeydown)
      return () => window.removeEventListener('keydown',onKeydown)
    }
  },[openPath])


  function AddCallBackToItems(children,[pathidx,...restPath],currentPath=[]) {

    const childrenWithCb = children.map((c,idx)=>React.cloneElement(c,{
      idx,
      onMouseOver: !!openPath.length ? e=> onMouseOver(e,c,idx,currentPath) : null,
      onMouseDown : !currentPath.length && !('ontouchstart' in window) ? e => onHeaderItemClick(e,c,idx,currentPath) :null,
      onTouchStart: !currentPath.length ? e => onHeaderItemClick(e,c,idx,currentPath, openPath) : null,
      onMouseUp: !!currentPath.length ? e=> onMouseUpItem(e,c,idx,currentPath) : ()=> setmouseIsOn(false),
      onTouchMove: e => onTouchMoveItem(e,c,idx,currentPath),
      onTouchEnd: e => onTouchEndItem(e,c),
      isOpen:idx === pathidx,
      isTopLevel: currentPath.length === 0,
      ...c.props,
    },idx === pathidx ? AddCallBackToItems(React.Children.toArray(c.props.children),restPath,[...currentPath,pathidx]) : c.props.children))
    return childrenWithCb;
  }

  const ChildrenWithCallback = AddCallBackToItems(React.Children.toArray(children),openPath);

  const onKeydown = (e) => {
    console.log('Key down', e.key);
    const UpperChildren = children
    console.log('UpperChildren',UpperChildren);
    function loopChildren(childs, [pathidx,...restPath]) {
      if (!restPath.length) {
        return childs[pathidx].props.children
      }
      return loopChildren(childs[pathidx].props.children,restPath)
    }

    if (e.key === "ArrowDown") {
      if (openPath.length === 1 && direction === 'horizontal') {
        setOpenPath([...openPath,0])
      }
      if (openPath.length > 1) {
        const slicedOpenPath = openPath.slice(0,openPath.length - 1)
        const lastPath  = openPath.pop();
        const currentChildren = loopChildren(children,slicedOpenPath)
        currentChildren.length - 1 > lastPath ? setOpenPath([...slicedOpenPath,lastPath + 1]) : setOpenPath([...slicedOpenPath,0])

      }
    }
    if (e.key === "ArrowUp" && openPath.length > 1) {
      const slicedOpenPath = openPath.slice(0,openPath.length - 1)
      const lastPath  = openPath.pop();
      const currentChildren = loopChildren(children,slicedOpenPath)
      if (currentChildren.length) {
        lastPath === 0 ? setOpenPath([...slicedOpenPath, currentChildren.length - 1]) : setOpenPath([...slicedOpenPath, lastPath - 1])
        
      }
    }
    if (e.key === "ArrowLeft") {
      if (openPath.length === 1 && direction === 'horizontal') {
        0 === openPath[0] ? setOpenPath([children.length - 1]) : setOpenPath([openPath[0] - 1])
      }
      if (openPath.length > 1) {
        setOpenPath(openPath.slice(0,openPath.length - 1))
        // 0 === openPath[0] ? setOpenPath([children.length - 1]) : setOpenPath([openPath[0] - 1])
        setOpenPath([...openPath.slice(0,openPath.length - 1)])

      }
    }   
    if (e.key === "ArrowRight") {
      if (openPath.length === 1 && direction === 'horizontal') {
        children.length - 1 === openPath[0] ? setOpenPath([0]) : setOpenPath([openPath[0] + 1])
      }
      if(openPath.length > 1) {
        const currentChildren = loopChildren(children,openPath);
        if (currentChildren) setOpenPath([...openPath,0])
        
      }
    }
    if (e.key === "Enter") {
      const currentChildren = loopChildren(ChildrenWithCallback, openPath.length > 1 ? openPath.slice(0,openPath.length - 1) : openPath);
      const currentItem = currentChildren[openPath.pop()]
      currentItem.props.onMouseUp?.(e)
    }
  }



  return html`
    <p>openPath : ${openPath.toString()}</p>
    <${StyledDopDownMenu} className=${className} ref=${dropDownRef} direction=${direction}>
      ${ChildrenWithCallback}
    </${StyledDopDownMenu}>
  
  `
}


const StyledItem = styled.div`
  font-size: 12px;
  font-family:'-apple-system';
  display: flex;
  width: 100;
  /* cursor: default; */
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
  ${({isFlashed})=>isFlashed? `
    &::before {
      position: absolute;
      content: "";
      width: 15px;
      height: 15px;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      backdrop-filter: invert(1);
    }
    &::after {
      position: absolute;
      right: 0;
      content: "";
      width: 15px;
      height: 15px;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      backdrop-filter: invert(1);
    }
  ` : null};
  gap : 12px;
  gap: 18px;
  &.active {
    background-color: pink;
  }
`

StyledItem.displayName = 'StyledItem'

const MenuItemOld = React.forwardRef(({ name, body, className, children, isTopLevel,key,shortCut,isOpen, ...restProps },refBefore) => {
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
                  ${body ? React.cloneElement(body,{...body.props},body.props.children) : null}
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

function MenuSearch({searchTerm, setSearchTerm, searchItem, setFlashPath}) {
  const [value, setValue] = useState('')
  const Inputsearch =  html`
   <input style=${{width:'80%',minWidth:'100px'}} onKeyDown=${e=>e.stopPropagation()} onChange=${({target})=>setValue(target.value)} value=${value} type="text" autofocus/>
  `
  return html`
  <${MenuItem} body=${Inputsearch} onMouseOver=${e=> e.stopPropagation()} onMouseDown=${e=> e.stopPropagation()} onMouseUp=${e=> e.stopPropagation()}>
  </${MenuItem}>
  <${MenuItem} name="Search Item" onAction=${(a)=>console.log('Search Item',a)} shortCut=${'alt+1'}/>
  `
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
            </${MenuItem}>

        </${DropDownMenu}>
        <br/>
        "test un trc"
      </${ControlBox}>
      <//>
      `;

render(html`<${App}/>`, document.getElementById('app'));

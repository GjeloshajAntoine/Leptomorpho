import React, { createElement, useEffect, useMemo, useRef, useState } from "https://cdn.skypack.dev/react";
import { render } from "https://cdn.skypack.dev/react-dom";
import htm from "https://cdn.skypack.dev/htm";
import styled, { createGlobalStyle, css } from "https://cdn.skypack.dev/styled-components@5.0";

import { ShareApple } from "https://cdn.skypack.dev/@styled-icons/evil";
import { ArrowDropRight } from "https://cdn.skypack.dev/@styled-icons/remix-fill/ArrowDropRight";
import hotkeys from 'https://cdn.skypack.dev/hotkeys-js';
import useOnclickOutside from 'https://cdn.skypack.dev/react-cool-onclickoutside';
// import useToggle from "https://cdn.skypack.dev/@react-hook/toggle"

import { ChevronUpDown } from "https://cdn.skypack.dev/@styled-icons/fluentui-system-filled/ChevronUpDown";

// mobileConsole.show()

// const html = htm.bind((type,props,...children)=>{/*console.log(type);*/return createElement(type,props,...children)});
const html = htm.bind(createElement);

const clearWarmBeige = css`background: linear-gradient(44.8deg, hsl(13deg 100% 97%) -53.1%, hsl(43deg 100% 95%) 49%);`
const NeonPinkGradient = css` background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);` 
const HighlightNeonPinkGradient = css`filter: hue-rotate(144deg)`;

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
  height: 55vh;
  margin: 0 auto;
  /* margin-top: 15vh; */
  padding: 5px;
`;

const buttonColor = 'rgb(255 246 219)';

const StyledButton = styled.button`
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;

  border: 1px solid rgba(243,223,207,1);
  border: 1px solid rgb(255 255 255);
  outline: 1px solid ${buttonColor};
  background: linear-gradient(to top, ${buttonColor} 0%,rgba(255,255,255,1) 28%);

  border-radius: 5px;
  transition: all 0.1s;
  padding: 3px;
  font-size: 12px;
  min-width: 25px;
  min-height: 20px; 

  padding: 3px 13px;
    font-size: 11px;
    border: 1px solid rgb(0 0 0);
    outline: rgb(0 0 0) solid 1px;
    background: linear-gradient(to top, rgb(51 19 0) 80%, rgb(255, 255, 255) 20%);
    color: white;
    font-family: system-ui;
    padding: 1px 13px;
    font-size: 11px;

  /* background: linear-gradient(0deg, rgba(243,223,207,1) 0%, rgba(238,227,218,1) 12%, rgba(255,255,255,1) 100%); */
  /* filter: brightness(1.09) saturate(2); */
  &:active {
    /* filter: sepia(0.2); */
    /* filter: none; */
    /* background: linear-gradient(180deg, rgba(243,223,207,1) 0%, rgba(238,227,218,1) 12%, rgba(255,255,255,1) 100%); */
    background: linear-gradient(to bottom, rgb(255 246 219) 0%,rgba(255,255,255,1) 28%);
    background: linear-gradient(to bottom, ${buttonColor} 95%, rgba(255,255,255,1) 0%);
    background: linear-gradient(to bottom, rgb(34 34 34) 83%, rgb(255, 255, 255) 14%);
    outline: rgb(0, 0, 0) solid 1px;
    border: rgb(104 104 104) solid 1px;
  }

  &::before {
    content: "";
    display: block;
    width: 24px;
    min-height: 26px;
    border-top: 4px solid red;
    border-radius: 16px;
    transform: rotateZ(333deg);
    position: absolute;
    bottom: 0;
    left: 0;
  }

  &::after{
    content: '';
    display: block;
    width: 24px;
    min-height: 26px;
    border-top: 4px solid red;
    border-radius: 16px;
    transform: rotateZ(333deg);
    position: absolute;
    bottom: 0;
    right: 0;
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


  useEffect(()=> {
    if (!ref) return
    const { top, bottom, height, left, right, width} = ref.getBoundingClientRect()

    if (direction==="horizontal") {
      setProps({visibility: 'visible',top:bottom, left,})
    } else if (direction === "vertical") {
      setProps({visibility: 'visible', top, left: right, bottom: null })

    }
    
  },[ref,children])

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
  ${({top,left}) => left === null ? '' :'position:fixed' };
  top:${({ top }) => top}px;
  left:${({ left }) => left}px;
  bottom:${({bottom})=>bottom}px;
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
  `};
`

const DropDownMenu = React.forwardRef(({children, direction = 'vertical', isTopLevel=true,multiOpen = false, focusFromUpper= false,allTopChildren=[],subSetmouseIsOn= false, top= null,left=null,bottom=null,UppercloseAll=null,UpperRef=null },forRef) => { //Menu And Panel combined, nestable
  const [ mouseIsOn, setmouseIsOn] = useState(subSetmouseIsOn);
  const [openItem, setOpenItem] = useState([]); // Array because you can optionaly open many menu item of the same level : props.multiOpen
  const [flashPath, setFlashPath] = useState([])
  const dropDownRef = useRef(null)
  const deepRef = useRef(null)
  const [hasFocus, setHasFocus] = useState(isTopLevel || focusFromUpper)

  const closeAll = ()=> {
    setOpenItem([])
    UppercloseAll?.()
  }

    useEffect(function InitFocusTopLevel(){
    isTopLevel && !!openItem.length? dropDownRef.current.focus():null
  },[isTopLevel,!!openItem.length])

  if (isTopLevel) {
    useOnclickOutside(() => {
      setOpenItem([]) 
    },{disabled: !openItem.length ,refs:[dropDownRef]});
  }


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

    children ? setOpenItem([idx]) : closeAll()
    setmouseIsOn(false)
    Item.props.onAction?.();
  }

  function onMouseOver(e,c,idx) {
    e.stopPropagation()
    e.preventDefault()

    setOpenItem([idx])
  }

  const onTouchMoveItem = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const { touches,touches:[{clientX,clientY}={}]=[] } = e;

    if (!openItem .length && !mouseIsOn) return;
    if (touches) {
      const newTarget = document.elementFromPoint(clientX,clientY);
      newTarget.dispatchEvent(new Event('mouseover',{bubbles: true,}))
    }
  }
  
  const onTouchEndItem = (e) => {
    const { target, touches,changedTouches:[{clientX,clientY}={}]=[] } = e;
    e.preventDefault();

    const newTarget = document.elementFromPoint(clientX,clientY);
    if (touches && newTarget !== target) {
      newTarget.dispatchEvent(new Event('mouseup',{bubbles: true,}))
    }
  }



  const nextIdx = (arr,idx) => arr.length -1 === idx ? 0 : idx +1
  const prevIdx = (arr,idx) => idx === 0 ? arr.length -1 : idx - 1;

  const onKeyDown = (e) => {
    console.log('childrenchildren',children.length);
    e.stopPropagation()
      if (direction === "horizontal") {
        if (e.key === "ArrowLeft" ) {
          setOpenItem([prevIdx(children,openItem[0])])
        }
        if (e.key === "ArrowRight") {
          setOpenItem([nextIdx(children,openItem[0])])
        }
        if (e.key === "ArrowDown") {
          deepRef.current.focus()
          dropDownRef.current.blur()
        }
      }
      if (direction === "vertical") {
        if (e.key === "ArrowUp" ) {
          setOpenItem([prevIdx(children,openItem[0])])
        }
        if (e.key === "ArrowDown") {
          setOpenItem([nextIdx(children,openItem[0])])
        }
        if (e.key === "ArrowRight") {
          const itemHasChildren = !!children[openItem[0]].props.children
          if (itemHasChildren) {
            dropDownRef.current.blur()
            deepRef.current.focus()
          } else {
            !isTopLevel? UpperRef.current.focus() : null
          }
        }
        if (e.key  === "ArrowLeft") {
          !isTopLevel? UpperRef.current.focus(): null;
        }
      }
      if (e.key === "Enter") {
        onMouseUpItem(e,children[openItem[0]],openItem[0])
      }
  }

  const addCallbacktoChildren = (childs) => {
    return React.Children.toArray(childs).map((c,idx)=> {
      const ClonedItem =  React.cloneElement(c,{
        onMouseDown :isTopLevel && !('ontouchstart' in window ) ? e => onHeaderItemClick(e,c,idx) : e=> e.stopPropagation(),
        onTouchStart: isTopLevel ? e => onHeaderItemClick(e,c,idx) : null,
        onMouseUp: !isTopLevel ? e=> onMouseUpItem(e,c,idx) : ()=> setmouseIsOn(false),
        onMouseOver: isTopLevel && !openItem.length?  null : e=> onMouseOver(e,c,idx),
        onTouchMove: e => onTouchMoveItem(e,c,idx),
        onTouchEnd: e => onTouchEndItem(e,c),
        isTopLevel,
        isOpen: openItem.includes(idx),
        hasSubMenu : !!c.props?.children?.length, 
        ...c.props, 
      },c.props.children);

      const DropDownMenuHtml = !!c.props.children && openItem.includes(idx) ?
      html`<${DropDownMenu} 
                 direction="vertical" 
                 isTopLevel=${false} 
                 focusFromUpper=${openItem.length === 1 && !hasFocus} 
                 subSetmouseIsOn=${setmouseIsOn} 
                 ref=${deepRef}
                 UpperRef=${dropDownRef}
                 UppercloseAll=${closeAll} 
                 UpperSetHasFocus=${setHasFocus}>
             ${c.props.children} 
           </${DropDownMenu}>`
      : null;
      //  <!--x,y position <will be filled by floatTo component upon cloning -->
      const customDropDownMenu = c.props.children?.props?.isExtension
      const ExtendDropDown = !!customDropDownMenu && !!c.props.children && openItem.includes(idx) ? React.cloneElement(c.props.children,{
        direction:"vertical", 
        isTopLevel:false ,
        focusFromUpper:openItem.length === 1 && !hasFocus,
        subSetmouseIsOn:setmouseIsOn, 
        ref:deepRef,
        allTopChildren:isTopLevel ? children : allTopChildren,
        UpperRef:dropDownRef,
        UppercloseAll:closeAll, 
        UpperSetHasFocus:setHasFocus,

      },c.props.children.props.children) : null

      return html`
        <${FloatTo} direction=${direction}>
          ${ClonedItem}
          ${!!c.props.children && openItem.includes(idx) ? ExtendDropDown ? ExtendDropDown : DropDownMenuHtml : null}
        </${FloatTo}>
     `

    })
  }

  const ChildWithCallback = addCallbacktoChildren(children)

  return html`
    <${StyledDopDownMenuPanel} 
          direction=${direction} 
          ref=${(node) => {
          dropDownRef.current = node;
            if (typeof forRef === 'function') {
              forRef(node);
            } else if (forRef) {
              forRef.current = node;
            }
          }}
          isTopLevel=${isTopLevel} 
          visibility=${isTopLevel} 
          top=${top} 
          left=${left} 
          bottom=${bottom}
          onKeyDown=${onKeyDown}
          onFocus=${e=>{e.stopPropagation();!openItem.length? setOpenItem([0]):null}}
          tabIndex="0"
          >
      ${ChildWithCallback}
    </${StyledDopDownMenuPanel}>
  `

})



const StyledMenuItem = styled.div`
  font-size: 13px;
  font-family:'-apple-system';
  display: flex;
  width: 100;
  user-select: none;
  position: relative;
  white-space: nowrap;
  background-color: inherit;
  filter: ${({isOpen})=> isOpen ? 'invert(1)': null};
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


const SearchMenu = React.forwardRef(({allTopChildren = [], ...props},forwardedRef)=> {
  const [searchTerm, setSearchTerm] = useState('')

  const extractPropsChildrenAllLevel = Array.from(allTopChildren)
  .map(function Fla(Item,idx,array,path=[]){
    const {props:{children}} = Item
    return [children ? Array.from(children).map((child,idx_)=>Fla(child,idx_,array,[...path,idx])): [{Item,path:[...path,idx]}]]}
    )
    .flat(Infinity)
    .filter(({Item:{props:{name}}})=>name.toUpperCase().includes(searchTerm.toUpperCase()))
    .map(({Item})=>Item)

  extractPropsChildrenAllLevel.unshift(html`
      <input style=${{width:'96%',minWidth:'100px',margin:'0 auto',borderRadius:'5px'}} onmousedown=${e=>e} onMouseUp=${e=>e} onTouchEnd=${e=>e} NoOnKeyDown=${e=>e.stopPropagation()} onChange=${({target})=>setSearchTerm(target.value)} value=${searchTerm} type="text" autofocus/>
    `)


  return html`
    <${DropDownMenu} ...${props} ref=${forwardedRef} >
      ${extractPropsChildrenAllLevel}
    </${DropDownMenu}>
  `
})




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

const StyledCenteredSelect = styled.div`
  display: inline-block;
  position: relative;
  border: 1px solid gray;
  background-color:white;
  padding-left: 1%;
  user-select: none;
`

const StyledListSelect = styled.div`
  display: block;
  position: absolute;
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  background-color: white;
  visibility:${({visibility})=>visibility ? 'visible': 'hidden'};
  top: ${({top=0})=> top}px;
  text-align:center;
  /* outline: 1px solid white; */
  width: calc(100% + 1px);
  * {
    padding: 0;
    user-select: none;
    padding-right: 16%;
  }
  *:hover {
    filter: invert(1);
    background-color: inherit;
  }
`
const StyledChevronUpDown = styled(ChevronUpDown)`
  width: 12px;
  margin-left: 5px;
  vertical-align: -1px !important;
  border-radius: 6px;
  padding: 1px;
  background: linear-gradient(0deg, rgba(0,255,220,1) 0%, rgba(255,255,0,1) 100%);
  border: 1px solid #80808078;
  vertical-align: -3px !important;

 `

function CenteredSelect({children}) {
  const centeredSelectRef = useRef(null)
  const [ref, setRef] = useState(null);
  const [refList, setRefList] = useState(null);
  const [isOpen, toggleIsOpen] = useState(false)
  const selectedFromProps  = children?.filter(c=>!!c.props.selected)[0] ?? children[0]
  const [selected, setSelected] = useState(selectedFromProps)


  useOnclickOutside(() => {
      toggleIsOpen(false)
    },{disabled: !isOpen ,refs:[centeredSelectRef]});

  const onSelect = (e, OptionComp) => {
    e.stopPropagation()
    setSelected(OptionComp)
    toggleIsOpen(false)
  }

  const onKeyDown = (e) => {
    console.log('select key',e.code)
    if (e.code === 'Escape') {
      return toggleIsOpen(false);
    }
    if (e.code === 'Enter') {
      return toggleIsOpen(false);
    }
    if (e.code === 'ArrowUp') {
      const CurrentIndex = children?.indexOf(selectedFromProps);
      return toggleIsOpen(false);
    }
    if (e.code === 'ArrowDown') {
      return toggleIsOpen(false);
    }
  }

  const listVisibility = isOpen && !!refList?.getBoundingClientRect().height && !!ref?.getBoundingClientRect().height;
  const Δy = ref?.getBoundingClientRect().y - refList?.getBoundingClientRect().y;

  return html`  
    <${StyledCenteredSelect} 
        tabIndex='0' 
        onKeyDown=${onKeyDown} 
        onMouseUp=${e=>{e.stopPropagation();return false}} 
        onTouchStart=${()=>toggleIsOpen(!isOpen)} 
        onMouseDown=${(e)=>{e.target.focus();toggleIsOpen(!isOpen)}}
        ref=${centeredSelectRef}
        >
      ${selected.props.children}
      <${StyledChevronUpDown} />
      ${
        isOpen ? html`
          <${StyledListSelect} ref=${node=>{setRefList(node);return node;}} visibility=${listVisibility} top=${-Δy}>
            ${
              children.map(c => React.cloneElement(c,{
                 ref: c === selected ? node => {children[0].props.ref?.(node);setRef(node)} : null,
                 onClick: e => onSelect(e,c),
                 onMouseDown: e=> onSelect(e,c),
                 onTouchStart:  e=> onSelect(e,c),
                 onMouseUp : c !== selected ?  e=> onSelect(e,c) :null,
                 selected : c === selected,
                ...c.props
              },c.props.children))
            }
          </${StyledListSelect}> 
        `: null
      }
    </${StyledCenteredSelect}>
  `
}

const StyledToolBarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px 0;
  border-radius: 5px;
  background: linear-gradient(to bottom, #000000 1%,#3f3f3f 1%,#3f3f3f 1%,#848484 5%,#161616 23%,#3f3f3f 34%,#161616 44%,#3f3f3f 50%,#7f7f7f 53%,#898989 54%,#2b2b2b 72%,#2b2b2b 72%,#2b2b2b 76%,#161616 77%,#2b2b2b 79%,#2b2b2b 79%);
  background: linear-gradient(to bottom, #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%);
  background: linear-gradient(to bottom, #1c1c1c 9%,#595959 18%,#595959 18%,#2b2b2b 24%,#666666 32%,#666666 32%,#111111 40%,#2c2c2c 47%,#131313 65%,#131313 65%,#000000 86%,#000000 86%,#4c4c4c 100%);
  background: linear-gradient(to bottom, #1c1c1c 9%,#595959 18%,#595959 18%,#2b2b2b 24%,#111111 40%,#2c2c2c 47%,#131313 65%,#131313 65%,#000000 86%,#000000 86%,#4c4c4c 100%);
  background: linear-gradient(to top, #1c1c1c 0%,#595959 2%,#595959 2%,#7f7f7f 18%,#111111 40%,#131313 65%,#131313 65%,#000000 86%,#000000 86%,#4c4c4c 100%);
  background: linear-gradient(to bottom, #595959 0%,#666666 5%,#474747 18%,#2c2c2c 29%,#111111 60%,#1c1c1c 91%,#131313 100%);
  background: linear-gradient(to bottom, #595959 1%,#727272 3%,#474747 6%,#474747 12%,#111111 49%,#000000 92%,#000000 100%);

  
  `

const StyledListAlt = styled.div`
  background-color: #00FF00;
  background: linear-gradient(to bottom, #ff4bbd 0%,#ff3fb9 44%,#ff2bb1 100%);  border-radius: 50%;
  width: 35px;
  min-height: 35px;
  max-height: 35px;
  box-shadow: 0px 1px 8px 1px rgb(0 0 0) inset;

  background: linear-gradient(to bottom, rgb(75 105 255) 0%,rgb(185 168 255) 10%,rgb(128 152 255) 17%,rgb(43 255 235) 100%);
  box-shadow: rgb(247 197 56) 0px 1px 8px 1px inset;

  font-family: 'Dangrek', cursive;
  font-size: 31px;
  line-height: 35px;
  text-align: center;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  `
const StyledIcon = styled.i`
  font-size: 35px;
  background: linear-gradient(to bottom, rgb(75 105 255) 0%,rgb(185 168 255) 10%,rgb(128 152 255) 17%,rgb(43 255 235) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 4px 4px rgb(247 197 56);
`

const GlowTextButton = styled.div`
border-radius: 50%;
    width: 35px;
    min-height: 35px;
    max-height: 35px;
    box-shadow: rgb(133 125 125) 0px 1px 8px 1px inset;
    border: 3px solid #00000066;
    outline: black 1px solid;
    font-family: 'Dangrek', cursive;
    font-size: 29px;
    color: white;
    text-align: center;
    line-height: 38px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background: linear-gradient(rgb(255 75 75) 0%, rgb(255 168 168) 10%, rgb(247 128 255) 17%, rgb(255 43 43) 100%);
    -webkit-background-clip: text;

`

const App = () => html`
      <${React.Fragment}>
      <${TheHTML}/>
      <${ControlBox}>
        <p>Hello World!___</p>
        <${StyledButton}>Click me!</${StyledButton}>
        <!-- <${StyledButton}> <${ShareApple}/> </${StyledButton}> -->
        <br/>
        <br/>
        <${GlowTextButton}>X<//>
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
            <${SearchMenu} isExtension/>
          </${MenuItem}>

        </${DropDownMenu}>
        <br/>
        <br/>

        <${CenteredSelect}>
          <div value="ex 1" >ex1</div>
          <div value="ex 2" >ex2</div>
          <div value="ex 3" selected>ex3</div>
          <div value="ex 4" >ex4</div>
          <div value="ex 5" >ex5</div>
          <div value="ex 6" >ex6</div>
        </${CenteredSelect}>
        <br/>
        <br/>
        <${StyledToolBarContainer}>
          <${StyledListAlt}>W<//>
          <i class="bi bi-textarea-t"></i>
          <${StyledIcon} className="bi bi-disc" />
          <${StyledIcon} className="bi bi-house-door-fill" />
        </${StyledToolBarContainer}>
      </${ControlBox}>
      <//>
      `;

render(html`<${App}/>`, document.getElementById('app'));

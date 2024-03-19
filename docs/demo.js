import { render } from 'preact';
import React, { createElement, useEffect, useMemo, useRef, useState } from 'preact/compat'
// import 'preact/debug'

import htm from "htm";
import styled, { createGlobalStyle, css, ThemeProvider } from "styled-components";
import register from 'preact-custom-element';

import { ShareApple } from "@styled-icons/evil";
import { ArrowDropRight } from "@styled-icons/remix-fill/ArrowDropRight";
// import hotkeys from 'hotkeys-js';
import useOnclickOutside from 'react-cool-onclickoutside';
// import CSSTransitionGroup from 'react-transition-group';
// import { motion, AnimatePresence } from "framer-motion"


import { ChevronUpDown } from "@styled-icons/fluentui-system-filled/ChevronUpDown";
// import { SaveAs } from "@styled-icons/heroicons-solid/SaveAs";
import * as FSF from "@styled-icons/fluentui-system-filled";

import { CSS as dndCSS } from '@dnd-kit/utilities';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDndMonitor,
} from '@dnd-kit/core';
import {
  arrayMove,
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { Resizable } from 'react-resizable';
import "react-resizable/css/styles.css"

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
  padding: 5px;
`;

const buttonColor = 'rgb(255 246 219)';

export const StyledButton = styled.button`
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

  /* background: linear-gradient(0deg, rgba(243,223,207,1) 0%, rgba(238,227,218,1) 12%, rgba(255,255,255,1) 100%); 
  filter: brightness(1.09) saturate(2); */
  &:active {
    /* filter: sepia(0.2); */
    /* filter: none; */
    /* background: linear-gradient(180deg, rgba(243,223,207,1) 0%, rgba(238,227,218,1) 12%, rgba(255,255,255,1) 100%); */
    /* background: linear-gradient(to bottom, rgb(255 246 219) 0%,rgba(255,255,255,1) 28%); */
    /* background: linear-gradient(to bottom, ${buttonColor} 95%, rgba(255,255,255,1) 0%); */
    background: linear-gradient(to bottom, rgb(34 34 34) 83%, rgb(255, 255, 255) 14%);
    outline: rgb(0, 0, 0) solid 1px;
    border: rgb(104 104 104) solid 1px;
  }
`;


export const directionToFlex = ({ direction }) => ({ horizontal: 'row', vertical: 'column' }[direction] ?? 'row')

export const StyledDopDownMenu = styled.div`
  display: flex;
  flex-direction :${directionToFlex};
  gap : 3px;

`

export const FloatTo = ({ children, direction }) => {
  const [props, setProps] = useState({ visibility: 'hidden' })
  const [ref, setRef] = useState(null)
  const ClonedTo = React.cloneElement(children[0], { ref: (node => { children[0].props.ref?.(node); setRef(node) }) }, children[0].props.children)
  const CloneFloating = children[1] ? React.cloneElement(children[1], { ...props, ...children[1].props }, children[1].props.children) : null


  useEffect(() => {
    if (!ref) return
    const { top, bottom, height, left, right, width } = ref.getBoundingClientRect()

    if (direction === "horizontal") {
      setProps({ visibility: 'visible', top: bottom, left, })
    } else if (direction === "vertical") {
      setProps({ visibility: 'visible', top, left: right, bottom: null })

    }

  }, [ref, children])

  return html`
    ${ClonedTo}
    ${CloneFloating}
  `

}

export const StyledDopDownMenuPanel = styled.div`
  display: flex;
  flex-direction :${directionToFlex};
  gap : 3px;
  background-color: white;
  z-index: 1;
  ${({ top, left }) => left === null ? '' : 'position:fixed'};
  top:${({ top }) => top}px;
  left:${({ left }) => left}px;
  bottom:${({ bottom }) => bottom}px;
  visibility: ${({ visibility }) => visibility};
  ${({ isTopLevel }) => isTopLevel ? `
    background-color: #eae7e3;
  `: `
    background-color: white;
    font-weight:bold;
    justify-content: space-between;
  `};
`

export const DropDownMenu = React.forwardRef(({ children,
  direction = 'vertical',
  isTopLevel = true,
  itemJson = {},
  multiOpen = false,
  focusFromUpper = false,
  allTopChildren = [],
  subSetmouseIsOn = false,
  top = null,
  left = null,
  bottom = null,
  UppercloseAll = null,
  UpperRef = null
}, forRef) => { //Menu And Panel combined, nestable
  const [mouseIsOn, setmouseIsOn] = useState(subSetmouseIsOn);
  const [openItem, setOpenItem] = useState([]); // Array because you can optionaly open many menu item of the same level : props.multiOpen
  const [flashPath, setFlashPath] = useState([])
  const dropDownRef = useRef(null)
  const deepRef = useRef(null)
  const [hasFocus, setHasFocus] = useState(isTopLevel || focusFromUpper)

  const closeAll = () => {
    setOpenItem([])
    UppercloseAll?.()
  }

  useEffect(function InitFocusTopLevel() {
    isTopLevel && !!openItem.length ? dropDownRef.current.focus() : null
  }, [isTopLevel, !!openItem.length])

  if (isTopLevel) {
    useOnclickOutside(() => {
      setOpenItem([])
    }, { disabled: !openItem.length, refs: [dropDownRef] });
  }


  const onHeaderItemClick = (e, Item, idx) => {
    e.preventDefault()
    e.stopPropagation()

    openItem.includes(idx) && !mouseIsOn ? setOpenItem([]) : setOpenItem([idx])
    setmouseIsOn(true)
  }

  const onMouseUpItem = (e, Item, idx,) => {
    e.stopPropagation();
    e.preventDefault();
    const { children } = Item

    children ? setOpenItem([idx]) : closeAll()
    setmouseIsOn(false)
    Item.onAction?.();
  }

  function onMouseOver(e, c, idx) {
    e.stopPropagation()
    e.preventDefault()

    setOpenItem([idx])
  }

  const onTouchMoveItem = (e) => {
    e.stopPropagation()
    e.preventDefault()
    const { touches, touches: [{ clientX, clientY } = {}] = [] } = e;

    if (!openItem.length && !mouseIsOn) return;
    if (touches) {
      const newTarget = document.elementFromPoint(clientX, clientY);
      newTarget.dispatchEvent(new Event('mouseover', { bubbles: true, }))
    }
  }

  const onTouchEndItem = (e) => {
    const { target, touches, changedTouches: [{ clientX, clientY } = {}] = [] } = e;
    e.preventDefault();

    const newTarget = document.elementFromPoint(clientX, clientY);
    if (touches && newTarget !== target) {
      newTarget.dispatchEvent(new Event('mouseup', { bubbles: true, }))
    }
  }



  const nextIdx = (arr, idx) => arr.length - 1 === idx ? 0 : idx + 1
  const prevIdx = (arr, idx) => idx === 0 ? arr.length - 1 : idx - 1;

  const onKeyDown = (e) => {
    const children = itemJson;
    console.log('childrenchildren', children.length);
    e.stopPropagation()
    if (direction === "horizontal") {
      if (e.key === "ArrowLeft") {
        setOpenItem([prevIdx(children, openItem[0])])
      }
      if (e.key === "ArrowRight") {
        setOpenItem([nextIdx(children, openItem[0])])
      }
      if (e.key === "ArrowDown") {
        deepRef.current.focus()
        dropDownRef.current.blur()
      }
    }
    if (direction === "vertical") {
      if (e.key === "ArrowUp") {
        setOpenItem([prevIdx(children, openItem[0])])
      }
      if (e.key === "ArrowDown") {
        setOpenItem([nextIdx(children, openItem[0])])
      }
      if (e.key === "ArrowRight") {
        const itemHasChildren = !!children[openItem[0]].children
        if (itemHasChildren) {
          dropDownRef.current.blur()
          deepRef.current.focus()
        } else {
          !isTopLevel ? UpperRef.current.focus() : null
        }
      }
      if (e.key === "ArrowLeft") {
        !isTopLevel ? UpperRef.current.focus() : null;
      }
    }
    if (e.key === "Enter") {
      onMouseUpItem(e, children[openItem[0]], openItem[0])
    }
  }

  const addCallbacktoChildren = (childs) => {
    return React.Children.toArray(childs).map((c, idx) => {
      const ClonedItem = React.cloneElement(c, {
        onMouseDown: isTopLevel ? e => onHeaderItemClick(e, c, idx) : null,
        onTouchStart: isTopLevel && !('ontouchstart' in window) ? e => onHeaderItemClick(e, c, idx) : null,
        onMouseUp: !isTopLevel ? e => onMouseUpItem(e, c, idx) : () => setmouseIsOn(false),
        onMouseOver: isTopLevel && !openItem.length ? null : e => onMouseOver(e, c, idx),
        onTouchMove: e => onTouchMoveItem(e, c, idx),
        onTouchEnd: e => onTouchEndItem(e, c),
        isTopLevel,
        isOpen: openItem.includes(idx),
        hasSubMenu: !!c.props?.children?.length,
        ...c.props,
      }, c.props.children);

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
      const ExtendDropDown = !!customDropDownMenu && !!c.props.children && openItem.includes(idx) ? React.cloneElement(c.props.children, {
        direction: "vertical",
        isTopLevel: false,
        focusFromUpper: openItem.length === 1 && !hasFocus,
        subSetmouseIsOn: setmouseIsOn,
        ref: deepRef,
        allTopChildren: isTopLevel ? children : allTopChildren,
        UpperRef: dropDownRef,
        UppercloseAll: closeAll,
        UpperSetHasFocus: setHasFocus,

      }, c.props.children.props.children) : null

      return html`
        <${FloatTo} direction=${direction}>
          ${ClonedItem}
          ${!!c.props.children && openItem.includes(idx) ? ExtendDropDown ? ExtendDropDown : DropDownMenuHtml : null}
        </${FloatTo}>
     `

    })
  }

  // const ChildWithCallback = addCallbacktoChildren(children)
  const jsonToItem = (items) => {
    const itemComps = items.map((item, idx) => {
      console.log(item, idx);
      return (
        <FloatTo direction={direction}>
          <MenuItem
            name={item.name}
            hasSubMenu={!!item.children}
            isTopLevel={isTopLevel}
            onMouseDown={isTopLevel ? (e) => onHeaderItemClick(e, item, idx) : null}
            onTouchStart={isTopLevel && !('ontouchstart' in window) ? (e) => onHeaderItemClick(e, item, idx) : null}
            onMouseUp={!isTopLevel ? (e) => onMouseUpItem(e, item, idx) : () => setmouseIsOn(false)}
            onMouseOver={isTopLevel && !openItem.length ? null : (e) => onMouseOver(e, item, idx)}
            onTouchMove={(e) => onTouchMoveItem(e, item, idx)}
            onTouchEnd={(e) => onTouchEndItem(e, item)}
            isOpen={openItem.includes(idx)}
            {...item}
          />
          {!!item.children && openItem.includes(idx) ? (
            <DropDownMenu
              direction="vertical"
              isTopLevel={false}
              itemJson={item.children}
              focusFromUpper={openItem.length === 1 && !hasFocus}
              subSetmouseIsOn={setmouseIsOn}
              ref={deepRef}
              UpperRef={dropDownRef}
              UppercloseAll={closeAll}
              UpperSetHasFocus={setHasFocus}
            >
            </DropDownMenu>
          ) : null}
        </FloatTo>
      );
    });
    return itemComps;
  };

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
          onFocus=${e => { e.stopPropagation(); !openItem.length ? setOpenItem([0]) : null }}
          tabIndex="0"
          >
      ${jsonToItem(itemJson)}
    </${StyledDopDownMenuPanel}>
  `

})



export const StyledMenuItem = styled.div`
  font-size: 13px;
  font-family:'-apple-system';
  display: flex;
  user-select: none;
  -webkit-user-select: none;
  max-height:20px;
  position: relative;
  white-space: nowrap;
  background-color: inherit;
  filter: ${({ isOpen }) => isOpen ? 'invert(1)' : null};
`

export const MenuItem = React.forwardRef(({ name, hasSubMenu, isTopLevel, shortCut, ...props }, reref) => {
  return (
    <StyledMenuItem ref={reref} {...props}>
      {name}
      {shortCut ? <span>{shortCut.replaceAll('+', ' ')}</span> : null}
      {!isTopLevel && hasSubMenu ? <ArrowDropRight size='12' /> : null}
    </StyledMenuItem>
  );
});

export const SearchMenu = React.forwardRef(({ allTopChildren = [], ...props }, forwardedRef) => {
  const [searchTerm, setSearchTerm] = useState('')

  const extractPropsChildrenAllLevel = Array.from(allTopChildren)
    .map(function Fla(Item, idx, array, path = []) {
      const { props: { children } } = Item
      return [children ? Array.from(children).map((child, idx_) => Fla(child, idx_, array, [...path, idx])) : [{ Item, path: [...path, idx] }]]
    }
    )
    .flat(Infinity)
    .filter(({ Item: { props: { name } } }) => name.toUpperCase().includes(searchTerm.toUpperCase()))
    .map(({ Item }) => Item)

  extractPropsChildrenAllLevel.unshift(html`
      <input style=${{ width: '96%', minWidth: '100px', margin: '0 auto', borderRadius: '5px' }} onmousedown=${e => e} onMouseUp=${e => e} onTouchEnd=${e => e} NoOnKeyDown=${e => e.stopPropagation()} onChange=${({ target }) => setSearchTerm(target.value)} value=${searchTerm} type="text" autofocus/>
    `)


  return html`
    <${DropDownMenu} ...${props} ref=${forwardedRef} >
      ${extractPropsChildrenAllLevel}
    </${DropDownMenu}>
  `
})

export const StyledCenteredSelect = styled.div`
  display: inline-flex;
  position: relative;
  border: 1px solid gray;
  background-color:white;
  padding-left: 1%;
  user-select: none;
`

export const StyledListSelect = styled.div`
  display: inline-block;
  position: absolute;
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  background-color: white;
  visibility:${({ visibility }) => visibility ? 'visible' : 'hidden'};
  top: ${({ top = 0 }) => top}px;
  text-align:center;
  /* outline: 1px solid white; */
  min-width: ${({ minWidth }) => minWidth}px;
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
export const StyledChevronUpDown = styled(ChevronUpDown)`
  width: 12px;
  height: 17px;
  margin-left: 5px;
  vertical-align: -1px !important;
  border-radius: 0px;
  padding: 0 1px;
/*   background: linear-gradient(0deg, rgba(0,255,220,1) 0%, rgba(255,255,0,1) 100%);*/
  border-left: 1px solid #80808078;
  vertical-align: -3px !important;

 `

export function CenteredSelect({ children, className }) {
  const centeredSelectRef = useRef(null);
  const [ref, setRef] = useState(null);
  const [refList, setRefList] = useState(null);
  const [isOpen, toggleIsOpen] = useState(false);
  const selectedFromProps = children?.filter(c => !!c.props.selected)[0] ?? children[0];
  const [selected, setSelected] = useState(selectedFromProps);

  useOnclickOutside(() => {
    toggleIsOpen(false)
  }, { disabled: !isOpen, refs: [centeredSelectRef] });

  const onSelect = (e, OptionComp) => {
    e.stopPropagation();
    setSelected(OptionComp);
    toggleIsOpen(false);
  };

  const onKeyDown = (e) => {
    console.log('select key', e.code)
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
  };

  const listVisibility = isOpen && !!refList?.getBoundingClientRect().height && !!ref?.getBoundingClientRect().height;
  const Δy = ref?.getBoundingClientRect().y - refList?.getBoundingClientRect().y;

  return (
    <StyledCenteredSelect
      tabIndex='0'
      onKeyDown={onKeyDown}
      onMouseUp={e => { e.stopPropagation(); e.preventDefault(); return false }}
      onTouchStart={() => toggleIsOpen(true)}
      onMouseDown={(e) => {e.target.focus(); toggleIsOpen(true) }}
      onContextMenu={e => { e.preventDefault(); toggleIsOpen(true); return false}}
      ref={centeredSelectRef}
      className={className}
    >
      {selected.props.children}
      <StyledChevronUpDown />
      {isOpen ? (
        <StyledListSelect
          ref={node => { setRefList(node); return node; }}
          minWidth={centeredSelectRef.current?.getBoundingClientRect().width}
          visibility={listVisibility}
          top={-Δy}
          onContextMenu={e => { e.preventDefault(); return false}}
        >
          {children.map(c => React.cloneElement(c, {
            ref: c === selected ? node => { children[0].props.ref?.(node); setRef(node) } : null,
            onClick: e => onSelect(e, c),
            onMouseDown: e => onSelect(e, c),
            onTouchStart: e => onSelect(e, c),
            // onMouseUp: c !== selected ? e => {e.preventDefault(); onSelect(e, c); return false} : null,
            onContextMenu: e => { e.preventDefault();onSelect(e, c); return false},
            selected: c === selected,
            ...c.props
          }, c.props.children))}
        </StyledListSelect>
      ) : null}
    </StyledCenteredSelect>
  );
}


export const StyledWindowDecoration = styled.div`
  display: flex;
  // width: 100%;
  background: black;
  background: linear-gradient(to bottom, #595959 1%,#727272 3%,#474747 6%,#474747 12%,#111111 49%,#000000 92%,#000000 100%);
  color: white;

  ${StyledCenteredSelect}{
    background: transparent;
    width: max-content;
    border: none;
  }

  ${StyledListSelect} {
    color: black;
    width: fit-content;
    visibility: visible;
  }
`
export const StyledWindowDecorationLeft = styled.div`
  min-width: 50px
`
export const StyledWindowDecorationCenter = styled.div`
  margin-left: auto;
`
export const StyledWindowDecorationRight = styled.div`
  margin-left: auto;

  svg {
    width: 16px;
    padding: 4px;
  }
  svg  path {
    filter: url(#inset-shadow);
    stroke-width: 2px;
  }
  svg:hover{
    filter: brightness(3);
    cursor: pointer;
  }

`

export const StyledBlueMinimize = styled(FSF.ArrowMinimize)`
    stroke: url(#rgrad);
`
export const StyledBlueMaximize = styled(FSF.Maximize)`
  stroke: url(#rgrad);
`

export const StyledRedClose = styled(FSF.Dismiss)`
  stroke: url(#lgrad);
  path {
    stroke-width: 9px !important;
  }
`

export const WindowDecoration = ({
  title,
  onClose,
  onMinimize,
  onMaximize,
  onExpand,
  representedFilename,
  isDocumentEdited,
  draggableRef,
  listeners }) => {
  return (
    <StyledWindowDecoration>
      <StyledWindowDecorationLeft ref={draggableRef} {...listeners}>
      </StyledWindowDecorationLeft>

      <StyledWindowDecorationCenter>
        {!representedFilename?.length ? title : null}
        {representedFilename?.length ? (
          <CenteredSelect>
            {representedFilename.map((path, idx) => (
              <div value={path} selected={!!idx}>{path}</div>
            ))}
          </CenteredSelect>
        ) : null}
      </StyledWindowDecorationCenter>

      <StyledWindowDecorationRight ref={draggableRef} {...listeners}>
        <StyledBlueMinimize />
        <StyledBlueMaximize />
        <StyledRedClose />
      </StyledWindowDecorationRight>
    </StyledWindowDecoration>
  );
};

export const StyledNoiseBackGround = styled.div`
  background: black;
`


function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: dndCSS.Transform.toString(transform),
    transition,
  };


  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>)

}


export const StyledToolBarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1px 0;
  border-radius: 5px;
  border-top: none;

  position: relative;
  `

const ChalkEffectSVGString = `
<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="visibility: hidden;">
  <defs>
    <radialGradient id="rgrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:rgb(0,72,255);stop-opacity:1.00"></stop>
      <stop offset="100%" style="stop-color:rgb(0,255,235);stop-opacity:1.00"></stop>
    </radialGradient>
    <linearGradient id="lgrad" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" style="stop-color:rgb(244,0,255);stop-opacity:1.00"></stop>
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1.00"></stop>
    </linearGradient>
    <filter id="chalk" height="2" width="1.6" color-interpolation-filters="sRGB" y="-0.5" x="-0.3">
      <feTurbulence baseFrequency="50" seed="115" result="result1" numOctaves="1" type="turbulence"/>
      <feOffset result="result2" dx="-5" dy="-5"/>
      <feDisplacementMap scale="1.5" yChannelSelector="G" in2="result1" xChannelSelector="R" in="SourceGraphic"/>
      <feGaussianBlur stdDeviation="0.1"/>
    </filter>
    <filter id="inset-shadow">
      <!-- Shadow offset -->
      <feOffset dx="3" dy="3"></feOffset>
      <!-- Shadow blur -->
    <feGaussianBlur stdDeviation="4" result="offset-blur"></feGaussianBlur>
      <!-- Invert drop shadow to make an inset shadow-->
      <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"></feComposite>
      <!-- Cut colour inside shadow -->
      <feFlood flood-color="black" flood-opacity="0.9" result="color" style=""></feFlood>
      <feComposite operator="in" in="color" in2="inverse" result="shadow"></feComposite>
      <!-- Placing shadow over element -->
      <feComposite operator="over" in="shadow" in2="SourceGraphic"></feComposite> 
    </filter>
    <filter id="mauve-border" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
      <feMorphology operator="dilate" radius="2 2" in="SourceAlpha" result="morphology"></feMorphology>
      <feFlood flood-color="#476dff" flood-opacity="1" result="flood"></feFlood>
      <feComposite in="flood" in2="morphology" operator="in" result="composite"></feComposite>
      <feComposite in="composite" in2="SourceAlpha" operator="out" result="composite1"></feComposite>
    </filter>
  </defs>
  <rect x="0" y="0" width="100%" height="100%" fill="url(#lgrad)"></rect>
</svg>
`
const ChalkEffectSVG = () => html`
  <div dangerouslySetInnerHTML=${{ __html: ChalkEffectSVGString }} ></div>
`

const StyledChalkFilter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  svg {
    width: 19px;
  }

  svg > path {
    filter: url(#inset-shadow);
    fill: #eae7e3;
    fill: url(#rgrad);
  }

  svg:hover {
    cursor: pointer;
  }
  svg:hover > path {
    filter: brightness(1.9);
    transform: translateY(3px);  
  }
  
`

const transitionName = `example`;

export const StyledSlideOutPanel = styled.div`
    position: absolute;
    min-height: 250px;
    width: 250px;
    background-color: red;
    opacity: 0.5;
    bottom: 1%;
    top: 0;

    @keyframes inAnimation {
      0% {
        transform: rotateX(88deg);  translateY(-30px);
        top: -119px;
      }
      1% {
        transform: rotateX(85deg); translateY(0px);
        top: -100px;
      }
      10% {
        transform: rotateX(82deg) translateY(0px);
      }
      100% {
        transform: rotateX(0deg) translateY(0px);
        top: 0%;
      }
    }

    @keyframes outAnimation {
      from {background-color: red;}
      to {background-color: yellow;}
    }
    
    // animation: ${({ isOpen }) => 'inAnimation 1s'};
    ${({ isOpen }) => !isOpen ? 'animation: inAnimation 1s reverse' : 'animation: inAnimation 1s '};

    
`;

const AllProp = (props) => {
  console.log("props", props);
  return <div></div>
}

export const SlideOutPanel = ({ isOpen }) => {

  const [appear, setAppear] = useState(isOpen)

  useEffect(() => {
    if (!isOpen) {
      return setTimeout(() => {
        setAppear(false)
      }, 1000);
    }
    setAppear(isOpen)
  }, [isOpen]);

  return (
    appear ? (
      <StyledSlideOutPanel isOpen={isOpen} key={`unique${!isOpen ? 'close' : ''}`}>
        {/* <SaveAs /> */}
        <FSF.PanelBottom />
        <FSF.MultiselectLtr />
        <FSF.CopySelect />
        <FSF.SelectAllOn />
        <FSF.ArrowSquareDown />
        <FSF.AddSquare />
      </StyledSlideOutPanel>
    ) : null
  )

  // return (
  //   <CSSTransitionGroup
  //     transitionName={transitionName}
  //     transitionAppear={true}
  //     transitionAppearTimeout={500} >
  //       <AllProp />
  //     {/* {isOpen ? (
  //       <StyledSlideOutPanel key="unique">
  //         <SaveAs />
  //         <FSF.PanelBottom />
  //         <FSF.MultiselectLtr />
  //         <FSF.CopySelect />
  //         <FSF.SelectAllOn />
  //         <FSF.ArrowSquareDown />
  //         <FSF.AddSquare />
  //       </StyledSlideOutPanel>
  //     ) : null} */}
  //   </CSSTransitionGroup>
  // )
}

export const StyledToolBarGroup = styled(StyledChalkFilter)`
    width: fit-content;
    border: 2px solid #858585;
    border-radius: 7px;
    margin-right: 53px;
`


function SortableToolBar({ children, /*isEdited*/ }) {

  const [items, setItems] = useState(children.map((c, idx) => ({ ...c, id: `id_${idx}` })));
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [isEdited, setIsEdited] = useState(false);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis]}
    >
      <StyledToolBarContainer>
        <span style={{ color: "white" }} onClick={() => setIsEdited(!isEdited)}>Edit/close</span>
        <StyledChalkFilter>
          <SortableContext
            Noitems={items}
            items={items.map(item => item.id)}
            strategy={horizontalListSortingStrategy}
          >
            {items.map((elem, idx) => <SortableItem key={elem.id} id={elem.id}>{elem}</SortableItem>)}
          </SortableContext>
          <SlideOutPanel isOpen={isEdited} />
        </StyledChalkFilter>
      </StyledToolBarContainer>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    console.log(event)
    if (active.id !== over.id) {
      console.log("if")
      setItems((items) => {
        const oldIndex = items.map((item) => item.id).indexOf(active.id);
        const newIndex = items.map((item) => item.id).indexOf(over.id);
        console.log({ oldIndex, newIndex });
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}

const StyledResizeHandle = styled.div`
    width: 6px;
    min-height: 6px;
    border-top-right-radius: 0%;
    border-top-left-radius: 100%;
    background-color: #54a3cf;
    position: absolute;
    bottom: 0;
    right: 0;
`

const StyledWindow = styled.div`

`

function WindowComponent(props) {
  const { coordchange, width: widthProps, height: heightProps, x: xProps = 0, y: yProps = 0, children } = props;
  const { setNodeRef, listeners, transform, setActivatorNodeRef } = useDraggable({ id: 'truc' })
  const [x, setX] = useState(parseInt(xProps))
  const [y, setY] = useState(parseInt(yProps))
  const [width, setWidth] = useState(widthProps);
  const [height, setHeight] = useState(heightProps);

  // console.log('onCoordChange', coordchange && coordchange("yyyeyye"));
  // console.log(this);

  if (coordchange) {
    // console.log("has function");
    // console.log(coordchange);
  }

  const dispatchCoordChange = (coord) => {
    const coordEvent = new CustomEvent("coord-change", {
      detail: coord
    });
    this.base.dispatchEvent(coordEvent, coord);
  }

  useDndMonitor({
    onDragEnd: e => {
      // console.log('drag end', e);
      console.log('e.delta.x', e.delta.x);
      console.log('e.delta.y', e.delta.y);
      setX(x + e.delta.x)
      setY(y + e.delta.y)
      // coordchange?.({x:x + e.delta.x,y:y + e.delta.y})
      dispatchCoordChange({ x: x + e.delta.x, y: y + e.delta.y })
    }
  })

  const onResize = (e, {size}) => {
    console.log(size);
    setWidth(size.width);
    setHeight(size.height);
  }

  return (
    <Resizable handle={<StyledResizeHandle />} onResize={onResize} width={parseInt(width)} height={parseInt(height)}>
      <div key="uniiiique" ref={setNodeRef} style={{ width, minHeight: height, position: "absolute", left: x, top: y, transform: dndCSS.Transform.toString(transform), backgroundColor: "white",boxShadow:"rgba(0, 0, 0, 0.2) 5px 5px 8px 1px;" }}>
        <WindowDecoration title="Drag around" draggableRef={setActivatorNodeRef} listeners={listeners} representedFilename={['file.example', 'Folder', 'Documents']} />
        {children}
      </div>
    </Resizable>
  )
}



console.log('this -----', this)

const WindowComponentWithContext = (props) => {
  console.log('onCoordChange', props.coordchange);
  console.log('props X', props.x);
  return (
    <DndContext>
      <WindowComponent {...props}>
        {props.children}
      </WindowComponent>
    </DndContext>
  )
}

register(WindowComponent, 'lepto-win', ["width", "height"], { shadow: false });
register(WindowComponentWithContext, 'lepto-context-win', ["coordchange", "x", "y", "width", "height"], { shadow: false });
register(DndContext, 'dn-context', ["children"], { shadow: false });

const myMenuItem = [
  {
    "name": "File",
    "children": [
      { "name": "Open" },
      { "name": "New" }
    ]
  },
  {
    "name": "Edit",
    "children": [
      { "name": "Undo", "onAction": (a) => console.log('shortcut_', a), "shortCut": "ctrl+z" },
      { "name": "Redo" },
      { "name": "Copy" },
      { "name": "Past" },
      { "name": "Truc", "shortCut": "ctrl+truc" },
      {
        "name": "Sub menu",
        "ref": "(node) => console.log('1st node', node)",
        "children": [
          {
            "name": "Sub item A",
            "children": [
              { "name": "Copy", "onAction": () => console.log('sub copy') },
              { "name": "Past" },
              {
                "name": "mais encore",
                "children": [
                  { "name": "Past" },
                  { "name": "Copy" }
                ]
              }
            ]
          },
          { "name": "Sub item B" },
          {
            "name": "Sub Next",
            "children": [
              { "name": "TRUC", "onAction": () => alert('Truc') },
              { "name": "OPOPO" }
            ]
          }
        ]
      },]
  },
  {
    "name": "Show",
    "children": [
      { "name": "By List" },
      { "name": "By Grid" }
    ]
  },
  {
    "name": "help",
    "children": [
      { "SearchMenu": { "isExtension": true } }
    ]
  }
];

const toolbarButtonsElements = [
  {name: "copy", icon: "<svg></svg>"},
  {type: "spacing"},
  {type: "group", elements: [
    {name: "copy", icon: "<svg></svg>"},
    {name: "copy", icon: "<svg></svg>"},
  ]}
] 

export const Demo = () => (
  <>
    <TheHTML />
    <ControlBox>
      <p>Hello World!___</p>
      <StyledButton>Click me!</StyledButton>
      <br />
      <br />
      <br />
      <DropDownMenu itemJson={myMenuItem} direction="horizontal" multipleOpen={false} zIndex={1}>
      </DropDownMenu>
      <br />
      <br />

      <CenteredSelect>
        <div value="ex 1">ex1</div>
        <div value="ex 2">ex2</div>
        <div value="ex 3" selected>
          ex3
        </div>
        <div value="ex 4">ex4</div>
        <div value="ex 5">ex5</div>
        <div value="ex 6">ex6</div>
      </CenteredSelect>
      <br />
      <br />

      <WindowDecoration title="App example" representedFilename={['file.example', 'Folder', 'Documents']} />
      <StyledNoiseBackGround>
        <SortableToolBar>
          <ChalkEffectSVG />
          <StyledToolBarGroup>
            <FSF.ArrowAutofitUp />
            <FSF.ArrowCurveUpLeft />
            <FSF.ArrowUp />
            <FSF.ArrowDown />
            <FSF.PositionToFront />
          </StyledToolBarGroup>
          <FSF.PanelLeft />
          <FSF.SelectObject />
          {/* <SaveAs /> */}
          <FSF.PanelBottom />
          <FSF.MultiselectLtr />
          <FSF.CopySelect />
          <FSF.SelectAllOn />
          <FSF.ArrowSquareDown />
          <FSF.AddSquare />
          <FSF.TextBold />
          <FSF.TextItalic />
          <FSF.TextUnderline />
          <FSF.ImageAdd />
          <FSF.ImageAltText />
          <CenteredSelect>
            <div value="ex 1">font 1</div>
            <div value="ex 4" selected>ex4</div>
            <div value="ex 5">ex5</div>
            <div value="ex 6">ex6</div>
          </CenteredSelect>
        </SortableToolBar>
      </StyledNoiseBackGround>
      {/* 
      <DndContext>
        <WindowComponent height="200px" width="200px">
          <div style={{ color: 'white' }}>OSUSHUHQSHUS dsoidqjsidsqd</div>
        </WindowComponent>
      </DndContext> */}
    </ControlBox>
  </>
);


register(Demo, 'lepto-demo', [], { shadow: false });

const StyledText = styled.div`
  color:${props => props.theme.fg};
`

function ThemeTest({ jsontheme, children }) {
  const defaultTheme = {
    fg: "palevioletred",
    bg: "white"
  };
  console.log("jsontheme", jsontheme);
  return (
    <ThemeProvider theme={jsontheme ? JSON.parse(jsontheme) : defaultTheme}>
      {children}
      <StyledText>
        <span>TETETET</span>
      </StyledText>
    </ThemeProvider>
  )
}

register(ThemeTest, 'lepto-theme', ["jsontheme", "children"], { shadow: false });
register(StyledText, 'lepto-text', [], { shadow: false });


// render(createElement(Demo), document.getElementById('demo'));

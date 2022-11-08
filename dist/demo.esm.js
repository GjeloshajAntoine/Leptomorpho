import $6jkqg$react, {createElement as $6jkqg$createElement, useState as $6jkqg$useState, useEffect as $6jkqg$useEffect, useRef as $6jkqg$useRef} from "react";
import {render as $6jkqg$render} from "react-dom";
import $6jkqg$htm from "htm";
import $6jkqg$styledcomponents, {css as $6jkqg$css, createGlobalStyle as $6jkqg$createGlobalStyle} from "styled-components";
import {ShareApple as $6jkqg$ShareApple} from "@styled-icons/evil";
import {ArrowDropRight as $6jkqg$ArrowDropRight} from "@styled-icons/remix-fill/ArrowDropRight";
import "hotkeys-js";
import $6jkqg$reactcoolonclickoutside from "react-cool-onclickoutside";
import {ChevronUpDown as $6jkqg$ChevronUpDown} from "@styled-icons/fluentui-system-filled/ChevronUpDown";
import {SaveAs as $6jkqg$SaveAs} from "@styled-icons/heroicons-solid/SaveAs";
import {ArrowMinimize as $6jkqg$ArrowMinimize, Maximize as $6jkqg$Maximize, Dismiss as $6jkqg$Dismiss, ArrowAutofitUp as $6jkqg$ArrowAutofitUp, ArrowCurveUpLeft as $6jkqg$ArrowCurveUpLeft, ArrowUp as $6jkqg$ArrowUp, ArrowDown as $6jkqg$ArrowDown, PositionToFront as $6jkqg$PositionToFront, PanelLeft as $6jkqg$PanelLeft, SelectObject as $6jkqg$SelectObject, PanelBottom as $6jkqg$PanelBottom, MultiselectLtr as $6jkqg$MultiselectLtr, CopySelect as $6jkqg$CopySelect, SelectAllOn as $6jkqg$SelectAllOn, ArrowSquareDown as $6jkqg$ArrowSquareDown, AddSquare as $6jkqg$AddSquare, TextBold as $6jkqg$TextBold, TextItalic as $6jkqg$TextItalic, TextUnderline as $6jkqg$TextUnderline, ImageAdd as $6jkqg$ImageAdd, ImageAltText as $6jkqg$ImageAltText} from "@styled-icons/fluentui-system-filled";












// mobileConsole.show()
// const html = htm.bind((type,props,...children)=>{/*console.log(type);*/return createElement(type,props,...children)});
const $280f206debff4ffe$var$html = (0, $6jkqg$htm).bind((0, $6jkqg$createElement));
const $280f206debff4ffe$var$clearWarmBeige = (0, $6jkqg$css)`background: linear-gradient(44.8deg, hsl(13deg 100% 97%) -53.1%, hsl(43deg 100% 95%) 49%);`;
const $280f206debff4ffe$var$NeonPinkGradient = (0, $6jkqg$css)` background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);`;
const $280f206debff4ffe$var$HighlightNeonPinkGradient = (0, $6jkqg$css)`filter: hue-rotate(144deg)`;
const $280f206debff4ffe$var$TheHTML = (0, $6jkqg$createGlobalStyle)`
  html,body {
    overscroll-behavior-y: none;
    position: fixed;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
  }

`;
const $280f206debff4ffe$var$ControlBox = (0, $6jkqg$styledcomponents).div`
  background-color: #eae7e3;
  width: 65vw;
  height: 55vh;
  margin: 0 auto;
  /* margin-top: 15vh; */
  padding: 5px;
`;
const $280f206debff4ffe$var$buttonColor = "rgb(255 246 219)";
const $280f206debff4ffe$export$2d5d2ba3c7c8c40b = (0, $6jkqg$styledcomponents).button`
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;

  border: 1px solid rgba(243,223,207,1);
  border: 1px solid rgb(255 255 255);
  outline: 1px solid ${$280f206debff4ffe$var$buttonColor};
  background: linear-gradient(to top, ${$280f206debff4ffe$var$buttonColor} 0%,rgba(255,255,255,1) 28%);

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
    background: linear-gradient(to bottom, ${$280f206debff4ffe$var$buttonColor} 95%, rgba(255,255,255,1) 0%);
    background: linear-gradient(to bottom, rgb(34 34 34) 83%, rgb(255, 255, 255) 14%);
    outline: rgb(0, 0, 0) solid 1px;
    border: rgb(104 104 104) solid 1px;
  }
`;
const $280f206debff4ffe$export$bf2eeb11af6f5d5a = ({ direction: direction  })=>({
        horizontal: "row",
        vertical: "column"
    })[direction] ?? "row";
const $280f206debff4ffe$export$998804cc2e36d798 = (0, $6jkqg$styledcomponents).div`
  display: flex;
  flex-direction :${$280f206debff4ffe$export$bf2eeb11af6f5d5a};
  gap : 3px;

`;
const $280f206debff4ffe$export$16a345f05a2dba2e = ({ children: children , direction: direction  })=>{
    const [props, setProps] = (0, $6jkqg$useState)({
        visibility: "hidden"
    });
    const [ref, setRef] = (0, $6jkqg$useState)(null);
    const ClonedTo = /*#__PURE__*/ (0, $6jkqg$react).cloneElement(children[0], {
        ref: (node)=>{
            children[0].props.ref?.(node);
            setRef(node);
        }
    }, children[0].props.children);
    const CloneFloating = children[1] ? /*#__PURE__*/ (0, $6jkqg$react).cloneElement(children[1], {
        ...props,
        ...children[1].props
    }, children[1].props.children) : null;
    (0, $6jkqg$useEffect)(()=>{
        if (!ref) return;
        const { top: top , bottom: bottom , height: height , left: left , right: right , width: width  } = ref.getBoundingClientRect();
        if (direction === "horizontal") setProps({
            visibility: "visible",
            top: bottom,
            left: left
        });
        else if (direction === "vertical") setProps({
            visibility: "visible",
            top: top,
            left: right,
            bottom: null
        });
    }, [
        ref,
        children
    ]);
    return $280f206debff4ffe$var$html`
    ${ClonedTo}
    ${CloneFloating}
  `;
};
const $280f206debff4ffe$export$72c275ec29e1ae31 = (0, $6jkqg$styledcomponents).div`
  display: flex;
  flex-direction :${$280f206debff4ffe$export$bf2eeb11af6f5d5a};
  gap : 3px;
  background-color: white;
  z-index: 1;
  ${({ top: top , left: left  })=>left === null ? "" : "position:fixed"};
  top:${({ top: top  })=>top}px;
  left:${({ left: left  })=>left}px;
  bottom:${({ bottom: bottom  })=>bottom}px;
  visibility: ${({ visibility: visibility  })=>visibility};
  width: auto;
  ${({ isTopLevel: isTopLevel  })=>isTopLevel ? `
    background-color: #eae7e3;
    width: fit-content; 
  ` : `
    width: auto;
    background-color: white;
    font-weight:bold;
    justify-content: space-between;
  `};
`;
const $280f206debff4ffe$export$ee621bb1988a9f78 = /*#__PURE__*/ (0, $6jkqg$react).forwardRef(({ children: children , direction: direction = "vertical" , isTopLevel: isTopLevel = true , multiOpen: multiOpen = false , focusFromUpper: focusFromUpper = false , allTopChildren: allTopChildren = [] , subSetmouseIsOn: subSetmouseIsOn = false , top: top = null , left: left = null , bottom: bottom = null , UppercloseAll: UppercloseAll = null , UpperRef: UpperRef = null  }, forRef)=>{
    const [mouseIsOn, setmouseIsOn] = (0, $6jkqg$useState)(subSetmouseIsOn);
    const [openItem, setOpenItem] = (0, $6jkqg$useState)([]); // Array because you can optionaly open many menu item of the same level : props.multiOpen
    const [flashPath, setFlashPath] = (0, $6jkqg$useState)([]);
    const dropDownRef = (0, $6jkqg$useRef)(null);
    const deepRef = (0, $6jkqg$useRef)(null);
    const [hasFocus, setHasFocus] = (0, $6jkqg$useState)(isTopLevel || focusFromUpper);
    const closeAll = ()=>{
        setOpenItem([]);
        UppercloseAll?.();
    };
    (0, $6jkqg$useEffect)(function InitFocusTopLevel() {
        isTopLevel && !!openItem.length && dropDownRef.current.focus();
    }, [
        isTopLevel,
        !!openItem.length
    ]);
    if (isTopLevel) (0, $6jkqg$reactcoolonclickoutside)(()=>{
        setOpenItem([]);
    }, {
        disabled: !openItem.length,
        refs: [
            dropDownRef
        ]
    });
    const onHeaderItemClick = (e, Item, idx)=>{
        e.preventDefault();
        e.stopPropagation();
        openItem.includes(idx) && !mouseIsOn ? setOpenItem([]) : setOpenItem([
            idx
        ]);
        setmouseIsOn(true);
    };
    const onMouseUpItem = (e, Item, idx)=>{
        e.stopPropagation();
        e.preventDefault();
        const { props: { children: children  }  } = Item;
        children ? setOpenItem([
            idx
        ]) : closeAll();
        setmouseIsOn(false);
        Item.props.onAction?.();
    };
    function onMouseOver(e, c, idx) {
        e.stopPropagation();
        e.preventDefault();
        setOpenItem([
            idx
        ]);
    }
    const onTouchMoveItem = (e)=>{
        e.stopPropagation();
        e.preventDefault();
        const { touches: touches , touches: [{ clientX: clientX , clientY: clientY  } = {}] = []  } = e;
        if (!openItem.length && !mouseIsOn) return;
        if (touches) {
            const newTarget = document.elementFromPoint(clientX, clientY);
            newTarget.dispatchEvent(new Event("mouseover", {
                bubbles: true
            }));
        }
    };
    const onTouchEndItem = (e)=>{
        const { target: target , touches: touches , changedTouches: [{ clientX: clientX , clientY: clientY  } = {}] = []  } = e;
        e.preventDefault();
        const newTarget = document.elementFromPoint(clientX, clientY);
        if (touches && newTarget !== target) newTarget.dispatchEvent(new Event("mouseup", {
            bubbles: true
        }));
    };
    const nextIdx = (arr, idx)=>arr.length - 1 === idx ? 0 : idx + 1;
    const prevIdx = (arr, idx)=>idx === 0 ? arr.length - 1 : idx - 1;
    const onKeyDown = (e)=>{
        console.log("childrenchildren", children.length);
        e.stopPropagation();
        if (direction === "horizontal") {
            if (e.key === "ArrowLeft") setOpenItem([
                prevIdx(children, openItem[0])
            ]);
            if (e.key === "ArrowRight") setOpenItem([
                nextIdx(children, openItem[0])
            ]);
            if (e.key === "ArrowDown") {
                deepRef.current.focus();
                dropDownRef.current.blur();
            }
        }
        if (direction === "vertical") {
            if (e.key === "ArrowUp") setOpenItem([
                prevIdx(children, openItem[0])
            ]);
            if (e.key === "ArrowDown") setOpenItem([
                nextIdx(children, openItem[0])
            ]);
            if (e.key === "ArrowRight") {
                const itemHasChildren = !!children[openItem[0]].props.children;
                if (itemHasChildren) {
                    dropDownRef.current.blur();
                    deepRef.current.focus();
                } else !isTopLevel && UpperRef.current.focus();
            }
            if (e.key === "ArrowLeft") !isTopLevel && UpperRef.current.focus();
        }
        if (e.key === "Enter") onMouseUpItem(e, children[openItem[0]], openItem[0]);
    };
    const addCallbacktoChildren = (childs)=>{
        return (0, $6jkqg$react).Children.toArray(childs).map((c, idx)=>{
            const ClonedItem = /*#__PURE__*/ (0, $6jkqg$react).cloneElement(c, {
                onMouseDown: isTopLevel && !("ontouchstart" in window) ? (e)=>onHeaderItemClick(e, c, idx) : (e)=>e.stopPropagation(),
                onTouchStart: isTopLevel ? (e)=>onHeaderItemClick(e, c, idx) : null,
                onMouseUp: !isTopLevel ? (e)=>onMouseUpItem(e, c, idx) : ()=>setmouseIsOn(false),
                onMouseOver: isTopLevel && !openItem.length ? null : (e)=>onMouseOver(e, c, idx),
                onTouchMove: (e)=>onTouchMoveItem(e, c, idx),
                onTouchEnd: (e)=>onTouchEndItem(e, c),
                isTopLevel: isTopLevel,
                isOpen: openItem.includes(idx),
                hasSubMenu: !!c.props?.children?.length,
                ...c.props
            }, c.props.children);
            const DropDownMenuHtml = !!c.props.children && openItem.includes(idx) ? $280f206debff4ffe$var$html`<${$280f206debff4ffe$export$ee621bb1988a9f78} 
                 direction="vertical" 
                 isTopLevel=${false} 
                 focusFromUpper=${openItem.length === 1 && !hasFocus} 
                 subSetmouseIsOn=${setmouseIsOn} 
                 ref=${deepRef}
                 UpperRef=${dropDownRef}
                 UppercloseAll=${closeAll} 
                 UpperSetHasFocus=${setHasFocus}>
             ${c.props.children} 
           </${$280f206debff4ffe$export$ee621bb1988a9f78}>` : null;
            //  <!--x,y position <will be filled by floatTo component upon cloning -->
            const customDropDownMenu = c.props.children?.props?.isExtension;
            const ExtendDropDown = !!customDropDownMenu && !!c.props.children && openItem.includes(idx) ? /*#__PURE__*/ (0, $6jkqg$react).cloneElement(c.props.children, {
                direction: "vertical",
                isTopLevel: false,
                focusFromUpper: openItem.length === 1 && !hasFocus,
                subSetmouseIsOn: setmouseIsOn,
                ref: deepRef,
                allTopChildren: isTopLevel ? children : allTopChildren,
                UpperRef: dropDownRef,
                UppercloseAll: closeAll,
                UpperSetHasFocus: setHasFocus
            }, c.props.children.props.children) : null;
            return $280f206debff4ffe$var$html`
        <${$280f206debff4ffe$export$16a345f05a2dba2e} direction=${direction}>
          ${ClonedItem}
          ${!!c.props.children && openItem.includes(idx) ? ExtendDropDown ? ExtendDropDown : DropDownMenuHtml : null}
        </${$280f206debff4ffe$export$16a345f05a2dba2e}>
     `;
        });
    };
    const ChildWithCallback = addCallbacktoChildren(children);
    return $280f206debff4ffe$var$html`
    <${$280f206debff4ffe$export$72c275ec29e1ae31} 
          direction=${direction} 
          ref=${(node)=>{
        dropDownRef.current = node;
        if (typeof forRef === "function") forRef(node);
        else if (forRef) forRef.current = node;
    }}
          isTopLevel=${isTopLevel} 
          visibility=${isTopLevel} 
          top=${top} 
          left=${left} 
          bottom=${bottom}
          onKeyDown=${onKeyDown}
          onFocus=${(e)=>{
        e.stopPropagation();
        !openItem.length && setOpenItem([
            0
        ]);
    }}
          tabIndex="0"
          >
      ${ChildWithCallback}
    </${$280f206debff4ffe$export$72c275ec29e1ae31}>
  `;
});
const $280f206debff4ffe$export$cae703c457e46f23 = (0, $6jkqg$styledcomponents).div`
  font-size: 13px;
  font-family:'-apple-system';
  display: flex;
  width: 100;
  user-select: none;
  position: relative;
  white-space: nowrap;
  background-color: inherit;
  filter: ${({ isOpen: isOpen  })=>isOpen ? "invert(1)" : null};
`;
const $280f206debff4ffe$export$2ce376c2cc3355c8 = /*#__PURE__*/ (0, $6jkqg$react).forwardRef(({ name: name , hasSubMenu: hasSubMenu , isTopLevel: isTopLevel , shortCut: shortCut , ...props }, reref)=>{
    return $280f206debff4ffe$var$html`
    <${$280f206debff4ffe$export$cae703c457e46f23} ref=${reref} ...${props}>
      ${name}
      ${shortCut ? $280f206debff4ffe$var$html`<span>${shortCut.replaceAll("+", " ")}</span>` : null}
      ${!isTopLevel && hasSubMenu ? $280f206debff4ffe$var$html`<${0, $6jkqg$ArrowDropRight} size='12' />` : null}

    </${$280f206debff4ffe$export$cae703c457e46f23}>
  `;
});
const $280f206debff4ffe$export$64c9c070e629d7f7 = /*#__PURE__*/ (0, $6jkqg$react).forwardRef(({ allTopChildren: allTopChildren = [] , ...props }, forwardedRef)=>{
    const [searchTerm, setSearchTerm] = (0, $6jkqg$useState)("");
    const extractPropsChildrenAllLevel = Array.from(allTopChildren).map(function Fla(Item, idx, array, path = []) {
        const { props: { children: children  }  } = Item;
        return [
            children ? Array.from(children).map((child, idx_)=>Fla(child, idx_, array, [
                    ...path,
                    idx
                ])) : [
                {
                    Item: Item,
                    path: [
                        ...path,
                        idx
                    ]
                }
            ]
        ];
    }).flat(Infinity).filter(({ Item: { props: { name: name  }  }  })=>name.toUpperCase().includes(searchTerm.toUpperCase())).map(({ Item: Item  })=>Item);
    extractPropsChildrenAllLevel.unshift($280f206debff4ffe$var$html`
      <input style=${{
        width: "96%",
        minWidth: "100px",
        margin: "0 auto",
        borderRadius: "5px"
    }} onmousedown=${(e)=>e} onMouseUp=${(e)=>e} onTouchEnd=${(e)=>e} NoOnKeyDown=${(e)=>e.stopPropagation()} onChange=${({ target: target  })=>setSearchTerm(target.value)} value=${searchTerm} type="text" autofocus/>
    `);
    return $280f206debff4ffe$var$html`
    <${$280f206debff4ffe$export$ee621bb1988a9f78} ...${props} ref=${forwardedRef} >
      ${extractPropsChildrenAllLevel}
    </${$280f206debff4ffe$export$ee621bb1988a9f78}>
  `;
});
const $280f206debff4ffe$export$79a5f0df7cc8c932 = (0, $6jkqg$styledcomponents).div`
  display: inline-block;
  position: relative;
  border: 1px solid gray;
  background-color:white;
  padding-left: 1%;
  user-select: none;
`;
const $280f206debff4ffe$export$1015dd8742183843 = (0, $6jkqg$styledcomponents).div`
  display: inline-block;
  position: absolute;
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto; 
  background-color: white;
  visibility:${({ visibility: visibility  })=>visibility ? "visible" : "hidden"};
  top: ${({ top: top = 0  })=>top}px;
  text-align:center;
  /* outline: 1px solid white; */
  min-width: ${({ minWidth: minWidth  })=>minWidth}px;
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
`;
const $280f206debff4ffe$export$9c700a78418d6278 = (0, $6jkqg$styledcomponents)((0, $6jkqg$ChevronUpDown))`
  width: 12px;
  height: 17px;
  margin-left: 5px;
  vertical-align: -1px !important;
  border-radius: 0px;
  padding: 0 1px;
/*   background: linear-gradient(0deg, rgba(0,255,220,1) 0%, rgba(255,255,0,1) 100%);*/
  border-left: 1px solid #80808078;
  vertical-align: -3px !important;

 `;
function $280f206debff4ffe$export$febac173755e83ae({ children: children , className: className  }) {
    const centeredSelectRef = (0, $6jkqg$useRef)(null);
    const [ref, setRef] = (0, $6jkqg$useState)(null);
    const [refList, setRefList] = (0, $6jkqg$useState)(null);
    const [isOpen, toggleIsOpen] = (0, $6jkqg$useState)(false);
    const selectedFromProps = children?.filter((c)=>!!c.props.selected)[0] ?? children[0];
    const [selected, setSelected] = (0, $6jkqg$useState)(selectedFromProps);
    (0, $6jkqg$reactcoolonclickoutside)(()=>{
        toggleIsOpen(false);
    }, {
        disabled: !isOpen,
        refs: [
            centeredSelectRef
        ]
    });
    const onSelect = (e, OptionComp)=>{
        e.stopPropagation();
        setSelected(OptionComp);
        toggleIsOpen(false);
    };
    const onKeyDown = (e)=>{
        console.log("select key", e.code);
        if (e.code === "Escape") return toggleIsOpen(false);
        if (e.code === "Enter") return toggleIsOpen(false);
        if (e.code === "ArrowUp") {
            const CurrentIndex = children?.indexOf(selectedFromProps);
            return toggleIsOpen(false);
        }
        if (e.code === "ArrowDown") return toggleIsOpen(false);
    };
    const listVisibility = isOpen && !!refList?.getBoundingClientRect().height && !!ref?.getBoundingClientRect().height;
    const Δy = ref?.getBoundingClientRect().y - refList?.getBoundingClientRect().y;
    return $280f206debff4ffe$var$html`  
    <${$280f206debff4ffe$export$79a5f0df7cc8c932} 
        tabIndex='0' 
        onKeyDown=${onKeyDown} 
        onMouseUp=${(e)=>{
        e.stopPropagation();
        return false;
    }} 
        onTouchStart=${()=>toggleIsOpen(!isOpen)} 
        onMouseDown=${(e)=>{
        e.target.focus();
        toggleIsOpen(!isOpen);
    }}
        ref=${centeredSelectRef}
        className=${className}
        >
      ${selected.props.children}
      <${$280f206debff4ffe$export$9c700a78418d6278} />
      ${isOpen ? $280f206debff4ffe$var$html`
          <${$280f206debff4ffe$export$1015dd8742183843} ref=${(node)=>{
        setRefList(node);
        return node;
    }} minWidth=${centeredSelectRef.current?.getBoundingClientRect().width} visibility=${listVisibility} top=${-Δy}>
            ${children.map((c)=>/*#__PURE__*/ (0, $6jkqg$react).cloneElement(c, {
            ref: c === selected ? (node)=>{
                children[0].props.ref?.(node);
                setRef(node);
            } : null,
            onClick: (e)=>onSelect(e, c),
            onMouseDown: (e)=>onSelect(e, c),
            onTouchStart: (e)=>onSelect(e, c),
            onMouseUp: c !== selected ? (e)=>onSelect(e, c) : null,
            selected: c === selected,
            ...c.props
        }, c.props.children))}
          </${$280f206debff4ffe$export$1015dd8742183843}> 
        ` : null}
    </${$280f206debff4ffe$export$79a5f0df7cc8c932}>
  `;
}
const $280f206debff4ffe$export$81ea235131dcb164 = (0, $6jkqg$styledcomponents).div`
  display: flex;
  width: 100%;
  background: black;
  background: linear-gradient(to bottom, #595959 1%,#727272 3%,#474747 6%,#474747 12%,#111111 49%,#000000 92%,#000000 100%);
  color: white;

  ${$280f206debff4ffe$export$79a5f0df7cc8c932}{
    background: transparent;
    width: max-content;
    border: none;
  }

  ${$280f206debff4ffe$export$1015dd8742183843} {
    color: black;
    width: fit-content;
    visibility: visible;
  }
`;
const $280f206debff4ffe$export$6ee7abe7a69f7b26 = (0, $6jkqg$styledcomponents).div`

`;
const $280f206debff4ffe$export$3d6e84015daa5f95 = (0, $6jkqg$styledcomponents).div`
  margin-left: auto;
`;
const $280f206debff4ffe$export$15ab87f38b10c1aa = (0, $6jkqg$styledcomponents).div`
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

`;
const $280f206debff4ffe$export$b3e34364c4ea8f64 = (0, $6jkqg$styledcomponents)($6jkqg$ArrowMinimize)`
    stroke: url(#rgrad);
`;
const $280f206debff4ffe$export$6ca5f910bccde432 = (0, $6jkqg$styledcomponents)($6jkqg$Maximize)`
  stroke: url(#rgrad);
`;
const $280f206debff4ffe$export$d8681c40c8984cea = (0, $6jkqg$styledcomponents)($6jkqg$Dismiss)`
  stroke: url(#lgrad);
  path {
    stroke-width: 9px !important;
  }
`;
const $280f206debff4ffe$export$1e57c904ebe23308 = ({ title: title , onClose: onClose , onMinimize: onMinimize , onMaximize: onMaximize , onExpand: onExpand , representedFilename: representedFilename , documentEdited: documentEdited  })=>{
    return $280f206debff4ffe$var$html`
      <${$280f206debff4ffe$export$81ea235131dcb164}>
        <${$280f206debff4ffe$export$6ee7abe7a69f7b26}>
        </${$280f206debff4ffe$export$6ee7abe7a69f7b26}>
        <${$280f206debff4ffe$export$3d6e84015daa5f95}>
          ${!representedFilename?.length ? title : null}
          ${!!representedFilename?.length ? $280f206debff4ffe$var$html`
            <${$280f206debff4ffe$export$febac173755e83ae}>
              ${representedFilename.map((path, idx)=>$280f206debff4ffe$var$html`<div  value=${path} selected=${!!idx}>${path}</div>`)}
            </${$280f206debff4ffe$export$febac173755e83ae}>
          ` : null}
        </${$280f206debff4ffe$export$3d6e84015daa5f95}>
        <${$280f206debff4ffe$export$15ab87f38b10c1aa}>
            <${$280f206debff4ffe$export$b3e34364c4ea8f64}/>
            <${$280f206debff4ffe$export$6ca5f910bccde432}/>
            <${$280f206debff4ffe$export$d8681c40c8984cea}/>
        </${$280f206debff4ffe$export$15ab87f38b10c1aa}>
      </${$280f206debff4ffe$export$81ea235131dcb164}>
    `;
};
const $280f206debff4ffe$export$ac6359d79df2e4d1 = (0, $6jkqg$styledcomponents).div`
  background: black;
`;
const $280f206debff4ffe$export$a70cad76d0b07bed = (0, $6jkqg$styledcomponents).div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1px 0;
  border-radius: 5px;
  border-top: none;
  `;
const $280f206debff4ffe$var$ChalkEffectSVGString = `
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
`;
const $280f206debff4ffe$var$ChalkEffectSVG = ()=>$280f206debff4ffe$var$html`
  <div dangerouslySetInnerHTML=${{
        __html: $280f206debff4ffe$var$ChalkEffectSVGString
    }} ></div>
`;
const $280f206debff4ffe$var$StyledChalkFilter = (0, $6jkqg$styledcomponents).div`
  display: flex;
  justify-content: center;
  width: 100%;

  > svg {
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
  
`;
const $280f206debff4ffe$export$14876b2cda3a9ce0 = (0, $6jkqg$styledcomponents)($280f206debff4ffe$var$StyledChalkFilter)`
    width: fit-content;
    border: 2px solid #858585;
    border-radius: 7px;
    margin-right: 53px;
`;
const $280f206debff4ffe$export$425ce3ef4cdbf755 = ()=>$280f206debff4ffe$var$html`
      <${(0, $6jkqg$react).Fragment}>
      <${$280f206debff4ffe$var$TheHTML}/>
      <${$280f206debff4ffe$var$ControlBox}>
        <p>Hello World!___</p>
        <${$280f206debff4ffe$export$2d5d2ba3c7c8c40b}>Click me!</${$280f206debff4ffe$export$2d5d2ba3c7c8c40b}>
        <!-- <${$280f206debff4ffe$export$2d5d2ba3c7c8c40b}> <${0, $6jkqg$ShareApple}/> </${$280f206debff4ffe$export$2d5d2ba3c7c8c40b}> -->
        <br/>
        <br/>
        <br/>
        <${$280f206debff4ffe$export$ee621bb1988a9f78} direction='horizontal' multipleOpen=${false} zIndex=${1}>
          <${$280f206debff4ffe$export$2ce376c2cc3355c8}   name=${$280f206debff4ffe$var$html`<span> File</span>`}> 
            <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="Open" />
            <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="New" />
          </${$280f206debff4ffe$export$2ce376c2cc3355c8}/>

          <${$280f206debff4ffe$export$2ce376c2cc3355c8} name='Edit'> 
            <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="Undo" onAction=${(a)=>console.log("shortcut_", a)} shortCut=${"ctrl+z"}/>
            <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="Redo" />
            <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="Copy" />
            <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="Past" />
            <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="Truc" shortCut="ctrl+truc" />
            <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="Sub menu" ref=${(node)=>console.log("1st node", node)}> 
              <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="Sub item A">
                <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="Copy" onAction=${()=>console.log("sub copy")} />
                <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="Past" />
                <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="mais encore">
                  <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="Past" />
                  <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="Copy" />
                </>
              </${$280f206debff4ffe$export$2ce376c2cc3355c8}>
              <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="Sub item B"/>
            </${$280f206debff4ffe$export$2ce376c2cc3355c8}>
            <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="Sub Next"> 
              <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="TRUC" onAction=${()=>alert("Truc")}/>
              <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="OPOPO"/>
            </${$280f206debff4ffe$export$2ce376c2cc3355c8}>
          </${$280f206debff4ffe$export$2ce376c2cc3355c8}>

          <${$280f206debff4ffe$export$2ce376c2cc3355c8} name='Show'> 
            <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="By List" />
            <${$280f206debff4ffe$export$2ce376c2cc3355c8} name="By Grid" />
          </${$280f206debff4ffe$export$2ce376c2cc3355c8}>

          <${$280f206debff4ffe$export$2ce376c2cc3355c8} name='help'>
            <${$280f206debff4ffe$export$64c9c070e629d7f7} isExtension/>
          </${$280f206debff4ffe$export$2ce376c2cc3355c8}>

        </${$280f206debff4ffe$export$ee621bb1988a9f78}>
        <br/>
        <br/>

        <${$280f206debff4ffe$export$febac173755e83ae}>
          <div value="ex 1" >ex1</div>
          <div value="ex 2" >ex2</div>
          <div value="ex 3" selected>ex3</div>
          <div value="ex 4" >ex4</div>
          <div value="ex 5" >ex5</div>
          <div value="ex 6" >ex6</div>
        </${$280f206debff4ffe$export$febac173755e83ae}>
        <br/>
        <br/>

        <${$280f206debff4ffe$export$1e57c904ebe23308} title="App example" representedFilename=${[
        "file.example",
        "Folder",
        "Documents"
    ]}/>
        <${$280f206debff4ffe$export$ac6359d79df2e4d1}>
          <${$280f206debff4ffe$export$a70cad76d0b07bed}>
            <${$280f206debff4ffe$var$ChalkEffectSVG}/>
            <${$280f206debff4ffe$var$StyledChalkFilter}>
              <${$280f206debff4ffe$export$14876b2cda3a9ce0}>
                <${$6jkqg$ArrowAutofitUp}/>
                <${$6jkqg$ArrowCurveUpLeft}/>
                <${$6jkqg$ArrowUp}/>
                <${$6jkqg$ArrowDown}/>
                <${$6jkqg$PositionToFront}/>
              </${$280f206debff4ffe$export$14876b2cda3a9ce0}>
              <${$6jkqg$PanelLeft}/>
              <${$6jkqg$SelectObject}/>
              <${0, $6jkqg$SaveAs}/>
              <${$6jkqg$PanelBottom}/>
              <${$6jkqg$MultiselectLtr}/>
              <${$6jkqg$CopySelect}/>
              <${$6jkqg$SelectAllOn}/>
              <${$6jkqg$ArrowSquareDown}/>
              <${$6jkqg$AddSquare}/>
              <${$6jkqg$TextBold}/>
              <${$6jkqg$TextItalic}/>
              <${$6jkqg$TextUnderline}/>
              <${$6jkqg$ImageAdd}/>
              <${$6jkqg$ImageAltText}/>
              <${$280f206debff4ffe$export$febac173755e83ae}>
                <div value="ex 1">font 1</div>
                <div value="ex 4" >ex4</div>
              </${$280f206debff4ffe$export$febac173755e83ae}>
            </{StyledChalkFilter}>
          </${$280f206debff4ffe$export$a70cad76d0b07bed}>
        </${$280f206debff4ffe$export$ac6359d79df2e4d1}>
      </${$280f206debff4ffe$var$ControlBox}>
      <//>
      `;
(0, $6jkqg$render)(/*#__PURE__*/ (0, $6jkqg$createElement)($280f206debff4ffe$export$425ce3ef4cdbf755), document.getElementById("demo"));


export {$280f206debff4ffe$export$2d5d2ba3c7c8c40b as StyledButton, $280f206debff4ffe$export$bf2eeb11af6f5d5a as directionToFlex, $280f206debff4ffe$export$998804cc2e36d798 as StyledDopDownMenu, $280f206debff4ffe$export$16a345f05a2dba2e as FloatTo, $280f206debff4ffe$export$72c275ec29e1ae31 as StyledDopDownMenuPanel, $280f206debff4ffe$export$ee621bb1988a9f78 as DropDownMenu, $280f206debff4ffe$export$cae703c457e46f23 as StyledMenuItem, $280f206debff4ffe$export$2ce376c2cc3355c8 as MenuItem, $280f206debff4ffe$export$64c9c070e629d7f7 as SearchMenu, $280f206debff4ffe$export$79a5f0df7cc8c932 as StyledCenteredSelect, $280f206debff4ffe$export$1015dd8742183843 as StyledListSelect, $280f206debff4ffe$export$9c700a78418d6278 as StyledChevronUpDown, $280f206debff4ffe$export$febac173755e83ae as CenteredSelect, $280f206debff4ffe$export$81ea235131dcb164 as StyledWindowDecoration, $280f206debff4ffe$export$6ee7abe7a69f7b26 as StyledWindowDecorationLeft, $280f206debff4ffe$export$3d6e84015daa5f95 as StyledWindowDecorationCenter, $280f206debff4ffe$export$15ab87f38b10c1aa as StyledWindowDecorationRight, $280f206debff4ffe$export$b3e34364c4ea8f64 as StyledBlueMinimize, $280f206debff4ffe$export$6ca5f910bccde432 as StyledBlueMaximize, $280f206debff4ffe$export$d8681c40c8984cea as StyledRedClose, $280f206debff4ffe$export$1e57c904ebe23308 as WindowDecoration, $280f206debff4ffe$export$ac6359d79df2e4d1 as StyledNoiseBackGround, $280f206debff4ffe$export$a70cad76d0b07bed as StyledToolBarContainer, $280f206debff4ffe$export$14876b2cda3a9ce0 as StyledToolBarGroup, $280f206debff4ffe$export$425ce3ef4cdbf755 as Demo};
//# sourceMappingURL=demo.esm.js.map

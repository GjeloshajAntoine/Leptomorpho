(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // docs/demo.js
  var import_react = __toESM(__require("https://cdn.skypack.dev/react"));
  var import_react_dom = __require("https://cdn.skypack.dev/react-dom");
  var import_htm = __toESM(__require("https://cdn.skypack.dev/htm"));
  var import_styled_components = __toESM(__require("https://cdn.skypack.dev/styled-components"));
  var import_evil = __require("https://cdn.skypack.dev/@styled-icons/evil");
  var import_color = __toESM(__require("https://cdn.skypack.dev/color"));
  var import_toggle = __toESM(__require("https://cdn.skypack.dev/@react-hook/toggle"));
  var import_window_size = __toESM(__require("https://cdn.skypack.dev/@rehooks/window-size"));
  var import_react_cool_onclickoutside = __toESM(__require("https://cdn.skypack.dev/react-cool-onclickoutside"));
  var html = import_htm.default.bind(import_react.createElement);
  var TheHTML = import_styled_components.createGlobalStyle`
  html,body {
    overscroll-behavior-y: none;
    position: fixed;
    overflow: hidden;
    width: 100vw;
  }

`;
  var ControlBox = import_styled_components.default.div`
  background-color: #eae7e3;
  width: 65vw;
  height: 45vh;
  margin: 0 auto;
  margin-top: 15vh;
  padding: 5px;
`;
  var StyledButton = import_styled_components.default.button`
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
  var directionToFlex = ({ direction }) => ({ horizontal: "row", vertical: "column" })[direction] ?? "row";
  var StyledDopDownMenu = import_styled_components.default.div`
  display: flex;
  flex-direction :${directionToFlex};
`;
  var StyledPanel = import_styled_components.default.div`
  position:absolute;
  background-color: white;
  overflow: hidden;
  position: fixed;
  z-index: 1;
  top:${({ top }) => top}px;
  left:${({ left }) => left}px;
  visibility: ${({ visibility }) => visibility ? visibility : "hidden"};
`;
  var FloatingTo = ({ children, to, direction }) => {
    const [props, setProps] = (0, import_react.useState)({ visibility: "hidden" });
    const { innerWidth, innerHeight } = (0, import_window_size.default)();
    (0, import_react.useEffect)(() => {
      const { top, bottom, left, right } = to.getBoundingClientRect();
      if (direction === "vertical") {
        setProps({ top: bottom, left, visibility: "visible" });
      } else {
        setProps({ top, left: right, visibility: "visible" });
      }
    }, [children, to, innerWidth, innerHeight]);
    return import_react.default.cloneElement(children, props);
  };
  var insertCallback = (inserted, origin, elem, instertedFirst = true, ...args) => (evt) => {
    if (instertedFirst) {
      inserted?.(evt, elem, ...args);
      return origin?.(evt, elem, ...args);
    } else {
      origin?.(evt, elem);
      insterted?.(evt, elem);
    }
  };
  var CloneSertCb = (elem, cbProp, ...args) => {
    const propsInterCB = Object.fromEntries(Object.entries(cbProp).filter(([key, cb]) => typeof cb === "function").map(([key, cb]) => [key, insertCallback(cb, elem.props?.[key], elem, true, ...args)]));
    return import_react.default.cloneElement(elem, { ...elem.props, ...cbProp, ...propsInterCB }, elem.props.children);
  };
  var DropDownMenu = ({ children, className, direction = "horizontal", openHeaderItemOn = "click", triggerItemOn = "MouseUp", zIndex }) => {
    const [openHeader, setOpenHeader] = (0, import_react.useState)([]);
    const [mouseIsOn, setmouseIsOn] = (0, import_react.useState)(false);
    console.log("mouseIsOn", mouseIsOn);
    const dropDownRef = (0, import_react_cool_onclickoutside.default)(() => {
      setOpenHeader([]);
    });
    const onHeaderItemClick = ({ target, type = "" }, element) => {
      openHeader?.[0]?.openBy === target && ["mousedown", "touchstart"].includes(type) && !mouseIsOn ? setOpenHeader([]) : setOpenHeader([{ openBy: target, openings: element.props.children }]);
      ["mousedown", "touchstart"].includes(type) ? setmouseIsOn(true) : null;
    };
    const onMouseUpItem = ({ target }, Item) => {
      const { props: { children: children2 } } = Item;
      children2 ? setOpenHeader([...openHeader, { openBy: target, openings: children2 }]) : setOpenHeader([]);
      setmouseIsOn(false);
    };
    const onHoverItem = ({ target: clickTarget, type, touches: [{ clientX, clientY } = {}] = [] }, Item, idx) => {
      const { props: { children: children2 } } = Item;
      if (!openHeader.length && !mouseIsOn)
        return;
      const target = type.startsWith("touch") ? document.elementFromPoint(clientX, clientY) : clickTarget;
      if (type.startsWith("touch")) {
        return target.dispatchEvent(new Event("mouseover", { bubbles: true }));
      }
      children2 ? setOpenHeader([...openHeader.slice(0, idx + 1), { openBy: target, openings: children2 }]) : null;
    };
    return html`
    <${StyledDopDownMenu} className=${className} ref=${dropDownRef} innerRef=${dropDownRef} direction=${direction} >
      ${children?.map((HeaderItem) => CloneSertCb(HeaderItem, {
      onTouchStart: onHeaderItemClick,
      onTouchEnd: () => setmouseIsOn(false),
      onMouseDown: onHeaderItemClick,
      onMouseUp: () => setmouseIsOn(false),
      onMouseOver: onHoverItem,
      onTouchMove: onHoverItem
    }))}

      ${openHeader.length ? openHeader.map(({ openBy, openings }, idx) => html`
        <${FloatingTo} key=${idx} to=${openBy} direction=${!idx && direction == "horizontal" ? "vertical" : "horizontal"}>
          <${StyledPanel} shift=${idx} style=${{ zIndex }}>
            ${openings.map((openItems, oIdx) => CloneSertCb(openItems, { onMouseUp: onMouseUpItem, onMouseOver: onHoverItem, onTouchMove: onHoverItem, onTouchEnd: onMouseUpItem, key: oIdx }, idx))}
          </${StyledPanel}>
        <//>
        `) : null}
    </${StyledDopDownMenu}>
  `;
  };
  var StyledItem = import_styled_components.default.div`
  font-size: 12px;
  font-family:'-apple-system';
  display: flex;
  flex-direction: ${({ direction }) => ({ horizontal: "row", vertical: "column" })[direction] ?? "column"};
  width: fit-content;
  cursor: default;
  user-select: none;
`;
  var MenuItem = import_react.default.forwardRef(({ name, className, children, ref, isTopLevel, key, ...restProps }) => {
    return html`
              <${StyledItem} 
                className=${className}
                direction=${isTopLevel ? "horizontal" : "vertical"}
                innerRef=${ref}
                key=${key}
                ...${restProps}
              >
                  ${name ?? null}
              </${StyledItem}>
              `;
  });
  MenuItem.displayName = "MenuItem";
  var App = () => html`
      <${import_react.default.Fragment}>
      <${TheHTML}/>
      <${ControlBox}>
        <p>Hello World!___</p>
        <${StyledButton}>Click me!</${StyledButton}>
        <${StyledButton}> <${import_evil.ShareApple}/> </${StyledButton}>
        <br/>
        <br/>
        <br/>
        <${DropDownMenu} direction='horizontal' multipleOpen=${false} zIndex=${1}>
          <${MenuItem}   name=${html`<span> File</span>`}> 
            <${MenuItem} name="Open" />
            <${MenuItem} name="New" />
          </${MenuItem}/>

          <${MenuItem} name='Edit'> 
            <${MenuItem} name="Undo" />
            <${MenuItem} name="Redo" />
            <${MenuItem} name="Copy" />
            <${MenuItem} name="Past" />
            <${MenuItem} name="Sub menu"> 
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

        </${DropDownMenu}>
        <br/>
        "test un trc"
      </${ControlBox}>
      <//>
      `;
  (0, import_react_dom.render)(html`<${App}/>`, document.body);
})();

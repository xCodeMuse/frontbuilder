export const getGlobalStyles = () => {
  return `
        html, body, #root {
    height: 100%;
    overflow: auto;
}

body, html {
    padding: 0;
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
}

.App {
    text-align: center;
}

* {
    box-sizing: border-box;
}

.selectable {
    position: relative;
}

.el-button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
}

.element {
    width: 100%;
}

.element[contenteditable="true"] {
    cursor: text;
}

.element:focus-visible {
    outline: none;
}


.tree.hover-selected {
    border: none;
    background-color: rgba(255, 255, 255, 0.12);
}

.tree.selected,
.tree.hover-selected.selected {
    border: none;
    background-color: #8b3dff;
}

.height-sizer, .width-sizer {
    position: absolute;
    border: #8b3dff solid 1.5px;
    background-color: white;
    z-index: 10;
}

.height-sizer:hover, .width-sizer:hover {
    background-color: #8b3dff;
}

.height-sizer {
    width: 25px;
    height: 6px;
}

.width-sizer {
    width: 6px;
    height: 25px;
}

.width-sizer:hover {
    cursor: ew-resize;
}

.height-sizer:hover {
    cursor: ns-resize;
}

.rectangle-sizer{
    position: relative;
    border: #8b3dff solid 2px;
    background-color: transparent;
}

/*.hover-right {*/
/*    !*border-right: #4bcccc solid 3px;*!*/
/*}*/

/*.hover-bottom {*/
/*    border-bottom: #4bcccc solid 3px;*/
/*}*/

/*.hover-top {*/
/*    border-top: #4bcccc solid 4px;*/
/*}*/

.tree.hover-bottom {
    border-bottom: #4bcccc solid 1px;
}

/*.hover-left {*/
/*    border-left: #4bcccc solid 3px;*/
/*}*/

.tree.hover-top {
    border-top: #4bcccc solid 1px;
}

/*.hover-all{*/
/*    border: #4bcccc solid 3px;*/
/*}*/

.tree.hover-all{
    background-color: #4bcccc;
    border-width: 0;
    color:black;
}

.tree-dragging {
    opacity: 0.3!important;
}

.quick-actions {
    position: absolute;
    top: -26px;
    right: -2px;
    width: 50%;
    max-width: 50px;
    background-color: #8b3dff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    color: #efe8ff;
    font-size: 13px;
    line-height: 12px;
}

.quick-actions div:hover {
    color: white;
    cursor: pointer;
    transition: all .5s;
}

h1,h2,h3,h4,h5 {
    margin: 0;
}

    `;
};

const mainContainer = {
  display: "flex",
  backgroundColor: "#ffffff",
  height: '100vh  ',
  // overflow:'scroll'
};

const sidebarWrap = {
  width: { sm: 240 },
  flexShrink: { sm: 0 },
};
const contentWrap = {
  flexGrow: 1,
  p: 2,
  width: { sm: `calc(100% -${240}px)` },
  backgroundColor: "#ffffff",
  height:'auto'
};

const LayoutStyle = {
  mainContainer,
  sidebarWrap,
  contentWrap,
};

export default LayoutStyle;

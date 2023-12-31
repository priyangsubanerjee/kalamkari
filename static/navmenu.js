const navmenu = [
  {
    name: "Inventory",
    path: "/inventory",
    icon: <iconify-icon icon="bi:box"></iconify-icon>,
  },
  //   {
  //     name: "Search",
  //     path: "/search",
  //     icon: <iconify-icon icon="octicon:search-24"></iconify-icon>,
  //   },
  {
    name: "Orders",
    path: "/orders",
    icon: (
      <iconify-icon
        height="20"
        width="20"
        icon="solar:bag-3-outline"
      ></iconify-icon>
    ),
  },
  //   {
  //     name: "Returns",
  //     path: "/returns",
  //     icon: <iconify-icon icon="icon-park-outline:return"></iconify-icon>,
  //   },
  {
    name: "Sales",
    path: "/sales",
    icon: (
      <iconify-icon
        height="17"
        width="17"
        icon="solar:wallet-outline"
      ></iconify-icon>
    ),
  },
  {
    name: "Account",
    path: "/account",
    icon: (
      <iconify-icon height="18" width="18" icon="iconoir:user"></iconify-icon>
    ),
  },
];

export default navmenu;

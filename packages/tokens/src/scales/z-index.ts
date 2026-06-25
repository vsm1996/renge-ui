export interface ZIndexToken {
  dropdown: string;
  sticky: string;
  fixed: string;
  modal: string;
  toast: string;
}

export function createZIndexScale(): ZIndexToken {
  return {
    dropdown: "100",
    sticky: "200",
    fixed: "300",
    modal: "400",
    toast: "500",
  };
}

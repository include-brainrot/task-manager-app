export type BaseMap = {
  [x: string | number]: BaseMap | BaseMap[] | Date | string | number | null;
};

export type BaseMapKeys<T extends BaseMap> = keyof T;

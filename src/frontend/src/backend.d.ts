import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    name: string;
    category: Category;
    price: bigint;
}
export interface BusinessInfo {
    instagram: string;
    name: string;
    address: string;
    phone: string;
}
export enum Category {
    addOn = "addOn",
    main = "main"
}
export interface backendInterface {
    getBusinessInfo(): Promise<BusinessInfo>;
    getMenuItems(): Promise<Array<MenuItem>>;
}

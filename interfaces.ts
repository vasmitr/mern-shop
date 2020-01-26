import { OrderSchema } from './models/Order';
import { CategorySchema } from './models/Category';
import { UserSchema } from './models/User';
import { ProductSchema } from './models/Product';

export type Keys<T> = { [P in keyof T]: any };

export interface OrderErrors extends Keys<Partial<OrderSchema>> {
    products?: string;
    quantity?: string;
}

export interface CategoryErrors extends Keys<Partial<CategorySchema>> {
    notadmin?: string;
    category?: string;
}

export interface UserErrors extends Keys<Partial<UserSchema>> {
    password2?: string;
}

export interface ProductErrors extends Keys<Partial<ProductSchema>> {
    notadmin?: string;
}

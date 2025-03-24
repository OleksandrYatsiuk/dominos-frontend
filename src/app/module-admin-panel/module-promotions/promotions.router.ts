import { Routes } from "@angular/router";
import { PromotionCreateComponent } from "./containers/promotion-create/promotion-create.component";
import { PromotionEditComponent } from "./containers/promotion-edit/promotion-edit.component";

export default [
    {
        path: 'create',
        component: PromotionCreateComponent
    },
    {
        path: ':id/edit',
        component: PromotionEditComponent
    },
] as Routes;
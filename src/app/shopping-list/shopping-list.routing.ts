import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

const routes: Routes = [
  { path: '', component: ShoppingListComponent },

];

export const ShoppingListRoutes = RouterModule.forChild(routes);

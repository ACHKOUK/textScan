import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ShowtextComponent } from './showtext/showtext.component';

const routes: Routes = [
  {
    path: '',component:HomepageComponent
  },
  {
    path: 'home',component:HomepageComponent
  },
  {
    path:'showtext',component:ShowtextComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

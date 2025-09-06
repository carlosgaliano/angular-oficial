import { Routes } from '@angular/router';
import Base1Component from './base_1/base_1.component';
import { NgContentComponent } from './ngContent /ngContent.component';
import { NgComponentOutletComponent } from './NgComponentOutlet/NgComponentOutlet.component';
import { NgTemplateComponent } from './ngTemplate/ngTemplate.component';
import { CreateComponentComponent } from './createComponent/createComponent.component';
import { UsuariosComponent } from './usuario/usuario.component';
import { BananaInABoxComponent } from './banana-in-a-box/banana-in-a-box.component';
import { PipeComponent } from './pipe/pipe.component';
import { NgContent2Component } from './ng-content2/ng-content2.component';
import { NgTemplate2Component } from './ng-template/ng-template.component';
import { NgTemplateOutletComponent } from './NgTemplateOutlet/NgTemplateOutlet.component';
import { ViewContainerRefComponent } from './ViewContainerRef/ViewContainerRef.component';

export const routes: Routes = [
  {
    path: "base_1",
    component: Base1Component
  },
  {
    path: "ngcontent",
    component: NgContentComponent
  },
/*   {
    path: "ngcomponent",
    component: NgComponentOutletComponent
  }, */
  {
    path: "createComponent",
    component: CreateComponentComponent
  },
  {
    path: "BananaInABox",
    component: BananaInABoxComponent
  },
  {
    path: "pipe",
    component: PipeComponent
  },
  {
    path: "NgContent2",
    component: NgContent2Component
  },
  {
    path: "NgTemplate2",
    component: NgTemplate2Component
  },
  {
    path: "NgTemplateOutlet",
    component: NgTemplateOutletComponent
  },
  {
    path: "",
    component: ViewContainerRefComponent
  },
  {
    path: "UsuariosComponent",
    component: UsuariosComponent
  },
  {
    path: "NgTemplate",
    component: NgTemplateComponent
  },
  {
    path: "**",
    component: NgTemplateComponent
  }
];

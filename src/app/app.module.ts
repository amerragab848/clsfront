import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { HttpClientModule , HttpClient }    from '@angular/common/http';
import { AppComponent } from './app.component';
import { FixedNavbarComponent } from './components/shared/fixed-navbar/fixed-navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { CourseTypeComponent, courseTypeFilterPipe } from './components/course-type/course-type/course-type.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CourseCategoryComponent, courseCategoryFilterPipe } from './components/course-category/course-category.component';
import { DeliveryTypeComponent, deliveryTypeFilterPipe } from './components/delivery-type/delivery-type.component';

@NgModule({
  declarations: [
    JwPaginationComponent,
    AppComponent,
    FixedNavbarComponent,
    SidebarComponent,
    DashboardComponent,
    CourseTypeComponent,
    courseTypeFilterPipe,
    CourseCategoryComponent,
    courseCategoryFilterPipe,
    DeliveryTypeComponent,
    deliveryTypeFilterPipe,
  ],
  imports: [
    SweetAlert2Module.forRoot(),
    BrowserModule,
    AppRoutingModule,   
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: DashboardComponent},
      {path:'coursetype', component : CourseTypeComponent},
      {path:'coursecategory', component : CourseCategoryComponent},
      {path:'deliverytype', component : DeliveryTypeComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

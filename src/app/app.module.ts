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
import { ExamTypeComponent , examTypeFilterPipe } from './components/exam-type/exam-type/exam-type.component';
import { LabTypeComponent , labTypeFilterPipe } from './components/lab-type/lab-type/lab-type.component';
import { MaterialTypeComponent , materialTypeFilterPipe} from './components/material-type/material-type/material-type.component';
import { VendorComponent , vendorFilterPipe} from './components/vendor/vendor/vendor.component';
import { CourseCategoryComponent, courseCategoryFilterPipe } from './components/course-category/course-category.component';
import { DeliveryTypeComponent, deliveryTypeFilterPipe } from './components/delivery-type/delivery-type.component';
import { CourseComponent , courseFilterPipe } from './components/course/course/course.component';
import {AngularEditorModule} from '@kolkov/angular-editor';
import { SubCategoryComponent, subCategoryFilterPipe } from './components/sub-category/sub-category.component';
import { BranchComponent, branchFilterPipe } from './components/branch/branch.component';
import { LabComponent, labFilterPipe } from './components/lab/lab.component';
import { InstructorComponent, instructorFilterPipe } from './components/instructor/instructor.component';
import { FacilityComponent, facilityFilterPipe } from './components/facility/facility.component';
import { CourseOutlineComponent, courseOutlineFilterPipe } from './components/course-outline/course-outline.component';
import { LearningPathComponent, learningPathFilterPipe } from './components/learning-path/learning-path.component';
import { AssetGroupComponent, assetGroupFilterPipe } from './components/asset-group/asset-group.component';

@NgModule({
  declarations: [
    JwPaginationComponent,
    AppComponent,
    FixedNavbarComponent,
    SidebarComponent,
    DashboardComponent,
    CourseTypeComponent,
    courseTypeFilterPipe,
    ExamTypeComponent,
    examTypeFilterPipe,
    LabTypeComponent,
    labTypeFilterPipe,
    MaterialTypeComponent,
    materialTypeFilterPipe,
    VendorComponent,
    vendorFilterPipe,
    CourseCategoryComponent,
    courseCategoryFilterPipe,
    DeliveryTypeComponent,
    deliveryTypeFilterPipe,
    CourseComponent,
    SubCategoryComponent,
    subCategoryFilterPipe,
    BranchComponent,
    branchFilterPipe,
    LabComponent,
    labFilterPipe,
    InstructorComponent,
    instructorFilterPipe,
    courseFilterPipe,
    FacilityComponent,
    facilityFilterPipe,
    CourseOutlineComponent,
    courseOutlineFilterPipe,
    LearningPathComponent,
    learningPathFilterPipe,
    AssetGroupComponent,
    assetGroupFilterPipe,
  ],
  imports: [
    SweetAlert2Module.forRoot(),
    BrowserModule,
    AppRoutingModule,   
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularEditorModule,
    RouterModule.forRoot([
      {path: '', component: DashboardComponent},
      {path:'coursetype', component : CourseTypeComponent},
      {path:'examtype', component : ExamTypeComponent},
      {path:'labtype', component : LabTypeComponent},
      {path:'materialtype', component : MaterialTypeComponent},
      {path:'vendor', component : VendorComponent},
      {path:'coursecategory', component : CourseCategoryComponent},
      {path:'deliverytype', component : DeliveryTypeComponent},
      {path:'course', component: CourseComponent},
      {path:'subcategory', component: SubCategoryComponent},
      {path:'branch', component: BranchComponent},
      {path:'lab', component: LabComponent},
      {path:'instructor', component: InstructorComponent},
      {path:'facility/:id', component: FacilityComponent},
      {path:'courseoutline/:id', component: CourseOutlineComponent},
      {path:'learningpath', component : LearningPathComponent},
      {path:'assetgroup', component : AssetGroupComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

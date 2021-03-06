import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppRoutingModule, routes } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FixedNavbarComponent } from './components/shared/fixed-navbar/fixed-navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { CourseTypeComponent, courseTypeFilterPipe } from './components/course-type/course-type/course-type.component';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ExamTypeComponent, examTypeFilterPipe } from './components/exam-type/exam-type/exam-type.component';
import { LabTypeComponent, labTypeFilterPipe } from './components/lab-type/lab-type/lab-type.component';
import { MaterialTypeComponent, materialTypeFilterPipe } from './components/material-type/material-type/material-type.component';
import { VendorComponent, vendorFilterPipe } from './components/vendor/vendor/vendor.component';
import { CourseCategoryComponent, courseCategoryFilterPipe } from './components/course-category/course-category.component';
import { DeliveryTypeComponent, deliveryTypeFilterPipe } from './components/delivery-type/delivery-type.component';
import { CourseComponent, courseFilterPipe } from './components/course/course/course.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SubCategoryComponent, subCategoryFilterPipe } from './components/sub-category/sub-category.component';
import { BranchComponent, branchFilterPipe } from './components/branch/branch.component';
import { LabComponent, labFilterPipe } from './components/lab/lab.component';
import { InstructorComponent, instructorFilterPipe } from './components/instructor/instructor.component';
import { FacilityComponent, facilityFilterPipe } from './components/facility/facility.component';
import { CourseOutlineComponent, courseOutlineFilterPipe } from './components/course-outline/course-outline.component';
import { LearningPathComponent, learningPathFilterPipe } from './components/learning-path/learning-path.component';
import { ToastComponent } from 'src/app/components/shared/toast/toast.component';
import { RoundComponent } from './components/round/round.component';
import { AssetGroupComponent, assetGroupFilterPipe } from './components/asset-group/asset-group.component';
import { AssetVendorComponent, assetVendorFilterPipe } from './components/asset-vendor/asset-vendor.component';
import { AssetInfoComponent, assetFilterPipe } from './components/asset/asset-info/asset-info.component';
import { AssetFormComponent } from './components/asset/asset-form/asset-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClientComponent, clientFilterPipe } from './components/client/client.component';
import { CorporateComponent, corporateFilterPipe } from './components/corporate/corporate.component';
import { YearVacationComponent, yearVacationFilterPipe } from './components/year-vacation/year-vacation/year-vacation.component';
import { RoundSessionsComponent } from './components/round-sessions/round-sessions/round-sessions.component';
import { SalesCycleComponent, salesCycleFilterPipe } from './components/sales-cycle/sales-cycle/sales-cycle.component';
import { SalesCycleTypeComponent, salesCycleTypeFilterPipe } from './components/sales-cycle-type/sales-cycle-type/sales-cycle-type.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            JwPaginationComponent,
            ToastComponent,
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
            RoundComponent,
            AssetGroupComponent,
            assetGroupFilterPipe,
            AssetVendorComponent,
            assetVendorFilterPipe,
            AssetInfoComponent,
            AssetFormComponent,
            assetFilterPipe,
            ClientComponent,
            clientFilterPipe,
            CorporateComponent,
            corporateFilterPipe,
            YearVacationComponent,
            yearVacationFilterPipe,
            RoundSessionsComponent,
            SalesCycleComponent,
            salesCycleFilterPipe,
            SalesCycleTypeComponent,
            salesCycleTypeFilterPipe,
            MainComponent,
            LoginComponent
        ],
        imports: [
            SweetAlert2Module.forRoot(),
            BrowserModule,
            AppRoutingModule,
            HttpClientModule,
            FormsModule,
            BrowserAnimationsModule,
            AngularEditorModule,
            NgSelectModule,
            RouterModule.forRoot(routes)
        ],
        providers: [
            DatePipe,
            AuthGuard,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptor,
                multi: true
            }
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map
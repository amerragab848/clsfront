import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { CourseTypeComponent } from './components/course-type/course-type/course-type.component';
import { ExamTypeComponent } from './components/exam-type/exam-type/exam-type.component';
import { LabTypeComponent } from './components/lab-type/lab-type/lab-type.component';
import { MaterialTypeComponent } from './components/material-type/material-type/material-type.component';
import { VendorComponent } from './components/vendor/vendor/vendor.component';
import { CourseCategoryComponent } from './components/course-category/course-category.component';
import { DeliveryTypeComponent } from './components/delivery-type/delivery-type.component';
import { CourseComponent } from './components/course/course/course.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { BranchComponent } from './components/branch/branch.component';
import { LabComponent } from './components/lab/lab.component';
import { InstructorComponent } from './components/instructor/instructor.component';
import { FacilityComponent } from './components/facility/facility.component';
import { CourseOutlineComponent } from './components/course-outline/course-outline.component';
import { LearningPathComponent } from './components/learning-path/learning-path.component';
import { RoundComponent } from './components/round/round.component';
import { AssetGroupComponent } from './components/asset-group/asset-group.component';
import { AssetVendorComponent } from './components/asset-vendor/asset-vendor.component';
import { AssetInfoComponent } from './components/asset/asset-info/asset-info.component';
import { AssetFormComponent } from './components/asset/asset-form/asset-form.component';
import { ClientComponent } from './components/client/client.component';
import { CorporateComponent } from './components/corporate/corporate.component';
import { YearVacationComponent } from './components/year-vacation/year-vacation/year-vacation.component';
import { RoundSessionsComponent } from './components/round-sessions/round-sessions/round-sessions.component';
import { SalesCycleTypeComponent } from './components/sales-cycle-type/sales-cycle-type/sales-cycle-type.component';
import { SalesCycleComponent } from './components/sales-cycle/sales-cycle/sales-cycle.component';
import { LoginComponent } from './components/login/login.component';
export const routes = [
    {
        path: "app",
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'coursetype', component: CourseTypeComponent },
            { path: 'examtype', component: ExamTypeComponent },
            { path: 'labtype', component: LabTypeComponent },
            { path: 'materialtype', component: MaterialTypeComponent },
            { path: 'vendor', component: VendorComponent },
            { path: 'coursecategory', component: CourseCategoryComponent },
            { path: 'deliverytype', component: DeliveryTypeComponent },
            { path: 'course', component: CourseComponent },
            { path: 'subcategory', component: SubCategoryComponent },
            { path: 'branch', component: BranchComponent },
            { path: 'lab', component: LabComponent },
            { path: 'instructor', component: InstructorComponent },
            { path: 'facility/:id', component: FacilityComponent },
            { path: 'courseoutline/:id', component: CourseOutlineComponent },
            { path: 'learningpath', component: LearningPathComponent },
            { path: 'rounds', component: RoundComponent },
            { path: 'assetgroup', component: AssetGroupComponent },
            { path: 'assetvendor', component: AssetVendorComponent },
            { path: 'asset', component: AssetInfoComponent },
            { path: 'assetform', component: AssetFormComponent },
            { path: 'assetform/:id', component: AssetFormComponent },
            { path: 'rounds/:id', component: RoundComponent },
            { path: 'client', component: ClientComponent },
            { path: 'corporate', component: CorporateComponent },
            { path: 'vacations', component: YearVacationComponent },
            { path: 'roundsessions/:id', component: RoundSessionsComponent },
            { path: 'salesCycleType', component: SalesCycleTypeComponent },
            { path: 'salesCycleType', component: SalesCycleTypeComponent },
            { path: 'salesCycle', component: SalesCycleComponent }
        ]
    },
    {
        path: "auth",
        component: LoginComponent
    },
    { path: "", redirectTo: "auth", pathMatch: "full" }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map
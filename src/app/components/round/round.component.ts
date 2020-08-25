import { Component, OnInit } from '@angular/core';
import {RoundService} from 'src/app/core/services/round/round.service';
import {ToastService} from 'src/app/core/services/toast/toast.service';
import {BranchService} from 'src/app/core/services/branch/branch.service';
import {LabService} from 'src/app/core/services/lab/lab.service';
import {InstructorService} from 'src/app/core/services/instructor/instructor.service';
import {DeliveryTypeService} from 'src/app/core/services/deliver-type/delivery-type.service';
import {CourseTypeService} from 'src/app/core/services/course-type/course-type.service';
import { ActivatedRoute,Router } from '@angular/router';
import { from } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatePipe } from '@angular/common';
import { CourseService } from 'src/app/core/services/course/course.service';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {
  instructors : any[]=[];
  selectedInstructors = [];

  branches : any[];
  labs : any[];
  deliveryTypes:any[];
  courseTypes:any[];
  course:any;

  roundWithDetails : any = {
    roundDetils : null,
    instructors : null
  };
  rounds :any[];
  round : Round = <Round>{};
  roundWeek : WeekDay[] = [];
  weekDay :WeekDay =<WeekDay>{};
  times : Time[] = [
    {
      time : "07:00 AM",
      priority :1
    },
    {
      time : "07:30 AM",
      priority :2
    },
    {
      time : "08:00 AM",
      priority :3
    },
    {
      time : "08:30 AM",
      priority :4
    },
    {
      time : "09:00 AM",
      priority :5
    },
    {
      time : "09:30 AM",
      priority :6
    },
    {
      time : "10:00 AM",
      priority :7
    },
    {
      time : "10:30 AM",
      priority :8
    },
    {
      time : "11:00 AM",
      priority :9
    },
    {
      time : "11:30 AM",
      priority :10
    },
    {
      time : "12:00 PM",
      priority :11
    },
    {
      time : "12:30 PM",
      priority :12
    },
    {
      time : "01:00 PM",
      priority :13
    },
    {
      time : "01:30 PM",
      priority :14
    },
    {
      time : "02:00 PM",
      priority :15
    },
    {
      time : "02:30 PM",
      priority :16
    },
    {
      time : "03:00 PM",
      priority :17
    },
    {
      time : "03:30 PM",
      priority :18
    },
    {
      time : "04:00 PM",
      priority :19
    },
    {
      time : "04:30 PM",
      priority :20
    },
    {
      time : "05:00 PM",
      priority :21
    },
    {
      time : "05:30 PM",
      priority :22
    },
    {
      time : "06:00 PM",
      priority :23
    },
    {
      time : "06:30 PM",
      priority :24
    },
    {
      time : "07:00 PM",
      priority :25
    },
    {
      time : "07:30 PM",
      priority :26
    },
    {
      time : "08:00 PM",
      priority :27
    },
    {
      time : "08:30 PM",
      priority :28
    },
    {
      time : "09:00 PM",
      priority :29
    },
    {
      time : "09:30 PM",
      priority :30
    },
    {
      time : "10:00 PM",
      priority :31
    },
    {
      time : "10:30 PM",
      priority :32
    },
    {
      time : "11:00 PM",
      priority :33
    },
    {
      time : "11:30 PM",
      priority :34
    },
    {
      time : "12:00 AM",
      priority :34
    },
    {
      time : "12:30 AM",
      priority :35
    },
    {
      time : "01:00 AM",
      priority :36
    },
    {
      time : "01:30 AM",
      priority :37
    },
    {
      time : "02:00 AM",
      priority :38
    }
  ];
  timeTable :any[];
  branchId:any;
  constructor(
    private _roundSrv : RoundService,
    private router : ActivatedRoute,
    private _toastSrv : ToastService,
    private _labSrv : LabService,
    private _courseSrv : CourseService,
    private _branchSrv : BranchService,
    private _deliveryTypeSrv : DeliveryTypeService,
    private _courseTypeSrv : CourseTypeService,
    private _instructorSrv : InstructorService,
    private datepipe: DatePipe,

  ) { 

  }

  ngOnInit() {
    this.GetBranches();
    this.GetCourseTypes();
    this.GetDeliveryTypes();
    this.GetInstructors();
    this.GetCourseRounds();
    this.GetCourse();
  }

  GetRoundDetails(roundId)
  {
     this._roundSrv.GetRoundDetails(roundId).subscribe((data : any)=>{
        this.roundWithDetails = data.result;
        console.log(this.roundWithDetails);
     });
  }
  GetRoundById(roundId)
  {
     this._roundSrv.GetRoundById(roundId).subscribe((data : any)=>{
       this.GetAllLabs();
       this.round = data.result
       this.roundWeek = data.result.roundDetails;
       this.round.startDate =  this.datepipe.transform(this.round.startDate,'yyyy-MM-dd');
      //  this.round.endDate =  this.datepipe.transform(this.round.endDate,'yyyy-MM-dd');
       this.CalculateEndDate();
       this.selectedInstructors= data.result.selectedInstructors;
     });
  }

  GetAllLabs(){
    this._labSrv.GetLabs().subscribe((data : any)=>{
      this.labs = data.result;
   });
  }
  GetCourseRounds()
  {
    this._roundSrv.GetCourseRounds(this.router.snapshot.params.id).subscribe((data : any)=>{
      this.rounds = data.result;
      console.log(data);
    });
  }
  GetCourse()
  {
    this._courseSrv.GetCoursees().subscribe((data : any)=>{
      this.course = data.result.find(c=>c.id == this.router.snapshot.params.id);
      console.log(this.course);
      this.round.roundDuration = this.course.hoursDuration;
    });
  }
  SaveRound(){
    this._roundSrv.SaveRound({
      id : this.round.id,
      startDate:this.round.startDate,
      endDate:this.round.endDate,
      roundDetails : this.roundWeek,
      roundDuration:this.round.roundDuration,
      sessionDuration:this.round.sessionDuration,
      totalSessions:this.round.totalSessions,
      courseId: parseFloat(this.router.snapshot.params.id),
      labId:this.round.labId,
      deliveryTypeId:this.round.deliveryTypeId,
      courseTypeId:this.round.courseTypeId,
      selectedInstructors : this.selectedInstructors
    }).subscribe((data : any)=>{
      if(data.code === 200){
        this._toastSrv.success("","Saved Successfully");
        this.ClearRound();
        this.GetCourseRounds();
      }
    });
  }
  ExecuteRound(roundId){
    this._roundSrv.ExecuteRound(roundId).subscribe((data : any)=>{
      if(data.code === 200){
        this._toastSrv.success("","Saved Successfully");
        this.GetCourseRounds();
      }
      if(data.code === 500)
        {
          this._toastSrv.error("Failed",data.message);
        }
      }
    );
  }

  GetRoundsTimeTable(){
    this._roundSrv.GetRoundsTimeTable(this.round.labId,parseFloat(this.router.snapshot.params.id),this.round.startDate,this.round.endDate).subscribe((data : any)=>{
      this.timeTable =  data;
      console.log(data);
    });
  }  
  
  DeleteRound(roundId){
    this._roundSrv.DeleteRound(roundId).subscribe((data : any)=>{
      if(data.code === 200){
        this._toastSrv.success("","Deleted Successfully");
        this.GetCourseRounds();
      }
    });
  }
  ClearRound(){
    this.round = <Round>{};
    this.selectedInstructors =[];
    this.roundWeek =[];
    this.GetCourseRounds();
  }
  CalculateTotalSession()
  {
    var rLength = this.roundWeek.length -1;
    var rc =0;
    var totalHours = this.course.hoursDuration;
    var sCounter =0;
    while(totalHours > 0)
    {
      try{
        var from = parseFloat(this.roundWeek[rc].endTime.toString().replace(':','').replace('AM','').replace('PM','')) ;
        var to =parseFloat(this.roundWeek[rc].startTime.toString().replace(':','').replace('AM','').replace('PM',''));
        var hoursDiff =from - to ;
        totalHours = totalHours - parseFloat(hoursDiff.toString().replace('00',''));
        if(rc == rLength)
        {
          rc =0;
        }else{
          rc++;
        }
        sCounter++;
      }
      catch{
      }
    }
    this.round.totalSessions= sCounter;
  }
  CalculateEndDate()
  {
    // this.round.totalSessions =this.round.roundDuration /this.round.sessionDuration;
      let weeks = this.round.totalSessions / this.roundWeek.length;
     
    this._roundSrv.GetRoundEndDate(this.round.startDate,parseFloat(weeks.toString())).subscribe((data:any)=>{
      console.log(data);
      this.round.endDate =data;
    });
  }
  AddDayToRoundWeek()
  {
    if(this.roundWeek.filter(d=>d.day == this.weekDay.day).length == 0 && this.weekDay.day != undefined && this.times.find(x=>x.time == this.weekDay.startTime).priority < this.times.find(x=>x.time == this.weekDay.endTime).priority)
    {
      this.roundWeek.push(this.weekDay);
      this.ClearDay();
    }
  }
  DeleteDayFromRoundWeek(day){
    this.roundWeek.splice(this.roundWeek.indexOf(day),1);
  }
  ClearDay()
  {
    this.weekDay = <WeekDay>{};
  }

  GetBranches() {
    this._branchSrv.GetBranches().subscribe((data :any)=>{
       this.branches = data.result;
    }); 
  }
  GetLabs(id) {
    this._labSrv.GetLabs().subscribe((data :any)=>{
       this.labs = data.result.filter(l=> l.branchId == id);
    }); 
  } 
  GetDeliveryTypes()
  {
    this._deliveryTypeSrv.GetDeliveryTypes().subscribe((data :any)=>{
      this.deliveryTypes = data.result;
   }); 
  }
  GetCourseTypes()
  {
    this._courseTypeSrv.GetCourseTypes().subscribe((data :any)=>{
      this.courseTypes = data.result;
   }); 
  }
  GetInstructors()
  {
    this._instructorSrv.GetCourseInstructors(this.router.snapshot.params.id).subscribe((data :any)=>{
      this.instructors = data.result;
   }); 
  }
  SelectInstrctor()
  {
    console.log(this.selectedInstructors);
  }
}

export interface WeekDay
{
  day:string;
  startTime:string;
  endTime:string;
}

export interface  Round
{
  id:number;
  roundDuration : number;
  sessionDuration :number;
  totalSessions : number;
  startDate :  string;
  endDate : string; 
  courseId:number;
  labId:number;
  courseTypeId:number;
  deliveryTypeId:number;
  IsExecuted:boolean;
  roundDetails : WeekDay[];
  instructorsIds : number[]
}

export interface Time{
  time:string;
  priority : number;
}